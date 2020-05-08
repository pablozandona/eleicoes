import React, {useEffect, useState} from 'react';
import moment from 'moment';
import axios from 'axios';
import {useHistory, useParams} from "react-router-dom";
import {LoadingOutlined, CheckOutlined} from '@ant-design/icons';
import {
    Avatar,
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    InputNumber,
    message,
    Result,
    Row,
    Select, Space,
    Tag,
    Upload
} from 'antd';
import {ContentPage} from "../../shared/components/ContentPage/ContentPage";
import {Loading} from "../../shared/components/Loading/Loading";
import MaskedInput from 'antd-mask-input'
import {List, Card, Radio, Typography} from 'antd';
const { Text,Title } = Typography;

const formItemLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 6},
};

const SelecionarEleicao: React.FC = () => {

    const [eleicaoSelecionada, setEleicaoSelecionada] = useState<any>(null);
    const [eleicoes, setEleicoes] = useState<any[]>([]);
    const [feedbackSucesso, setFeedbackSucesso] = useState<boolean>(false);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(true);
    const [candidatoSelecionado, setCandidatoSelecionado] = useState<any>({});
    const [protocolo, setProtocolo] = useState<string>('');

    const history = useHistory();
    const {cpf} = useParams();

    const getEleicoes = () => {
        axios.get('/eleicoes/disponiveis/' + cpf)
            .then(function ({data}) {
                console.log(data)
                setEleicoes(data);
                setLoading(false);
            })
            .catch(function (error) {
                message.error({content: 'Falha ao criar!', key: 'msg', duration: 2});
                setLoading(false);
            });
    }

    useEffect(() => {
        getEleicoes();
    }, []);

    const selecionaEleicao = (eleicao: any) => {
        console.log('selecionaEleicao', eleicao)
        setEleicaoSelecionada(eleicao);
    }

    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    };

    const selecionaCandidato = (cargoId: number, candidatoId: number) => {
        setCandidatoSelecionado({...candidatoSelecionado, [cargoId] : candidatoId});
        console.log('selecionaCandidato', cargoId, candidatoId, candidatoSelecionado)
    };

    const finalizarVotacao = () => {
        message.loading({content: 'Aguarde...', key: 'msg'});
        axios.post('/eleicoes/votar', {
            cpf,
            eleicaoId: eleicaoSelecionada.eleicao.id,
            votados: candidatoSelecionado,
        })
            .then(function ({data}) {
                if (data) {
                    setProtocolo(data);
                    setFeedbackSucesso(true);
                }
                message.destroy();
            })
            .catch(function (error) {
                message.error({content: 'Falha ao alterar!', key: 'msg', duration: 2});
            });
    };

    const reset = () => {
        setLoading(true);
        getEleicoes();
        setFeedbackSucesso(false);
        setCandidatoSelecionado(null);
        setProtocolo('');
        setEleicaoSelecionada(null);
    }

    return (
        <>
            {loading ? <Loading/> :
                <ContentPage title={'Eleições'}>
                    {feedbackSucesso ?
                        <Result
                            status="success"
                            title="Votação concluída com sucesso!"
                            subTitle={<span>Seu número de protocolo é <b>{protocolo}</b></span>}
                            extra={[
                                <Button type="primary" key="console" onClick={reset}>
                                    Votar novamente
                                </Button>,
                            ]}
                        />
                        : (eleicaoSelecionada ?
                                <Space direction="vertical">
                                    <div style={{ border: '1px solid lightgray', backgroundColor: 'white', borderRadius: 5, padding: 10 }}>
                                       Eleitor: <b>{cpf}</b>
                                    </div>
                                    {eleicaoSelecionada.cargos.map((cargo: any) =>
                                        <Card type="inner" title={cargo.nome}>
                                            <List
                                                dataSource={cargo?.candidatos}
                                                itemLayout="vertical"
                                                renderItem={(candidato: any) => (
                                                    <List.Item className="listItem"
                                                               onClick={() => selecionaCandidato(cargo.id, candidato.id)}>
                                                        <Row justify="space-between" align="middle">
                                                            <Col>
                                                                <Avatar size={64}
                                                                        src={"/candidatos/foto/" + candidato.foto.id}/>
                                                                <Text style={{marginLeft: 20}}>{candidato.nome}</Text>
                                                            </Col>
                                                            <Col>
                                                                {candidato.id === candidatoSelecionado[cargo.id] &&
                                                                <Tag color="green">ESCOLHIDO</Tag>}
                                                            </Col>
                                                        </Row>
                                                    </List.Item>
                                                )}
                                            />
                                        </Card>
                                    )}
                                    <Row>
                                        <Button size={"large"} onClick={() => history.push("/")}>Cancelar</Button>
                                        <Button size={"large"} style={{marginBottom: 20}} type="primary" icon={<CheckOutlined />}
                                                onClick={finalizarVotacao}>
                                           Finalizar Votação
                                        </Button>
                                    </Row>
                                </Space>
                                :
                                <List
                                    grid={{gutter: 16, column: 3}}
                                    dataSource={eleicoes}
                                    renderItem={e => (
                                        <List.Item>
                                            <Card title={e.eleicao.nome}>
                                                {
                                                    e.protocolo ?
                                                        <Row justify="space-between" align="middle" style={{ minHeight: 40 }}>
                                                            <span>Protocolo: <b>{e.protocolo.numero}</b></span>
                                                            <Tag color="green">VOTADO</Tag>
                                                        </Row>
                                                        :
                                                        <Row justify="space-between" align="middle" style={{ minHeight: 40 }}>
                                                            <span>Disponível até <b>{moment(e.eleicao.dataInicio).format('DD/MM/YYYY')}</b></span>
                                                            <Button type={"primary"}
                                                                    onClick={(ev) => selecionaEleicao(e)}> VOTAR</Button>
                                                        </Row>
                                                }
                                            </Card>
                                        </List.Item>
                                    )}>
                                </List>
                        )}
                </ContentPage>
            }
        </>
    );
}
export default SelecionarEleicao;

import React, {useEffect, useState} from 'react';
import moment from 'moment';
import axios from 'axios';
import {useHistory, useParams} from "react-router-dom";
import {Button, DatePicker, Form, Input, message, Result, Checkbox, Row, Col, Select} from 'antd';
import {ContentPage} from "../../../shared/components/ContentPage/ContentPage";
import {Loading} from "../../../shared/components/Loading/Loading";

const formItemLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 6},
};

const Eleicao: React.FC = (props) => {

    const [nome, setNome] = useState<string>('');
    const [cargos, setCargos] = useState<any[]>([]);
    const [feedbackSucesso, setFeedbackSucesso] = useState<boolean>(false);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(true);

    const history = useHistory();
    const {id} = useParams();
    const novo = id === 'novo';

    const getEleicao = (id: string) => {
        axios.get('/eleicoes/' + id)
            .then(function ({data}) {
                form.setFieldsValue({
                    nome: data.nome,
                    dataFim: moment(data.dataInicio),
                    dataInicio: moment(data.dataFim),
                    cargos: data.cargos.map((c: any) => c.id),
                })
                setNome(data.nome);
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
            });
    }

    const getCargos = () => {
        axios.get('/cargos')
            .then(function ({data}) {
                setCargos(data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        getCargos();
        if (!novo) {
            getEleicao(id);
        } else {
            setLoading(false);
        }
    }, []);

    const onSubmit = () => {

        console.log('cargos', form.getFieldValue('cargos'))

        const cargosSubmit: { id: string; }[] = [];
        form.getFieldValue('cargos').forEach((id: string) => {
            cargosSubmit.push({
                id
            })
        })

        if (novo) {
            axios.post('/eleicoes/criar', {
                nome: form.getFieldValue('nome'),
                dataInicio: form.getFieldValue('dataInicio'),
                dataFim: form.getFieldValue('dataFim'),
                cargos: cargosSubmit,
            })
                .then(function ({data}) {
                    if (data.id) {
                        setFeedbackSucesso(true);
                    }
                })
                .catch(function (error) {
                    message.error({content: 'Falha ao criar!', key: 'msg', duration: 2});
                });
        } else {
            message.loading({content: 'Aguarde...', key: 'msg'});
            axios.put('/eleicoes/editar', {
                id,
                nome: form.getFieldValue('nome'),
                dataInicio: form.getFieldValue('dataInicio'),
                dataFim: form.getFieldValue('dataFim'),
                cargos: cargosSubmit,
            })
                .then(function ({data}) {
                    if (data.id) {
                        message.success({content: 'Alterado!', key: 'msg', duration: 2});
                        setNome(form.getFieldValue('nome'));
                    }
                })
                .catch(function (error) {
                    message.error({content: 'Falha ao alterar!', key: 'msg', duration: 2});
                });
        }
    }

    const datasMaioresQueAtual = (current: moment.Moment) => {
        return current && current.isBefore(moment().subtract(1, "days"));
    }

    const datasMaioresInicial = (current: moment.Moment) => {
        return current && !current.isAfter(form.getFieldValue('dataInicio'));
    }

    const reset = () => {
        setFeedbackSucesso(false);
        form.setFieldsValue({
            nome: '',
            dataFim: null,
            dataInicio: null,
        })
        setNome('');
    }

    return (
        <>
            {loading ? <Loading/> :
                <ContentPage title={novo ? 'Nova Eleição' : nome}>
                    {feedbackSucesso ?
                        <Result
                            status="success"
                            title="Eleição criada com sucesso!"
                            extra={[
                                <Button type="primary" key="console" onClick={() => history.push("/eleicoes")}>
                                    Eleições
                                </Button>,
                                <Button key="buy" onClick={reset}>Criar nova Eleição</Button>,
                            ]}
                        />
                        :
                        <Form form={form} {...formItemLayout} onFinish={onSubmit}>
                            <Form.Item name='nome' label="Nome da eleição"
                                       rules={[{required: true, message: 'Campo obrigatório!'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item name='dataInicio' label="Data de início"
                                       rules={[{type: 'object', required: true, message: 'Campo obrigatório!'}]}>
                                <DatePicker format={"DD/MM/YYYY"} disabledDate={datasMaioresQueAtual}
                                />
                            </Form.Item>
                            <Form.Item name='dataFim' label="Dada de fim"
                                       rules={[{type: 'object', required: true, message: 'Campo obrigatório!'}]}>
                                <DatePicker format={"DD/MM/YYYY"} disabledDate={datasMaioresInicial}/>
                            </Form.Item>
                            <Form.Item name='cargos' label="Cargos" rules={[{required: true, message: 'Campo obrigatório!'}]}>
                                <Checkbox.Group>
                                    {cargos.map(c =>
                                        <>
                                            <Checkbox value={c.id} style={{lineHeight: '32px'}}>
                                                {c.nome}
                                            </Checkbox>
                                            <br/>
                                        </>
                                    )}
                                    {!cargos.length && "Nenhum cargo cadastrado"}
                                </Checkbox.Group>
                            </Form.Item>
                            <Form.Item wrapperCol={{offset: 4, span: 16}}>
                                <Button type="ghost" onClick={() => history.goBack()}>
                                    Cancelar
                                </Button>
                                <Button type="primary" htmlType="submit">
                                    {novo ? 'Criar' : 'Alterar'}
                                </Button>
                            </Form.Item>
                        </Form>
                    }
                </ContentPage>
            }
        </>
    );
}
export default Eleicao;

import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {Button, Empty, message, Popconfirm, Table} from 'antd';
import {PlusOutlined, QuestionCircleOutlined, DeleteOutlined} from '@ant-design/icons';
import {useHistory} from "react-router-dom";
import {ContentPage} from "../../../shared/components/ContentPage/ContentPage";
import axios from "axios";
import {Loading} from "../../../shared/components/Loading/Loading";

const Eleicoes: React.FC = () => {

    const [eleicoes, setEleicoes] = useState<any[]>([]);
    const history = useHistory();
    const [loading, setLoading] = useState<boolean>(true);

    const configuracaoColunas = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
            render: (text: any, item: any) => <a onClick={() => history.push("/eleicao/" + item.id) }>{text}</a>,
        },
        {
            title: 'Dada de Início',
            dataIndex: 'dataInicio',
            key: 'dataInicio',
            render: (v: any) => moment(v).format('DD/MM/YYYY')
        },
        {
            title: 'Data de término',
            dataIndex: 'dataFim',
            key: 'dataFim',
            render: (v: any) => moment(v).format('DD/MM/YYYY')
        },
        {
            key: 'remove',
            render: (text: string, item: any) => <Popconfirm onConfirm={() => remover(item.id)} title="Confirma a remoção？" icon={<QuestionCircleOutlined style={{color: 'red'}}/>}>
                <DeleteOutlined style={{color: 'red'}}/>
            </Popconfirm>
        },
    ];

    const getEleicoes = () => {
        axios.get('/eleicoes')
            .then(function ({data}) {
                console.log(data);
                setEleicoes(data);
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
            });
    }

    useEffect(() => {
        getEleicoes();
    }, []);

    const remover = (id: string) => {
        message.loading({content: 'Aguarde...', key: 'msg'});
        axios.delete('/eleicoes/' + id)
            .then(function ({data}) {
                message.success({content: 'Removido!', key: 'msg', duration: 2});
                getEleicoes();
            })
            .catch(function (error) {
                message.error({content: 'Falha ao remover!', key: 'msg', duration: 2});
            });
    }

    return (
        <>
            {loading ? <Loading/> :
                <ContentPage title={'Eleições'}>
                    <Button style={{marginBottom: 20}} type="primary" icon={<PlusOutlined/>}
                            onClick={() => history.push("/eleicao/novo")}>
                        Nova eleição
                    </Button>
                    {eleicoes.length ?
                        <Table columns={configuracaoColunas} dataSource={eleicoes}/>
                        :
                        <Empty description={'Nenhuma eleição cadastrada'}/>
                    }
                </ContentPage>
            }
        </>
    );
}
export default Eleicoes;

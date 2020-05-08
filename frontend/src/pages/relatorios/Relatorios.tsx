import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {Button, Empty, message, Popconfirm, Row, Table, Tag} from 'antd';
import {useHistory} from "react-router-dom";
import axios from "axios";
import {ContentPage} from "../../shared/components/ContentPage/ContentPage";
import {Loading} from "../../shared/components/Loading/Loading";

const Relatorios: React.FC = () => {

    const [eleicoes, setEleicoes] = useState<any[]>([]);
    const history = useHistory();
    const [loading, setLoading] = useState<boolean>(true);

    const configuracaoColunas = [
        {
            title: 'Eleição',
            dataIndex: 'nome',
            key: 'nome',
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
            title: 'Situação',
            dataIndex: 'situacao',
            key: 'situacao',
            render: (v: any) => Situacao(v)
        },
        {
            key: 'remove',
            dataIndex: 'situacao',
            render: (v: any, item: any) =>  BotaoRelatorio(v, item)
        },
    ];

    const getEleicoes = () => {
        axios.get('/api/eleicoes')
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
        axios.delete('/api/eleicoes/' + id)
            .then(function ({data}) {
                message.success({content: 'Removido!', key: 'msg', duration: 2});
                getEleicoes();
            })
            .catch(function (error) {
                message.error({content: 'Falha ao remover!', key: 'msg', duration: 2});
            });
    }

    const BotaoRelatorio = (situacao: string, eleicao: any) => {
        if (situacao === 'EM_ANDAMENTO') {
            return <Button type="default" onClick={() => history.push("/relatorio/" + eleicao.id)} style={{ width: 100 }}>
                Relatório
            </Button>
        }
        if (situacao === 'FINALIZADA') {
            return <Button type="primary" onClick={() => history.push("/relatorio/" + eleicao.id)} style={{ width: 100 }}>
                Relatório
            </Button>
        }
        return <></>;
    }

    const Situacao = (situacao: string) => {
        if (situacao === 'EM_ANDAMENTO') {
            return <Tag color="gold">EM ANDAMENTO</Tag>;
        }
        if (situacao === 'INDISPONIVEL') {
            return <Tag color="magenta">INDISPONÍVEL</Tag>;
        }
        return <Tag color="green">FINALIZADA</Tag>;
    }

    return (
        <>
            {loading ? <Loading/> :
                <ContentPage title={'Relatórios'}>
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
export default Relatorios;

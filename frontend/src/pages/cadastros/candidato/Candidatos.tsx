import React, {useEffect, useState} from 'react';
import {Avatar, Button, Empty, message, Popconfirm, Spin, Table} from 'antd';
import {PlusOutlined, QuestionCircleOutlined, DeleteOutlined, UserOutlined} from '@ant-design/icons';
import {useHistory} from "react-router-dom";
import {ContentPage} from "../../../shared/components/ContentPage/ContentPage";
import axios from "axios";
import {Loading} from "../../../shared/components/Loading/Loading";

const Candidatos: React.FC = () => {

    const [candidatos, setCandidatos] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const history = useHistory();

    const configuracaoColunas = [
        {
            title: 'Foto',
            dataIndex: 'foto',
            key: 'foto',
            render: (text: any, item: any) =>  <Avatar size={64} icon={<UserOutlined />} src={"/api/candidatos/foto/" + item.foto.id}/>,
        },
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
            render: (text: any, item: any) => <a onClick={() => history.push("/candidato/" + item.id) }>{text}</a>,
        },
        {
            title: 'Cargo',
            dataIndex: 'cargo',
            key: 'cargo',
            render: (str: string, v: any) => <span>{v?.cargo?.nome}</span>
        },
        {
            key: 'remove',
            render: (text: string, item: any) => <Popconfirm onConfirm={() => remover(item.id)} title="Confirma a remoção？" icon={<QuestionCircleOutlined style={{color: 'red'}}/>}>
                <DeleteOutlined style={{color: 'red'}}/>
            </Popconfirm>
        },
    ];

    const getCandidatos = () => {
        axios.get('/api/candidatos')
            .then(function ({data}) {
                console.log(data);
                setCandidatos(data);
                setLoading(false);
            })
            .catch(function (error) {
                setLoading(false);
            });
    }

    useEffect(() => {
        getCandidatos();
    }, []);

    const remover = (id: string) => {
        message.loading({content: 'Aguarde...', key: 'msg'});
        axios.delete('/api/candidatos/' + id)
            .then(function ({data}) {
                message.success({content: 'Removido!', key: 'msg', duration: 2});
                getCandidatos();
            })
            .catch(function (error) {
                message.error({content: 'Falha ao remover!', key: 'msg', duration: 2});
            });
    }

    return (
        <>
            {loading ? <Loading /> :
                <ContentPage title={'Candidatos'}>
                    <Button style={{marginBottom: 20}} type="primary" icon={<PlusOutlined/>}
                            onClick={() => history.push("/candidato/novo")}>
                        Novo candidato
                    </Button>
                    {candidatos.length ?
                        <Table columns={configuracaoColunas} dataSource={candidatos}/>
                        :
                        <Empty description={'Nenhum candidato cadastrado'}/>
                    }
                </ContentPage>
            }
        </>
    );
}
export default Candidatos;

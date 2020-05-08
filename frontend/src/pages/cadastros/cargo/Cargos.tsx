import React, {useEffect, useState} from 'react';
import {Avatar, Button, Empty, message, Popconfirm, Spin, Table} from 'antd';
import {PlusOutlined, QuestionCircleOutlined, DeleteOutlined, UserOutlined} from '@ant-design/icons';
import {useHistory} from "react-router-dom";
import {ContentPage} from "../../../shared/components/ContentPage/ContentPage";
import axios from "axios";
import {Loading} from "../../../shared/components/Loading/Loading";

const Cargos: React.FC = () => {

    const [cargos, setCargos] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const history = useHistory();

    const configuracaoColunas = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
            render: (text: any, item: any) => <a onClick={() => history.push("/cargo/" + item.id) }>{text}</a>,
        },
        {
            key: 'remove',
            render: (text: string, item: any) => <Popconfirm onConfirm={() => remover(item.id)} title="Confirma a remoção？" icon={<QuestionCircleOutlined style={{color: 'red'}}/>}>
                <DeleteOutlined style={{color: 'red'}}/>
            </Popconfirm>
        },
    ];

    const getCargos = () => {
        axios.get('/cargos')
            .then(function ({data}) {
                console.log(data);
                setCargos(data);
                setLoading(false);
            })
            .catch(function (error) {
                setLoading(false);
            });
    }

    useEffect(() => {
        getCargos();
    }, []);

    const remover = (id: string) => {
        message.loading({content: 'Aguarde...', key: 'msg'});
        axios.delete('/cargos/' + id)
            .then(function ({data}) {
                message.success({content: 'Removido!', key: 'msg', duration: 2});
                getCargos();
            })
            .catch(function (error) {
                message.error({content: 'Falha ao remover!', key: 'msg', duration: 2});
            });
    }

    return (
        <>
            {loading ? <Loading /> :
                <ContentPage title={'Cargos'}>
                    <Button style={{marginBottom: 20}} type="primary" icon={<PlusOutlined/>}
                            onClick={() => history.push("/cargo/novo")}>
                        Novo cargo
                    </Button>
                    {cargos.length ?
                        <Table columns={configuracaoColunas} dataSource={cargos}/>
                        :
                        <Empty description={'Nenhum cargo cadastrado'}/>
                    }
                </ContentPage>
            }
        </>
    );
}
export default Cargos;

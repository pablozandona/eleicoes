import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory, useParams} from "react-router-dom";
import {Button, Form, Input, message, Result} from 'antd';
import {ContentPage} from "../../../shared/components/ContentPage/ContentPage";
import {Loading} from "../../../shared/components/Loading/Loading";

const formItemLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 6},
};

const Cargo: React.FC = () => {

    const [nome, setNome] = useState<string>('');
    const [feedbackSucesso, setFeedbackSucesso] = useState<boolean>(false);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(true);

    const history = useHistory();
    const {id} = useParams();
    const novo = id === 'novo';

    const getCargo = (id: string) => {
        axios.get('/cargos/' + id)
            .then(function ({data}) {
                form.setFieldsValue({
                    nome: data.nome,
                })
                setNome(data.nome);
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
            });
    }

    useEffect(() => {
        if (!novo) {
            getCargo(id);
        } else {
            setLoading(false);
        }
    }, []);

    const onSubmit = () => {
        if (novo) {
            axios.post('/cargos/criar', {
                nome: form.getFieldValue('nome'),
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
            axios.put('/cargos/editar', {
                id,
                nome: form.getFieldValue('nome'),
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

    const reset = () => {
        setFeedbackSucesso(false);
        form.setFieldsValue({
            nome: '',
        })
        setNome('');
    }

    return (
        <>
            {loading ? <Loading/> :
                <ContentPage title={novo ? 'Novo Cargo' : nome}>
                    {feedbackSucesso ?
                        <Result
                            status="success"
                            title="Cargo criado com sucesso!"
                            extra={[
                                <Button type="primary" key="console" onClick={() => history.push("/cargos")}>
                                    Cargos
                                </Button>,
                                <Button key="buy" onClick={reset}>Criar novo Cargo</Button>,
                            ]}
                        />
                        :
                        <Form form={form} {...formItemLayout} onFinish={onSubmit}>
                            <Form.Item name='nome' label="Nome"
                                       rules={[{required: true, message: 'Campo obrigatório!'}]}>
                                <Input/>
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
export default Cargo;

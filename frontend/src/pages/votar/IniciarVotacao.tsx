import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory, useParams} from "react-router-dom";
import {Button, Empty, Form, Input, message} from 'antd';
import {ContentPage} from "../../shared/components/ContentPage/ContentPage";
import MaskedInput from 'antd-mask-input'
import {Loading} from "../../shared/components/Loading/Loading";


const formItemLayout = {
    labelCol: {span: 10},
    wrapperCol: {span: 6},
};

const IniciarVotacao: React.FC = () => {

    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(true);
    const [empty, setEmpty] = useState<boolean>(true);
    const history = useHistory();

    const existeEleicoes = () => {
        axios.get('/api/eleicoes/disponiveis/' + 'asd')
            .then(function ({data}) {
                if (!data.length) {
                    setEmpty(true);
                } else {
                    setEmpty(false);
                }
                setLoading(false);
            })
            .catch(function (error) {
                setLoading(false);
            });
    }

    useEffect(() => {
        existeEleicoes();
    }, []);

    const onSubmit = () => {
        message.loading({content: 'Aguarde...', key: 'msg'});
        axios.post('/api/eleitores/criar', {
            cpf: form.getFieldValue('cpf'),
            nome: form.getFieldValue('nome'),
        })
            .then(function ({data}) {
                if (data.id) {
                    history.push("/selecionarEleicao/" + form.getFieldValue('cpf'))
                }
                message.destroy();
            })
            .catch(function (error) {
                message.error({content: 'Falha!', key: 'msg', duration: 2});
            });
    }

    return (
        <>
            {loading ? <Loading/> :
            <ContentPage title={''}>
                {empty ? <>
                        <div style={{fontSize: 20, textAlign: 'center', color: "gray", padding: 50}}>
                            Bem-vindo, ainda não há eleições disponíveis para votação</div>
                        <Empty description="" imageStyle={{ height: 300 }}/>
                    </>
                    :
                    <>
                        <div style={{fontSize: 20, textAlign: 'center', color: "gray", padding: 50}}>Bem-vindo, entre
                            com seus dados para iniciar a votação:
                        </div>
                        <Form form={form} {...formItemLayout} onFinish={onSubmit}>
                            <Form.Item name='nome' label="Nome"
                                       rules={[{required: true, message: 'Campo obrigatório!'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item name='cpf' label="CPF"
                                       trigger={'onBlur'}
                                       validateTrigger={'onBlur'}
                                       rules={[{required: true, message: 'Campo obrigatório!'},
                                           () => ({
                                               validator(rule, value) {
                                                   if (value && value.replace(/\D/g, '').length !== 11) {
                                                       return Promise.reject('CPF inválido!');
                                                   }
                                                   return Promise.resolve();
                                               },
                                           }),
                                       ]}>
                                <MaskedInput mask="111.111.111-11"/>
                            </Form.Item>
                            <Form.Item wrapperCol={{offset: 10, span: 16}}>
                                <Button type="primary" htmlType="submit" size={"large"}>
                                    Iniciar votação
                                </Button>
                            </Form.Item>
                        </Form>
                    </>}
            </ContentPage>
            }
        </>
    );
}
export default IniciarVotacao;

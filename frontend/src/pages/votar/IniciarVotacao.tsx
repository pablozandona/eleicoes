import React, {useEffect, useState} from 'react';
import moment from 'moment';
import axios from 'axios';
import {useHistory, useParams} from "react-router-dom";
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, DatePicker, Form, Input, InputNumber, message, Result, Select, Upload} from 'antd';
import {ContentPage} from "../../shared/components/ContentPage/ContentPage";
import MaskedInput from 'antd-mask-input'


const formItemLayout = {
    labelCol: {span: 10},
    wrapperCol: {span: 6},
};

const IniciarVotacao: React.FC = () => {

    const [form] = Form.useForm();

    const history = useHistory();

    const onSubmit = () => {
        message.loading({content: 'Aguarde...', key: 'msg'});
        axios.post('/eleitores/criar', {
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
                message.error({content: 'Falha ao alterar!', key: 'msg', duration: 2});
            });
    }

    return (
        <>
            <ContentPage title={''}>
                <div style={{ fontSize: 20, textAlign: 'center', color: "gray", padding: 50 }}>Bem-vindo, entre com os dados para iniciar a votação: </div>
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
            </ContentPage>
        </>
    );
}
export default IniciarVotacao;

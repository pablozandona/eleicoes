import React, {useEffect, useState} from 'react';
import moment from 'moment';
import axios from 'axios';
import {useHistory, useParams} from "react-router-dom";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {Button, DatePicker, Form, Input, message, Result, Select, Upload} from 'antd';
import {ContentPage} from "../../../shared/components/ContentPage/ContentPage";
import {Loading} from "../../../shared/components/Loading/Loading";
const { Option } = Select;

const formItemLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 6},
};

const Candidato: React.FC = () => {

    const [cargos, setCargos] = useState<any[]>([]);
    const [nome, setNome] = useState<string>('');
    const [fotoId, setFotoId] = useState<string>('');
    const [feedbackSucesso, setFeedbackSucesso] = useState<boolean>(false);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingFoto, setLoadingFoto] = useState<boolean>(false);

    const history = useHistory();
    const {id} = useParams();
    const novo = id === 'novo';

    const getCandidato = (id: string) => {
        axios.get('/candidatos/' + id)
            .then(function ({data}) {
                form.setFieldsValue({
                    nome: data.nome,
                    cargo: data.cargo.id,
                    foto: data.foto.id,
                })
                setFotoId(data.foto.id);
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
            getCandidato(id);
        } else {
            setLoading(false);
        }
    }, []);

    const onSubmit = () => {
        if (novo) {
            axios.post('/candidatos/criar', {
                nome: form.getFieldValue('nome'),
                cargo: {
                    id: form.getFieldValue('cargo')
                },
                foto: {
                    id: fotoId
                },
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
            axios.put('/candidatos/editar', {
                id,
                nome: form.getFieldValue('nome'),
                cargo: {
                    id: form.getFieldValue('cargo')
                },
                foto: {
                    id: fotoId
                },
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
            foto: null,
            cargo: null,
        })
        setNome('');
        setFotoId('');
    }

    const uploadButton = (
        <div>
            {loadingFoto ? <LoadingOutlined /> : <PlusOutlined />}
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    function beforeUpload(file: any) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    const handleChange = (info: any) => {
        console.log('info', info)
        if (info.file.status === 'uploading') {
            setLoadingFoto(true);
            return;
        }
        if (info.file.status === 'done') {
            setFotoId(info.file.response);
            setLoadingFoto(false);
        }
    };

    return (
        <>
            {loading ? <Loading/> :
                <ContentPage title={novo ? 'Novo Candidato' : nome}>
                    {feedbackSucesso ?
                        <Result
                            status="success"
                            title="Candidato criado com sucesso!"
                            extra={[
                                <Button type="primary" key="console" onClick={() => history.push("/candidatos")}>
                                    Candidatos
                                </Button>,
                                <Button key="buy" onClick={reset}>Criar novo Candidato</Button>,
                            ]}
                        />
                        :
                        <Form form={form} {...formItemLayout} onFinish={onSubmit}>
                            <Form.Item name='nome' label="Nome"
                                       rules={[{required: true, message: 'Campo obrigatório!'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item name='cargo' label="Cargo"
                                       rules={[{required: true, message: 'Campo obrigatório!'}]}>
                                <Select
                                    showSearch
                                    placeholder="Selecione o cargo"
                                    optionFilterProp="children"
                                    filterOption={(input: string, option: any) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {cargos.map(c => <Option value={c.id}>{c.nome}</Option>)}
                                </Select>
                            </Form.Item>
                            <Form.Item name='foto' label="Foto"
                                       rules={[{required: true, message: 'Campo obrigatório!'}]}>
                                <Upload
                                    name="foto"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="/candidatos/salvarFoto"
                                    beforeUpload={beforeUpload}
                                    onChange={handleChange}
                                >
                                    {fotoId ? <img src={'/candidatos/foto/' + fotoId} alt="foto"
                                                   style={{width: '100%'}}/> : uploadButton}
                                </Upload>
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
export default Candidato;

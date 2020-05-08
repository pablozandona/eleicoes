import React, {useEffect, useState} from 'react';
import {Button, Empty, Row, Statistic, Table, Tag, Col } from 'antd';
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";
import {ContentPage} from "../../shared/components/ContentPage/ContentPage";
import {Loading} from "../../shared/components/Loading/Loading";
import Text from "antd/lib/typography/Text";

const Relatorio: React.FC = () => {

    const [votacao, setVotacao] = useState<any[]>([]);
    const [situacao, setSituacao] = useState<string>('');
    const [qtdEleitores, setQtdEleitores] = useState<number>(0);
    const [nome, setNome] = useState<string>('');

    const [loading, setLoading] = useState<boolean>(true);
    const {id} = useParams();

    const getRelatorio = () => {
        axios.get(`/api/eleicoes/${id}/relatorio`)
            .then(function ({data}) {
                console.log(data);
                setQtdEleitores(data.quantidadeEleitores);
                setSituacao(data.situacao);
                setNome(data.nomeEleicao);
                agruparPeloCargo(data.votacao);
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
            });
    }

    useEffect(() => {
        getRelatorio();
    }, []);

    const agruparPeloCargo = (votacao: any[]) => {
        const listaVotos: any = {};
        votacao.forEach(v => {
            !listaVotos[v.cargoId] && (listaVotos[v.cargoId] = []);
            listaVotos[v.cargoId].push(v);
        })
        setVotacao(Object.values(listaVotos))
    };

    const configuracaoColunas = [
        {
            title: 'Candidato',
            dataIndex: 'candidatoNome',
            key: 'candidato',
        },
        {
            title: 'Votos',
            dataIndex: 'quantidadeVotos',
            key: 'quantidadeVotos',
            width: 100,
            render: (v: any) => <Text style={{ fontWeight: "bold" }}>{v}</Text>
        },
    ];

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
                <ContentPage title={nome}>
                    <Row gutter={16}>
                        <Col>
                            <Statistic title="Quatidade de eleitores" value={qtdEleitores} style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}/>
                        </Col>
                        <Col>
                            {Situacao(situacao)}
                        </Col>
                    </Row>
                    {votacao.map(votos =>
                        <>
                            <div style={{ marginTop: 30, fontWeight: 'bold', fontSize: 16 }}>{votos[0].cargoNome}</div>
                            <Table columns={configuracaoColunas} dataSource={votos} style={{ marginTop: 20 }} showHeader={false} pagination={false}/>
                        </>
                    )}
                    {!votacao.length && <Empty/>}
                </ContentPage>
            }
        </>
    );
}
export default Relatorio;

import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import Eleicoes from "./pages/cadastros/eleicao/Eleicoes";
import Cargo from "./pages/cadastros/cargo/Cargo";
import locale from 'antd/es/locale/pt_BR';
import {ConfigProvider, Layout, Menu} from 'antd';
import Eleicao from "./pages/cadastros/eleicao/Eleicao";
import Candidatos from "./pages/cadastros/candidato/Candidatos";
import Candidato from "./pages/cadastros/candidato/Candidato";
import IniciarVotacao from "./pages/votar/IniciarVotacao";
import Cargos from "./pages/cadastros/cargo/Cargos";
import SelecionarEleicao from "./pages/votar/SelecionarEleicao";
import Relatorios from "./pages/relatorios/Relatorios";
import Relatorio from "./pages/relatorios/Relatorio";

const {Sider} = Layout;
const {SubMenu} = Menu;

const App: React.FC = () => {
    return (
        <ConfigProvider locale={locale}>
            <Router>
                <Layout>
                    <Sider
                        style={{
                            overflow: 'auto',
                            height: '100vh',
                            position: 'fixed',
                            left: 0,
                        }}
                    >
                        <div className="logo"/>
                        <Menu theme="dark" mode="inline" >
                            <Menu.Item key="votar">
                                <Link to="/">VOTAR</Link>
                            </Menu.Item>
                            <SubMenu key="eleicoes" title="Cadastros">
                                <Menu.Item key="eleicao"><Link to="/eleicoes">Eleições</Link></Menu.Item>
                                <Menu.Item key="cargo"><Link to="/cargos">Cargos</Link></Menu.Item>
                                <Menu.Item key="candidato"><Link to="/candidatos">Cadidatos</Link></Menu.Item>
                            </SubMenu>
                            <Menu.Item key="relatorios">
                                <Link to="/relatorios">Relatórios</Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout className="site-layout" style={{marginLeft: 200}}>
                        <Switch>
                            <Route path="/" exact={true} >
                                <IniciarVotacao/>
                            </Route>
                            <Route path="/selecionarEleicao/:cpf" children={<SelecionarEleicao/>}/>
                            <Route path="/eleicoes">
                                <Eleicoes/>
                            </Route>
                            <Route path="/eleicao/:id" children={<Eleicao/>}/>
                            <Route path="/cargos">
                                <Cargos/>
                            </Route>
                            <Route path="/cargo/:id" children={<Cargo/>}/>
                            <Route path="/candidatos">
                                <Candidatos/>
                            </Route>
                            <Route path="/candidato/:id" children={<Candidato/>}/>
                            <Route path="/relatorios">
                                <Relatorios/>
                            </Route>
                            <Route path="/relatorio/:id" children={<Relatorio/>}/>
                        </Switch>
                    </Layout>
                </Layout>
            </Router>
        </ConfigProvider>
    );
}
export default App;

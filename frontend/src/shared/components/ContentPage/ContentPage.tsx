import React, { FunctionComponent } from 'react';
import {Col, Layout, Row} from "antd";
const {Header, Content} = Layout;

type ContentPageProps = {
    title: string,
}

export const ContentPage: FunctionComponent<ContentPageProps> = (props) => <aside>
    <Header style={{padding: '10px 20px', alignContent: 'center', backgroundColor: 'transparent'}}>
        <div style={{ marginLeft: 20, fontSize: 20, fontWeight: 'bold' }}>
            { props.title }
        </div>
    </Header>
    <Content style={{padding: 30, overflow: 'initial'}}>
        <Row justify={"center"} align="middle">
        <Col xl={{ span: 14, offset: 2 }} flex={1} >
            {props.children}
        </Col>
        </Row>
    </Content>
</aside>

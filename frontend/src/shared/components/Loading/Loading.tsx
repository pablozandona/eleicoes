import React, {FunctionComponent} from 'react';
import {Layout, Spin} from "antd";

type LoadingProps = {}

export const Loading: FunctionComponent<LoadingProps> = (props) =>
    <aside>
        <div style={{display: "flex", justifyContent: "center", padding: 50}}>
            <Spin size="large"/>
        </div>
    </aside>

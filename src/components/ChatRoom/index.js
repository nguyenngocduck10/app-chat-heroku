import React from "react";
import { Row, Col, Typography, Button } from "antd";
import Siderbar from "./Siderbar";
import ChatWindow from "./ChatWindow";
import HeaderComponent from '../../components/HomePage/header.js';

const { Title } = Typography;


export default function ChatRoom() {

    return (
        <div>
            {/* <HeaderComponent /> */}
            <Row>
                <Col span={6}><Siderbar /></Col>
                {/* style={{ marginTop: 64 }} */}
                <Col span={18}><ChatWindow /></Col>
            </Row>
        </div>
    )
}
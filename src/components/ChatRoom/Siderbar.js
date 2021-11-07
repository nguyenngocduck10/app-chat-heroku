import React from "react";
import { Row, Col, Typography, Button } from "antd";
import UserInfo from "./UserInfo";
import RoomList from "./RoomList";
import styled from "styled-components";

const { Title } = Typography;

const SiderbarStyled = styled.div`
    background: pink;
    color: #fff;
    height: 100vh;
`;

export default function Siderbar() {

    return (
        <SiderbarStyled>
            <Row>
                <Col span={24}><UserInfo /></Col>
                <Col span={24}><RoomList /></Col>
            </Row>
        </SiderbarStyled>
    )
}
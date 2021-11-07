import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Button } from "antd";

const WrapperStyled = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 16px;
    boder-bottom: 1px solid rgba(82, 38, 83);

    .username {
        color: #fff;
        margin-left: 5px;
    }
`;

export default function UserInfo() {

    const history = useHistory();

    return (
        <Button onClick={()=>history.push("/chat")} type="link">Let go</Button>
    )
}
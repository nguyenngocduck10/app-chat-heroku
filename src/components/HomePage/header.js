import React, { useContext, useEffect } from "react";
import { Layout } from "antd";
import styled from "styled-components";

const { Header, Content, Sider } = Layout;
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

export default function HeaderComponent() {


    return (
        <Header className="header" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        {/* <div className="logo"><img src="https://i.pinimg.com/564x/5c/5b/29/5c5b29dc98d9e9034dcfb6bf4e7a6fe6.jpg" style={{width:30,height:30}} atl=""/></div> */}
        {/* sss */}
      </Header>
    )
}
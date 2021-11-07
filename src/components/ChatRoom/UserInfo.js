import React, { useContext, useEffect } from "react";
import { Row, Col, Typography, Button, Avatar } from "antd";
import styled from "styled-components";
import { auth, db } from "../../firebase/config";
import { AuthContext } from "../../Context/AuthProvider";
import { AppContext } from "../../Context/AppProvider";
const { Title } = Typography;

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

    // useEffect(() => {
    //     db.collection("users").onSnapshot((snapshot) => {
    //         const data = snapshot.docs.map(doc => ({
    //             ...doc.data(),
    //             id: doc.id
    //         }));
    //     });
    // }, []);

    const { user: {
        displayName, photoURL
    } } = useContext(AuthContext);

    const { setSelectedRoomId } = useContext(AppContext)
    return (
        <WrapperStyled>
            <div>
                <Avatar src={photoURL}>{photoURL ? "" : displayName?.chartAt(0)?.toUpperCase()}</Avatar>
                <Typography.Text className="username">{displayName}</Typography.Text>
            </div>
            <Button ghost onClick={() => { auth.signOut(); setSelectedRoomId(""); }}>Đăng xuất</Button>
        </WrapperStyled>
    )
}
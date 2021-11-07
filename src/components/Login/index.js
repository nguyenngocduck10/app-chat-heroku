import React from "react";
import { Row, Col, Typography, Button } from "antd";
import firebase, { auth, db } from "../../firebase/config";
import { addDocument, generateKeywords } from "../../firebase/services";
const { Title } = Typography;

const fbProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export default function Login() {

    const handleLogin = async (provider) => {
        const { additionalUserInfo, user } = await auth.signInWithPopup(provider);
        if (additionalUserInfo?.isNewUser) {
            addDocument('users', {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                provider: additionalUserInfo.providerId,
                keywords: generateKeywords(user.displayName?.toLowerCase()),
                totalPoint: 0
            });
            // db.collection('user').add({
            //     displayName: user.displayName, email: user.email, photoURL: user.photoURL, uid: user.uid, provider: additionalUserInfo.providerId
            // });
        }
    }

    return (
        <div>
            <Row justify="center" style={{ height: 800 }}>
                <Col span={8}>
                    <Title style={{ textAlign: "center" }} level={3}>Hello World</Title>
                    <Button style={{ marginBottom: 5, width: "100%" }} onClick={() => handleLogin(googleProvider)}>Đăng nhập bằng Google</Button>
                    <Button style={{ width: "100%" }} onClick={() => handleLogin(fbProvider)}>Đăng nhập bằng Facebook</Button>
                </Col>
            </Row>
        </div>
    )
}
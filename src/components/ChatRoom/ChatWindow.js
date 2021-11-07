import React, { useEffect, useContext, useMemo, useState } from "react";
import { Tooltip, Avatar, Typography, Button, Form, Input, Alert, Divider } from "antd";
import styled from "styled-components";
import { UserOutlined } from "@ant-design/icons";
import Message from "./Message";
import { AppContext } from "../../Context/AppProvider";
import { addDocument } from "../../firebase/services";
import { AuthContext } from "../../Context/AuthProvider";
import { useForm } from "antd/lib/form/Form";
import useFirestore from "../../hooks/useFireStore";
import Entertainment from "./Entertainment";
import { db } from "../../firebase/config";
const { Title } = Typography;

const HeaderStyled = styled.div`
    display: flex;
    justify-content: space-between;
    height: 56px;
    padding: 0 16px;
    align-items: center;
    border-bottom: 1px solid rgba(230, 230, 230);

    .header {
        &__info {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        &__title {
            margin: 0;
            font-weight: bold;
        }

        &__description {
            font-size: 12px;
        }
    }
`;

const ButtonGroupStyled = styled.div`
    display: flex;
    align-items: center;
`;

const ContentStyled = styled.div`
    height: calc(100% - 56px);
    display: flex;
    flex-direction: column;
    padding: 11px;
    justify-content: flex-end;
`;

const FormStyled = styled(Form)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px 2px 2px 0;
    border: 1px solid rgba(230, 230, 230x);
    border-radius: 2px;

    .ant-form-item {
        flex: 1;
        margin-bottom: 0;
    }
`;

const MessageListStyled = styled.div`
    max-height: 100%;
    overflow-y: auto;
`;
const WrapeprStyled = styled.div`
    height: 100vh;
`;

export default function ChatWindow() {
    const { selectedRoom, members, setIsInviteMemberVisible } = useContext(AppContext);
    const { user: { uid, photoURL, displayName } } = useContext(AuthContext);
    const [inputValue, setInputValue] = useState("");
    const [form] = Form.useForm();

    const condition = useMemo(() => ({
        fieldName: 'roomId',
        operator: "==",
        compareValue: selectedRoom.id
    }), [selectedRoom.id])

    const messages = useFirestore('messages', condition)

    useEffect(() => {
        var objDiv = document.getElementById("content_message");
        if (objDiv !== null) {
            objDiv.scrollTop = objDiv.scrollHeight;
            console.log(objDiv.scrollTop)
        }
    }, [messages])

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }
    const handleOnSubmit = () => {
        addDocument('messages', {
            text: inputValue,
            uid,
            photoURL,
            roomId: selectedRoom.id,
            displayName
        });
        form.resetFields(['messages']);
    }

    return (
        <WrapeprStyled>
            {
                selectedRoom.id ? (
                    <>
                        <HeaderStyled>
                            <div className="header__info">
                                <p className="header__title">{selectedRoom.name}</p>
                                <span className="header__description">{selectedRoom.description}</span>
                            </div>
                            <ButtonGroupStyled>
                                <Button icon={<UserOutlined />} type="text" disabled={selectedRoom.id === "DadJrgwhK4Ovent4l70N" && uid !== "f3ZOeM7M7HSuIBcEC8QMRa7CVZw2"}
                                    onClick={() => setIsInviteMemberVisible(true)}>Mời</Button>
                                <Avatar.Group size="small" maxCount={2}>
                                    {members.map(member => (
                                        <Tooltip title={member.displayName} key={member.id}>
                                            <Avatar src={member.photoURL}>{member.photoURL ? "" : member.displayName?.chartAt(0)?.toUpperCase()}</Avatar>
                                        </Tooltip>
                                    ))}

                                </Avatar.Group>
                            </ButtonGroupStyled>
                        </HeaderStyled>
                        <ContentStyled>
                            {selectedRoom.id === "DadJrgwhK4Ovent4l70N" && <Entertainment />}
                            <MessageListStyled id="content_message">
                                {
                                    messages.map(mes => (
                                        <Message key={mes.id} text={mes.text} photoURL={mes.photoURL} displayName={mes.displayName} createdAt={mes.createdAt} />
                                    ))
                                }
                            </MessageListStyled>
                            <Divider style={{ margin: "5px 0" }} />
                            <FormStyled form={form}>
                                <Form.Item name="messages">
                                    <Input onChange={handleInputChange} autoFocus
                                        onPressEnter={handleOnSubmit}
                                        placeholder="Nhập tin nhắn" bordered={false} autoComplete="off" />
                                </Form.Item>
                                <Button type="primary" onClick={handleOnSubmit}>Gửi</Button>
                            </FormStyled>
                        </ContentStyled>
                    </>
                ) : <Alert message="Hãy chọn phòng để tham gia trò chuyện" type="info" showIcon style={{ margin: 5 }} closable />
            }

        </WrapeprStyled>
    )
}
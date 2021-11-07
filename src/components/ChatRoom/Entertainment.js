import React, { useEffect, useState, useContext } from "react";
import { Input, Typography, Form, Radio, Statistic } from "antd";
import UserInfo from "./UserInfo";
import RoomList from "./RoomList";
import styled from "styled-components";
import firebase, { db } from "../../firebase/config";
import { AuthContext } from "../../Context/AuthProvider";
import { useMemo } from "react/cjs/react.development";
import AppProvider, { AppContext } from "../../Context/AppProvider";
import useFirestore from "../../hooks/useFireStore";
import { addDocument } from "../../firebase/services";

const { Title } = Typography;
const { Countdown } = Statistic;

const WrapperStyled = styled.div`
    position: relative;
    
    .turn {
        background: #ed3976;
        position: absolute;
        top: -3px;
        right: 65px;
        border-radius: 5px;
        padding: 2px 20px;
        z-index: 1;
        font-weight: bold;
        color: #fff;
    }
`;

const GroupStyled = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;

    .group {
        width: 100%;
    }

    .question {
        border-radius: 5px;
        background: #03a9f4;
        padding: 5px 10px;
        height: 50px;
        font-size: 17px;
        text-align: center;
        font-weight: 500;
        padding-right: 85px;
        word-break: break-word;
        overflow-x: auto;
    }

    .answer {
        border-radius: 5px;
        background: #8bc34a;
        padding: 5px 10px;
        width: 80%;
        float: right;
        height: 50px;
        padding-right: 45px;
        display: flex;
        align-items: center;
        justify-content: center;

        p {
            margin-bottom: 0px;
        }
    }

    .time {
        height: 100px;
        width: 100px;
        background: #ed3976;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: -40px;
        z-index: 2;
        font-weight: bold;
        color: #fff;
    }
`;

const StaticStyled = styled(Countdown)`
    .ant-statistic-content-value {
        color: #fff;
    }
`;

function Entertainment() {
    const [form] = Form.useForm();
    const [listAnswer, setListAnswer] = useState({});
    const [newValue, setNewValue] = useState("");
    const { user: { uid } } = useContext(AuthContext);
    const { selectedRoom } = useContext(AppContext);
    const [isFinish, setIsFinish] = useState(false);
    let value_radio = "";

    const getUser = async () => {
        let tmp_point = await db.collection("users")
            .where('uid', '==', uid)
            .orderBy("createdAt")
            .limit(20)
            .get()
            .then(snapshot => {
                const data = snapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id
                }));
                return data;
            });
        return tmp_point;
    }

    useEffect(async () => {
        if (isFinish) {
            let tmp_info = await getUser();
            let tmp_listQuestions = listQuestions.filter(item => !item.isExpires);
            addDocument('anwsers', {
                text: listQuestions[0].type === 1 ? newValue : form.getFieldValue("anwser") || "",
                uid,
                roomId: selectedRoom.id,
                entertainmentId: tmp_listQuestions[0].id
            });
            setListAnswer({
                text: listQuestions[0].type === 1 ? newValue : form.getFieldValue("anwser") || "",
                uid,
                roomId: selectedRoom.id,
                entertainmentId: tmp_listQuestions[0].id
            });
            //duration
            const roomRef = db.collection("entertainment").doc(tmp_listQuestions[0].id);
            roomRef.update({ duration: 0 });
            //point
            const usersRef = db.collection("users").doc(tmp_info[0].id);
            // console.log('tmp_info[0]---',tmp_info[0])
            usersRef.update({ totalPoint: tmp_info[0].totalPoint + 1 });

            form.setFieldsValue({ anwser: "" });
            setNewValue("");
            setIsFinish(false);
        }
    }, [isFinish]);

    const condition = useMemo(() => ({
        fieldName: 'roomId',
        operator: "==",
        compareValue: selectedRoom.id === "DadJrgwhK4Ovent4l70N" ? "DadJrgwhK4Ovent4l70N" : ""
    }), [selectedRoom.id]);

    const listQuestions = useFirestore('entertainment', condition);

    const onFinish = () => {
        setIsFinish(true);
    }
    // console.log({ listQuestions })
    return (
        <WrapperStyled>
            {
                listQuestions.map(question => (
                    !question.isExpires &&
                    <div key={question.id} style={{ position: "relative", marginTop: 5 }}>
                        <p className="turn">Vòng {String(question.turn)}</p>
                        <GroupStyled>
                            <div className="group">
                                <div className="question">{question.question}</div>
                                <div className="answer">
                                    <Form form={form} style={{ width: "100%" }}>
                                        <Form.Item name="anwser" style={{ marginBottom: 0 }}>
                                            {question.duration > 0 ?
                                                question.type === 1 ?
                                                    <Radio.Group value={newValue} onChange={(e) => {
                                                        setNewValue(e.target.value);
                                                        value_radio = e.target.value;
                                                    }}>
                                                        {question.options.map(opt => (
                                                            <Radio key={opt} value={opt}>{opt}</Radio>
                                                        ))}
                                                    </Radio.Group> :
                                                    <Input placeholder="Nhập đáp án" /> :
                                                <div style={{ fontWeight: 500, textAlign: "center" }}>
                                                    <p>Câu trả lời của bạn là: {listAnswer.text ? listAnswer.text : ""}</p>
                                                    <p>Đáp án đúng là: {question.answer}</p>
                                                </div>}
                                        </Form.Item>
                                    </Form>
                                </div>
                            </div>
                            <div className="time"><CountdownView question={question} onFinish={onFinish} /></div>
                        </GroupStyled>
                    </div>
                ))
            }
        </WrapperStyled>
    )
}

const CountdownView = React.memo(({ question, onFinish }) => {
    return <StaticStyled value={Date.now() + question.duration * 1000} format="ss" onFinish={() => onFinish()} />
}, (prevProps, nextProps) => prevProps.question === nextProps.question);

export default Entertainment;
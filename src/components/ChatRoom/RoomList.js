import React, { useContext, useMemo } from "react";
import { Row, Col, Typography, Button, Avatar, Collapse } from "antd";
import styled from "styled-components";
import { PlusSquareOutlined } from "@ant-design/icons";
import useFireStore from "../../hooks/useFireStore";
import { AppContext } from "../../Context/AppProvider";
const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
    &&& {
        .ant-collapse-header, p {
            color: #fff;
        }
        
        .ant-collapse-content-box {
            padding: 0 40px;
        }

        .add-room {
            color: #fff;
        }
    }
`;

const LinkStyled = styled(Typography.Link)`
    display: block;
    margin-bottom: 5px;
    color: #fff;
`;

export default function RoomList() {
    const { rooms, setIsAddRoomVisible, setSelectedRoomId } = useContext(AppContext);

    const handleAddRoom = () => {
        setIsAddRoomVisible(true);
    }

    return (
        <Collapse ghost defaultActiveKey={["2"]}>
            <PanelStyled header="Khu vui chơi" key="1">
                <LinkStyled key={"DadJrgwhK4Ovent4l70N"} onClick={() => setSelectedRoomId("DadJrgwhK4Ovent4l70N")}>Phòng 1</LinkStyled>
            </PanelStyled>
            <PanelStyled header="Phòng trò chuyện" key="2">
                {
                    rooms.map(room => (
                        room.id!=="DadJrgwhK4Ovent4l70N"&&
                        <LinkStyled key={room.id} onClick={() => setSelectedRoomId(room.id)}>{room.name}</LinkStyled>
                    ))
                }
                <Button type="text" className="add-room" icon={<PlusSquareOutlined />} onClick={handleAddRoom}>Tạo phòng mới</Button>
            </PanelStyled>
        </Collapse>
    )
}
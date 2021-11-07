import React, { useContext, useMemo, useState, useEffect } from 'react';
import { Form, Modal, Input, Spin, Avatar, Select } from 'antd';
import { AppContext } from '../../Context/AppProvider';
import { addDocument } from '../../firebase/services';
import { AuthContext } from '../../Context/AuthProvider';
import { debounce } from 'lodash';
import { db } from "../../firebase/config";

function DebounceSelect({ fetchOptions, debounceTimeout = 300, curMembers, ...props }) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);

    const debounceFetcher = useMemo(() => {
        const loadOptions = (value) => {
            setOptions([]);
            setFetching(true);

            fetchOptions(value, curMembers).then((newOptions) => {
                setOptions(newOptions);
                setFetching(false);
            });
        };

        return debounce(loadOptions, debounceTimeout);
    }, [debounceTimeout, fetchOptions, curMembers])

    useEffect(() => {
        return () => {
            // clear when unmount
            setOptions([]);
        };
    }, []);
    return (
        <Select labelInValue onSearch={debounceFetcher} filterOption={false}
            notFoundContent={fetching ? <Spin size='small' /> : null} {...props}>
            {
                options.map(opt => (
                    <Select.Option key={opt.value} value={opt.value} title={opt.label}>
                        <Avatar size="small" src={opt.photoURL}>
                            {opt.photoURL ? "" : opt.label?.chartAt(0)?.toUpperCase()}
                        </Avatar>
                        {` ${opt.label}`}
                    </Select.Option>
                ))
            }
        </Select>
    )
}

async function fetchUserList(search, curMembers) {
    //dung de delete room
    // const { user:{uid} } = useContext(AuthContext);console.log({uid}) new uid trung voi author thi moi cho xoa room
    //ai la chu thi duoi thanh vien ra khoi phong

//     var jobskill_query = db.collection('rooms')
//   .doc("3NJkddbFJjKls5L5eOo4")
//   .delete()
//   .then(res => {
//      console.log('Product deleted Successfully');
//    })
//   .catch((error) => {
//      console.error('Error removing document: ', error);
//   });
    return db.collection("users")
        .where('keywords', 'array-contains', search?.toLowerCase())
        .orderBy("displayName")
        .limit(20)
        .get()
        .then(snapshot => {
            return snapshot.docs
                .map((doc) => ({
                    label: doc.data().displayName,
                    value: doc.data().uid,
                    photoURL: doc.data().photoURL,
                }))
                .filter((opt) => !curMembers.includes(opt.value));
        });

}
export default function InviteMemberModal() {
    const { isInviteMemberVisible, setIsInviteMemberVisible, selectedRoomId, selectedRoom } = useContext(AppContext);
    
    const [value, setValue] = useState([]);

    const [form] = Form.useForm();

    console.log("selectedRoom==",{selectedRoom})
    const handleOk = () => {
        // handle logic
        // add new room to firestore
        // console.log(form.getFieldsValue(),...value.map(val => val.value))

        // reset form value
        form.resetFields();
        setValue([]);
        const roomRef = db.collection("rooms").doc(selectedRoomId);
        roomRef.update({
            members: [...selectedRoom.members, ...value.map(val => val.value)]
        });

        setIsInviteMemberVisible(false);
    };

    const handleCancel = () => {
        // reset form value
        form.resetFields();
        setValue([]);
        setIsInviteMemberVisible(false);
    };

    return (
        <div>
            <Modal
                title='Moit them thanh vien'
                visible={isInviteMemberVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                destroyOnClose={true}
            >
                <Form form={form} layout='vertical'>
                    <DebounceSelect
                        mode='multiple'
                        name='search-user'
                        label='Tên các thành viên'
                        value={value}
                        placeholder='Nhập tên thành viên'
                        fetchOptions={fetchUserList}
                        onChange={(newValue) => setValue(newValue)}
                        style={{ width: '100%' }}
                        curMembers={selectedRoom.members} />
                </Form>
            </Modal>
        </div>
    );
}
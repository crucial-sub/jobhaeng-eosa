import React, { Dispatch, SetStateAction } from 'react';
import styled from '@emotion/styled';
import { useState } from 'react';
import {
    addDoc,
    collection,
    doc,
    getDocs,
    onSnapshot,
    query,
    serverTimestamp,
    updateDoc,
    where,
} from 'firebase/firestore';
import { dbService } from 'fbase';
import { useSelector } from 'react-redux';
import { ItemTypes, RootState } from 'store';

type Props = {
    setNewMessage: Dispatch<SetStateAction<string>>;
    newMessage: string;
    chatId: string | string[] | undefined;
    items: ItemTypes | undefined;
};

const ChattingInput = (props: Props) => {
    const { setNewMessage, newMessage, chatId, items } = props;
    const messagesRef = collection(dbService, 'messages');
    const { currentUser } = useSelector(
        (state: RootState) => state.currentUser,
    );
    const [chatNum, setchatNum] = useState('');
    // console.log(chatNum);

    const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewMessage(e.target.value);
    };

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const chatsRef = collection(dbService, 'chats');

        const q = query(
            chatsRef,
            where('users', 'array-contains', currentUser.uid),
        );
        const querySnapShot = await getDocs(q);
        const userAlreadyExist = (userid: string | string[] | undefined) =>
            !!querySnapShot?.docs.find(
                (chat) =>
                    chat
                        .data()
                        .users.find(
                            (user: string | string[] | undefined) =>
                                user === userid,
                        )?.length > 0,
            );

        const idAlreadyExist = (id: string | string[] | undefined) =>
            !!querySnapShot?.docs.find((chat) => chat.data().requestId === id);

        if (!userAlreadyExist(items?.userId) && !idAlreadyExist(chatId)) {
            const docRef = await addDoc(chatsRef, {
                title: items?.title,
                requestId: chatId,
                users: [currentUser.uid, chatId],
            });
            setchatNum(docRef.id);
            setNewMessage('');
            console.log('채팅방 생성!');
            return;
        } else {
            console.log('이미존재');
        }
        // setNewMessage('');

        // if (!chatAlreadyExist(items?.userId, items?.id)) {

        // } else {
        //     console.log('이미 존재합니다');
        //     setNewMessage('');
        //     return;
        // }
    };
    return (
        <Container onSubmit={handleOnSubmit}>
            <TextArea
                id="story"
                name="story"
                onChange={handleOnChange}
                value={newMessage}
            />
            <Send type="submit" value="전송" />
        </Container>
    );
};

const Container = styled.form`
    width: 100%;
`;
const TextArea = styled.textarea`
    width: 80%;
    height: 100%;
`;

const Send = styled.input`
    height: 100%;
    width: 15%;
`;
export default ChattingInput;

// const querySnapShot = await getDocs(q);
// const chatAlreadyExist = (chatId: string | string[] | undefined) =>
//     !!querySnapShot?.docs.find(
//         (chat) =>
//             chat.data().users.find((user: string) => user === chatId)
//                 ?.length > 0,
//     );
// console.log(' 채팅 생성 ');
// if (!chatAlreadyExist(chatId)) {

// const unsubscribe = onSnapshot(q, (querySnapshot) => {
//     querySnapshot.forEach(async (document) => {
//         if (
//             document.data().requestId !== chatId &&
//             !document
//                 .data()
//                 .users.find((user: string) => user === items?.userId) &&
//             document.data().title !== items?.title
//         ) {
//             const docRef = await addDoc(chatsRef, {
//                 title: items?.title,
//                 requestId: chatId,
//                 users: [currentUser.uid, items?.userId],
//             });
//             setchatNum(docRef.id);
//             console.log('채팅방 생성');
//             return;
//         } else {
//             console.log('채팅방이 이미있습니다');
//             return;
//         }
//     });
// });

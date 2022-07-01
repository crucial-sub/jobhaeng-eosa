import React, { Dispatch, SetStateAction } from 'react';
import styled from '@emotion/styled';
import { useState } from 'react';
import {
    addDoc,
    collection,
    doc,
    getDocs,
    query,
    serverTimestamp,
    updateDoc,
    where,
} from 'firebase/firestore';
import { dbService } from 'fbase';
import { useSelector } from 'react-redux';
import { ItemTypes, RootState } from 'store';

type Props = {
    items: ItemTypes | undefined;
    docId: string;
    setDocId: Dispatch<SetStateAction<string>>;
};

const ChattingInput = (props: Props) => {
    const { items, docId, setDocId } = props;
    const [newMessage, setNewMessage] = useState('');

    const { currentUser } = useSelector(
        (state: RootState) => state.currentUser,
    );

    const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewMessage(e.target.value);
    };

    const addChating = async (id: string) => {
        const addChatRef = collection(dbService, 'chats', id, 'messages');
        await addDoc(addChatRef, {
            timestamp: serverTimestamp(),
            message: newMessage,
            user: currentUser.email,
            nickName: currentUser.nickName,
        });
        setNewMessage('');
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

        if (!userAlreadyExist(items?.userId) && !idAlreadyExist(items?.id)) {
            const docRef = await addDoc(chatsRef, {
                title: items?.title,
                requestId: items?.id,
                nickName: [currentUser.nickName, items?.nickName],
                users: [currentUser.uid, items?.userId],
            });
            const chatRef = doc(dbService, 'chats', docRef.id);
            if (chatRef) {
                await updateDoc(doc(dbService, 'chats', docRef.id), {
                    id: docRef.id,
                });
                setDocId(docRef.id);
            }

            return addChating(docRef.id);
        } else {
            return addChating(docId);
        }
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
    display: flex;
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

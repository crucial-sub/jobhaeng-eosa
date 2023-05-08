import React, { useEffect } from 'react';
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
import { docIdAction, ItemTypes, RootState } from 'store';
import { useDispatch } from 'react-redux';
import * as S from './styles';

type Props = {
    items: ItemTypes | undefined;
};

const ChattingInput = (props: Props) => {
    const dispatch = useDispatch();
    const { items } = props;
    const [newMessage, setNewMessage] = useState('');

    const { currentUser } = useSelector(
        (state: RootState) => state.currentUser,
    );

    const { docId } = useSelector((state: RootState) => state.docId);

    const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewMessage(e.target.value);
    };
    const addChating = async (docId: string) => {
        const addChatRef = collection(dbService, 'chats', docId, 'messages');
        await addDoc(addChatRef, {
            timestamp: serverTimestamp(),
            message: newMessage,
            user: currentUser.email,
            nickName: currentUser.nickName,
        });
        await updateDoc(doc(dbService, 'chats', docId), {
            lastChat: newMessage,
        });
        setNewMessage('');
    };

    useEffect(() => {}, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            const enterKey = document.getElementById('submitBtn');
            enterKey?.click();
        } else {
            return;
        }
    };

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const chatsRef = collection(dbService, 'chats');
        const q = query(
            chatsRef,
            where('users', 'array-contains', currentUser.uid),
        );

        const querySnapShot = await getDocs(q);
        const userAlreadyExist = (
            userid: string | string[] | undefined,
            id: string,
        ) =>
            !!querySnapShot?.docs.find(
                (chat) =>
                    chat
                        .data()
                        .users.find(
                            (user: string | string[] | undefined) =>
                                user === userid && user === id,
                        )?.length > 0,
            );

        const idAlreadyExist = (id: string | string[] | undefined) =>
            !!querySnapShot?.docs.find((chat) => chat.data().requestId === id);

        if (
            !userAlreadyExist(items?.userId, currentUser.uid) &&
            !idAlreadyExist(items?.id)
        ) {
            const docRef = await addDoc(chatsRef, {
                title: items?.title,
                requestId: items?.id,
                nickName: [currentUser.nickName, items?.nickName],
                onOff: ['on', 'on'],
                users: [currentUser.uid, items?.userId],
                town: items?.town,
                lastChat: '',
                ongoing: false,
                requestEnd: false,
            });

            await updateDoc(doc(dbService, 'chats', docRef.id), {
                id: docRef.id,
            });
            dispatch(docIdAction.docId(docRef.id));

            return addChating(docRef.id);
        } else {
            const collectionRef = collection(dbService, 'chats');
            const docsRef = await getDocs(collectionRef);
            const chatRoom = docsRef.docs
                .find((doc) => doc.id === docId)
                ?.data();

            if (currentUser.uid === items?.userId) {
                const newState = [chatRoom?.onOff[0], 'on'];
                await updateDoc(doc(dbService, 'chats', docId), {
                    onOff: [...newState],
                });
            } else {
                const newState = ['on', chatRoom?.onOff[1]];
                await updateDoc(doc(dbService, 'chats', docId), {
                    onOff: [...newState],
                });
            }

            return addChating(docId);
        }
    };

    return (
        <S.Container onSubmit={handleOnSubmit}>
            <S.TextArea
                id="story"
                name="story"
                onChange={handleOnChange}
                onKeyDown={handleKeyDown}
                value={newMessage}
            />
            <S.Send
                type="submit"
                id="submitBtn"
                value="전송"
                disabled={newMessage === ''}
            />
        </S.Container>
    );
};

export default ChattingInput;

import styled from '@emotion/styled';
import { dbService } from 'fbase';
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    onSnapshot,
    query,
    updateDoc,
    where,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

type Props = {};

const ChatOut = (props: Props) => {
    const router = useRouter();
    const { currentUser } = useSelector(
        (state: RootState) => state.currentUser,
    );
    const { docId } = useSelector((state: RootState) => state.docId);

    const handleClick = async (e: React.MouseEvent<HTMLDivElement>) => {
        const collectionRef = collection(dbService, 'chats');

        if (confirm('채팅방을 나가시겠습니까?')) {
            const docsRef = await getDocs(collectionRef);
            const chatRoom = docsRef.docs
                .find((doc) => doc.id === docId)
                ?.data();
            if (currentUser.uid === chatRoom?.users[1]) {
                const newState = [chatRoom?.onOff[0], 'off'];
                await updateDoc(doc(dbService, 'chats', docId), {
                    onOff: [...newState],
                });
            } else {
                const newState = ['off', chatRoom?.onOff[1]];
                await updateDoc(doc(dbService, 'chats', docId), {
                    onOff: [...newState],
                });
            }

            const q = query(collectionRef, where('id', '==', docId));
            const unsubscribes = onSnapshot(q, async (querySnapshot) => {
                if (querySnapshot.docs[0]) {
                    const chatRoom = querySnapshot.docs[0].data();
                    if (
                        chatRoom?.onOff.every(
                            (check: string) => check === 'off',
                        )
                    ) {
                        await deleteDoc(doc(dbService, 'chats', docId));
                    }
                }
            });

            router.push('/');
        } else return;
    };
    return <ChatOutBtn onClick={handleClick}>채팅방 나가기</ChatOutBtn>;
};

const ChatOutBtn = styled.div`
    cursor: pointer;
`;

export default ChatOut;

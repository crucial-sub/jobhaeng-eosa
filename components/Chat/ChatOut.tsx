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
import { ItemTypes, RootState } from 'store';

type Props = {
    items: ItemTypes | undefined;
};

const ChatOut = (props: Props) => {
    const router = useRouter();
    const { items } = props;
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
            if (currentUser.uid === items?.userId) {
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
    return <div onClick={handleClick}>채팅방 나가기</div>;
};

export default ChatOut;

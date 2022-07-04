import { dbService } from 'fbase';
import { collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
import React from 'react';
import { useSelector } from 'react-redux';
import { ItemTypes, RootState } from 'store';

type Props = {
    items: ItemTypes | undefined;
    docId: string;
};

const ChatOut = (props: Props) => {
    const { items, docId } = props;
    const { currentUser } = useSelector(
        (state: RootState) => state.currentUser,
    );
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const collectionRef = collection(dbService, 'chats');
        const q = query(collectionRef, where('userId', '==', currentUser.uid));
        if (confirm('삭제하시겠습니까?')) {
            const unsubscribes = onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach(async (document) => {
                    if (
                        document.data().userId === currentUser.uid
                    ) {
                        await deleteDoc(doc(dbService, 'items', document.id));
                    }
                });
            });
    };

    return <div onClick={handleClick}>채팅방 나가기</div>;
};

export default ChatOut;

import { dbService } from 'fbase';
import {
    addDoc,
    collection,
    doc,
    getDocs,
    query,
    updateDoc,
    where,
} from 'firebase/firestore';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import { ItemTypes, RootState } from 'store';

type Props = {
    id: string | string[] | undefined;
    item: ItemTypes;
};

const ChatButton = (props: Props) => {
    const { id, item } = props;
    // const []
    const { currentUser } = useSelector(
        (state: RootState) => state.currentUser,
    );

    const handleOnClick = async () => {
        // const chatsRef = collection(dbService, 'chats');
        // const q = query(
        //     chatsRef,
        //     where('users', 'array-contains', currentUser.uid),
        // );
        // const querySnapShot = await getDocs(q);
        // const userAlreadyExist = (userid: string | string[] | undefined) =>
        //     !!querySnapShot?.docs.find(
        //         (chat) =>
        //             chat
        //                 .data()
        //                 .users.find(
        //                     (user: string | string[] | undefined) =>
        //                         user === userid,
        //                 )?.length > 0,
        //     );
        // const idAlreadyExist = (id: string | string[] | undefined) =>
        //     !!querySnapShot?.docs.find((chat) => chat.data().requestId === id);
        // if (!userAlreadyExist(item?.userId) && !idAlreadyExist(id)) {
        //     const docRef = await addDoc(chatsRef, {
        //         title: item?.title,
        //         requestId: id,
        //         nickName: [currentUser.nickName, item?.nickName],
        //         users: [currentUser.uid, id],
        //     });
        //     const chatRef = doc(dbService, 'chats', docRef.id);
        //     if (chatRef) {
        //         await updateDoc(doc(dbService, 'chats', docRef.id), {
        //             id: docRef.id,
        //         });
        //     }
        //     return;
        // } else {
        //     console.log('이미존재');
        //     return;
        // }
    };
    return (
        <Link href={`/chats/${id}`}>
            <button onClick={handleOnClick}>ChatButton</button>
        </Link>
    );
};

export default ChatButton;

import { dbService } from 'fbase';
import styled from '@emotion/styled';
import {
    collection,
    DocumentData,
    onSnapshot,
    query,
    QueryDocumentSnapshot,
    where,
} from 'firebase/firestore';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ChatListInitialTypes, chatListsAction, RootState } from 'store';
import { useDispatch } from 'react-redux';

type Props = {};

export interface ChatTypes {
    requestId?: string | undefined;
    title?: string | undefined;
    users?: [] | undefined;
    id: string | undefined;
    nickName?: [] | undefined;
    user?: string[] | undefined;
}

const ChatLists = (props: Props) => {
    const dispatch = useDispatch();
    const { chatsList } = useSelector((state: RootState) => state.chatList);
    const { currentUser } = useSelector(
        (state: RootState) => state.currentUser,
    );
    const currentUseruid = currentUser.uid;
    useEffect(() => {
        const chatsRef = collection(dbService, 'chats');
        const q = query(
            chatsRef,
            where('users', 'array-contains', currentUser.uid),
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const chatArray = querySnapshot.docs.map(
                (doc: QueryDocumentSnapshot<DocumentData>) => ({
                    ...doc.data(),
                    user: doc.data().users,
                    id: doc.id,
                }),
            );
            dispatch(chatListsAction.chatList(chatArray));
        });
        return unsubscribe;
    }, [currentUser.uid, currentUseruid, dispatch]);
    console.log(currentUseruid);
    console.log(chatsList);

    return (
        <>
            {chatsList.map((a) => {
                if (a.user?.indexOf(currentUseruid) === 1) {
                    if (a.onOff?.indexOf('on') === 1) {
                        return (
                            <Link key={a.id} href={`chats/${a.requestId}`}>
                                <div>
                                    <div>제목은 {a.title}입니다</div>
                                    <div>
                                        닉네임은{' '}
                                        {a.nickName?.map((a) => {
                                            if (a !== currentUser.nickName) {
                                                return a;
                                            }
                                        })}
                                        입니다
                                    </div>
                                </div>
                            </Link>
                        );
                    }
                    return;
                } else if (a.user?.indexOf(currentUseruid) === 0) {
                    if (a.onOff?.indexOf('on') === 0) {
                        return (
                            <Link key={a.id} href={`chats/${a.requestId}`}>
                                <div>
                                    <div>제목은 {a.title}입니다</div>
                                    <div>
                                        닉네임은{' '}
                                        {a.nickName?.map((a) => {
                                            if (a !== currentUser.nickName) {
                                                return a;
                                            }
                                        })}
                                        입니다
                                    </div>
                                </div>
                            </Link>
                        );
                    }
                }
            })}
        </>
    );
};

export default ChatLists;
// return (
// <Link key={a.id} href={`chats/${a.requestId}`}>
//     <div>
//         <div>제목은 {a.title}입니다</div>
//         <div>
//             닉네임은{' '}
//             {a.nickName?.map((a) => {
//                 if (a !== currentUser.nickName) {
//                     return a;
//                 }
//             })}
//             입니다
//         </div>
//     </div>
// </Link>
// );

// <Link key={a.id} href={`chats/${a.requestId}`}>
//     <div>
//         <div>제목은 {a.title}입니다</div>
//         <div>
//             닉네임은{' '}
//             {a.nickName?.map((a) => {
//                 if (a !== currentUser.nickName) {
//                     return a;
//                 }
//             })}
//             입니다
//         </div>
//     </div>
// </Link>
// if (a.users[0] === currentUser.uid) {
//     chatOnOff = querySnapshot.docs[0].data().onOff[1];
// } else {
//     chatOnOff = querySnapshot.docs[0].data().onOff[0];
// }
// if (chatOnOff === 'on') {
//     setIsOn(true);
// } else if (chatOnOff === 'off') {
//     setIsOn(false);
// }

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
import { RootState } from 'store';

type Props = {};

export interface ChatTypes {
    requestId?: string | undefined;
    title?: string | undefined;
    users?: [] | undefined;
    id: string | undefined;
    nickName?: [] | undefined;
}

const ChatLists = (props: Props) => {
    const [chatsList, setChatsList] = useState<ChatTypes[]>([]);
    const { currentUser } = useSelector(
        (state: RootState) => state.currentUser,
    );
    useEffect(() => {
        const chatsRef = collection(dbService, 'chats');
        const q = query(
            chatsRef,
            where('users', 'array-contains', currentUser.uid),
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setChatsList(
                querySnapshot.docs.map(
                    (doc: QueryDocumentSnapshot<DocumentData>) => ({
                        ...doc.data(),
                        id: doc.id,
                    }),
                ),
            );
        });
        return unsubscribe;
    }, [currentUser]);

    return (
        <>
            {chatsList.map((a) => {
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
            })}
        </>
    );
};

export default ChatLists;
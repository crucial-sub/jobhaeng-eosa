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
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { chatListsAction, docIdAction, RootState } from 'store';
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

        const unsubscribe = onSnapshot(q, async (querySnapshot) => {
            const chatArray = await querySnapshot.docs.map(
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

    const handleOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
        dispatch(docIdAction.docId(e.currentTarget.id));
    };

    return (
        <>
            {chatsList.map((a) => {
                if (
                    a.user?.indexOf(currentUseruid) === 0 &&
                    a.onOff?.indexOf('on') === 0
                ) {
                    return (
                        <Link key={a.id} href={`chats/${a.requestId}`}>
                            <div id={a.id} onClick={handleOnClick}>
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
                if (
                    a.user?.indexOf(currentUseruid) === 1 &&
                    a.onOff?.lastIndexOf('on') === 1
                ) {
                    return (
                        <Link key={a.id} href={`chats/${a.requestId}`}>
                            <div id={a.id} onClick={handleOnClick}>
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
            })}
        </>
    );
};

export default ChatLists;

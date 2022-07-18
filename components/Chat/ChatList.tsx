import { dbService } from 'fbase';
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
import * as S from './styles';

type Props = {};

export interface ChatTypes {
    requestId?: string | undefined;
    title?: string | undefined;
    users?: [] | undefined;
    id: string | undefined;
    nickName?: [] | undefined;
    user?: string[] | undefined;
    town?: string | undefined;
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

    const handleOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
        dispatch(docIdAction.docId(e.currentTarget.dataset.id));
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
                            <S.ChatBox data-id={a.id} onClick={handleOnClick}>
                                <S.TitleNTown>
                                    <S.Title>의뢰: {a.title}</S.Title>
                                    <S.Town>{a.town}</S.Town>
                                </S.TitleNTown>
                                <S.LastMessages>
                                    <span>마지막 메세지: </span>
                                    {a.lastChat?.slice(0, 30)}
                                </S.LastMessages>
                            </S.ChatBox>
                        </Link>
                    );
                }
                if (
                    a.user?.indexOf(currentUseruid) === 1 &&
                    a.onOff?.lastIndexOf('on') === 1
                ) {
                    return (
                        <>
                            <Link key={a.id} href={`chats/${a.requestId}`}>
                                <S.ChatBox
                                    data-id={a.id}
                                    onClick={handleOnClick}
                                >
                                    <S.TitleNTown>
                                        <S.Title>의뢰: {a.title}</S.Title>
                                        <S.Town>{a.town}</S.Town>
                                    </S.TitleNTown>
                                    <S.LastMessages>
                                        마지막 메세지:{' '}
                                        {a.lastChat?.slice(0, 20)}
                                    </S.LastMessages>
                                </S.ChatBox>
                            </Link>
                        </>
                    );
                }
            })}
        </>
    );
};

export default ChatLists;

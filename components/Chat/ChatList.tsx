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

// export interface ChatTypes {
//     requestId?: string | undefined;
//     title?: string | undefined;
//     users?: [] | undefined;
//     id: string | undefined;
//     nickName?: [] | undefined;
//     user?: string[] | undefined;
//     town?: string | undefined;
// }

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
                    nickNames: doc.data().nickName,
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

    const chatOpponent = () => {};
    return (
        <>
            {chatsList.length ? (
                chatsList.map((a) => {
                    if (
                        a.user?.indexOf(currentUseruid) === 0 &&
                        a.onOff?.indexOf('on') === 0
                    ) {
                        return (
                            <Link key={a.id} href={`chats/${a.requestId}`}>
                                <S.ChatBox
                                    data-id={a.id}
                                    onClick={handleOnClick}
                                >
                                    <S.TitleNTown>
                                        <S.Title>
                                            의뢰: {a.title?.slice(0, 14)}{' '}
                                        </S.Title>
                                        <S.Town>{a.town}</S.Town>
                                    </S.TitleNTown>
                                    <S.OpponentNick>
                                        {a.nickNames !== undefined &&
                                            a.nickNames[1]}{' '}
                                        님과의 채팅
                                    </S.OpponentNick>
                                    <S.LastMessages>
                                        <span>메시지: </span>
                                        {a.lastChat?.slice(0, 10)}
                                        <div>
                                            {a.ongoing ? (
                                                a.requestEnd ? (
                                                    <div>완료 !</div>
                                                ) : (
                                                    <div>진행중</div>
                                                )
                                            ) : null}
                                        </div>
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
                                        <S.OpponentNick>
                                            {a.nickNames !== undefined &&
                                                a.nickNames[0]}
                                            님과의 채팅
                                        </S.OpponentNick>
                                        <S.LastMessages>
                                            <span>메시지: </span>
                                            {a.lastChat?.slice(0, 10)}
                                            <div>
                                                {a.ongoing ? (
                                                    a.requestEnd ? (
                                                        <div>완료 !</div>
                                                    ) : (
                                                        <div>진행중</div>
                                                    )
                                                ) : null}
                                            </div>
                                        </S.LastMessages>
                                    </S.ChatBox>
                                </Link>
                            </>
                        );
                    }
                })
            ) : (
                <S.NoResult>
                    <h1>대화 중인 채팅 목록이 없습니다!</h1>
                </S.NoResult>
            )}
        </>
    );
};

export default ChatLists;

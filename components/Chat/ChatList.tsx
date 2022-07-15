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
import colors from 'styles/colors';

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
                            <ChatBox data-id={a.id} onClick={handleOnClick}>
                                <TitleNTown>
                                    <Title>의뢰: {a.title}</Title>
                                    <Town>{a.town}</Town>
                                </TitleNTown>
                                <LastMessages>
                                    <span>마지막 메세지: </span>
                                    {a.lastChat?.slice(0, 30)}
                                </LastMessages>
                                {/* <div>
                                    닉네임은{' '}
                                    {a.nickName?.map((a) => {
                                        if (a !== currentUser.nickName) {
                                            return a;
                                        }
                                    })}
                                    입니다
                                </div> */}
                            </ChatBox>
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
                                <ChatBox data-id={a.id} onClick={handleOnClick}>
                                    <TitleNTown>
                                        <Title>의뢰: {a.title}</Title>
                                        <Town>{a.town}</Town>
                                    </TitleNTown>
                                    <LastMessages>
                                        마지막 메세지:{' '}
                                        {a.lastChat?.slice(0, 20)}
                                    </LastMessages>
                                </ChatBox>
                            </Link>
                        </>
                    );
                }
            })}
        </>
    );
};

export default ChatLists;

const ChatBox = styled.div`
    width: 90%;
    margin: auto;
    height: 20%;
    border-bottom: 1px solid ${colors.lightDark};
    /* border-radius: 10px; */
    margin-bottom: 15px;
`;

const TitleNTown = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: space-between;
`;

const Title = styled.div`
    font-size: 1.2rem;
    margin-top: 20px;
    margin-left: 20px;
`;

const Town = styled.div`
    font-size: 0.8rem;
    opacity: 0.5;
    margin-top: 20px;
    margin-right: 20px;
`;

const LastMessages = styled.div`
    display: flex;
    width: 100%;
    height: 50%;
    overflow: hidden;
    align-items: center;
    margin-left: 20px;
`;

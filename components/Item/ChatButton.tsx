import { dbService } from 'fbase';
import {
    collection,
    DocumentData,
    onSnapshot,
    query,
    QueryDocumentSnapshot,
    where,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { docIdAction, itemNdocAction, ItemTypes, RootState } from 'store';
import * as S from './styles';

type Props = {
    id: string | string[] | undefined;
    item: ItemTypes;
};

const ChatButton = (props: Props) => {
    const { id, item } = props;
    const { currentUser } = useSelector(
        (state: RootState) => state.currentUser,
    );
    const dispatch = useDispatch();
    const { itemDocId } = useSelector((state: RootState) => state.itemDoc);

    const router = useRouter();
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!currentUser.emailVerified) {
            confirm(
                '이메일 인증 후 내 동네와 닉네임을 설정해야만 채팅이 가능합니다! 이메일 인증 페이지로 이동하시겠습니까?',
            ) && router.push('/validate');
        } else if (!currentUser.town || !currentUser.nickName) {
            confirm(
                '내 동네와 닉네임을 설정해야만 요청글 작성이 가능합니다! 프로필 수정 페이지로 이동하시겠습니까?',
            ) && router.push('/user/edit');
        } else router.push(`/chats/${id}`);
    };

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
                    itemsId: doc.data().requestId,
                    docNumber: doc.id,
                }),
            );
            dispatch(itemNdocAction.itemDocId(chatArray));
        });
        const bbb = itemDocId.some((a) => {
            if (a.itemsId === item?.id) {
                dispatch(docIdAction.docId(a.docNumber));
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [item]);

    return <S.ChatBtn onClick={handleClick}>채팅하기</S.ChatBtn>;
};

export default ChatButton;

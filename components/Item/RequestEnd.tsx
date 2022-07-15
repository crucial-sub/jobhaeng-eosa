import React, { Dispatch, SetStateAction, useEffect } from 'react';
import styled from '@emotion/styled';
import {
    collection,
    doc,
    DocumentData,
    getDocs,
    onSnapshot,
    query,
    QueryDocumentSnapshot,
    updateDoc,
    where,
} from 'firebase/firestore';
import { dbService } from 'fbase';
import { itemListAction, ItemTypes } from 'store';
import { useRouter } from 'next/router';
import { getMonthDayTime } from 'utils/dateFormat';
import { useDispatch } from 'react-redux';

type Props = {
    itemId: string | string[] | undefined;
    setItem: Dispatch<SetStateAction<ItemTypes | undefined>>;
};

const RequestEnd = (props: Props) => {
    const router = useRouter();
    const { id } = router.query;
    const { itemId, setItem } = props;
    const replacePage = () => {
        router.reload();
    };
    const dispatch = useDispatch();
    const handleOnClick = async (e: React.MouseEvent<HTMLDivElement>) => {
        if (confirm('요청을 종료하시겠습니까?')) {
            const ItemDocRef = doc(dbService, 'items', `${itemId}`);
            const chatRef = collection(dbService, 'chats');
            const q = query(chatRef, where('requestId', '==', itemId));
            const getChat = onSnapshot(q, async (querySnapshot) => {
                querySnapshot.docs.forEach((document) => {
                    if (document.data().ongoing) {
                        updateDoc(doc(dbService, 'chats', document.id), {
                            requestEnd: true,
                        });
                        updateDoc(ItemDocRef, {
                            requestEnd: true,
                            jobHangASa: document.data().users[0],
                        });
                    }
                });
            });

            const querySnapshot = await getDocs(collection(dbService, 'items'));
            const findDoc = querySnapshot.docs.find(
                (doc: QueryDocumentSnapshot<DocumentData>) => doc.id === itemId,
            );
            const docItem = {
                ...findDoc?.data(),
                date: getMonthDayTime(findDoc?.data().date?.toDate()),
            };
            setItem(docItem);
            const items = docItem;
            dispatch(itemListAction.update({ items, id }));
        } else return;
    };

    return <EndBtn onClick={handleOnClick}>잡행 완료</EndBtn>;
};

const EndBtn = styled.div``;
export default RequestEnd;

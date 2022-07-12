import React, { Dispatch, SetStateAction, useEffect } from 'react';
import styled from '@emotion/styled';
import {
    collection,
    doc,
    DocumentData,
    getDocs,
    QueryDocumentSnapshot,
    updateDoc,
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
    const handleOnClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (confirm('요청을 종료하시겠습니까?')) {
            const UpdateRef = doc(dbService, 'items', `${itemId}`);
            await updateDoc(UpdateRef, {
                requestEnd: true,
            });

            const querySnapshot = await getDocs(collection(dbService, 'items'));
            const findDoc = querySnapshot.docs.find(
                (doc: QueryDocumentSnapshot<DocumentData>) => doc.id === itemId,
            );
            const docItem = {
                ...findDoc?.data(),
                id: findDoc?.id,
                date: getMonthDayTime(findDoc?.data().date?.toDate()),
            };
            setItem(docItem);
            const items = docItem;
            dispatch(itemListAction.update({ items, id }));
        } else return;
    };

    return <EndBtn onClick={handleOnClick}>잡행 완료</EndBtn>;
};

const EndBtn = styled.button`
    width: 60px;
    height: 30px;
    cursor: pointer;
`;
export default RequestEnd;

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
import { ItemTypes } from 'store';
import { useRouter } from 'next/router';
import { getMonthDayTime } from 'utils/dateFormat';

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
    const handleOnClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const UpdateRef = doc(dbService, 'items', `${itemId}`);
        const a = 'y';
        await updateDoc(UpdateRef, {
            reqeustEnd: a,
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
    };

    return <EndBtn onClick={handleOnClick}>요청 종료</EndBtn>;
};

const EndBtn = styled.button`
    width: 50px;
    height: 30px;
`;
export default RequestEnd;

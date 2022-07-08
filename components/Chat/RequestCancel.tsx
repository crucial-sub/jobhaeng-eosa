import styled from '@emotion/styled';
import { dbService } from 'fbase';
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    onSnapshot,
    query,
    updateDoc,
    where,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { itemListAction, ItemTypes, RootState } from 'store';

type Props = {
    item: ItemTypes;
    itemId: string;
};

const RequestCancel = (props: Props) => {
    const { item, itemId } = props;
    const { docId } = useSelector((state: RootState) => state.docId);

    const dispatch = useDispatch();

    const handleClick = async (e: React.MouseEvent<HTMLDivElement>) => {
        if (confirm('해임하시겠습니까?') && itemId) {
            await updateDoc(doc(dbService, 'items', itemId), {
                ongoing: false,
            });
            const newItem = { ...item, ongoing: false };
            dispatch(itemListAction.update({ newItem, itemId }));
            await updateDoc(doc(dbService, 'chats', docId), {
                ongoing: false,
            });
        } else return;
    };

    return (
        <RequestCancelBtn onClick={handleClick}>잡행어사 해임</RequestCancelBtn>
    );
};

const RequestCancelBtn = styled.div`
    cursor: pointer;
`;

export default RequestCancel;

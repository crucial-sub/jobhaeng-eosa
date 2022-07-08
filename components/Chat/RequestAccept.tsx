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

type Props = {};

const RequestAccept = (props: Props) => {
    const [item, setItem] = useState<ItemTypes>();
    const { docId } = useSelector((state: RootState) => state.docId);
    const { currentUser } = useSelector(
        (state: RootState) => state.currentUser,
    );
    const router = useRouter();
    const itemId = router.query.chatId?.toString();
    const { itemList } = useSelector((state: RootState) => state.itemList);
    useEffect(() => {
        if (itemId) {
            const newItem = itemList.find((el) => el.id === itemId);
            setItem({ ...newItem, ongoing: true });
        }
    }, [itemId, itemList]);

    const dispatch = useDispatch();

    const handleClick = async (e: React.MouseEvent<HTMLDivElement>) => {
        if (confirm('수락하시겠습니까?') && itemId) {
            await updateDoc(doc(dbService, 'items', itemId), {
                ongoing: true,
            });
            dispatch(itemListAction.update({ item, itemId }));
        } else return;
    };

    return <RequestAcceptBtn onClick={handleClick}>수락하기</RequestAcceptBtn>;
};

const RequestAcceptBtn = styled.div`
    cursor: pointer;
`;

export default RequestAccept;

import styled from '@emotion/styled';
import { dbService } from 'fbase';
import {
    collection,
    DocumentData,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    QueryDocumentSnapshot,
} from 'firebase/firestore';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { itemListAction, ItemTypes, RootState } from 'store';
import { getMonthDay, getMonthDayTime, numberCommas } from 'utils/dateFormat';

type Props = {};

const ItemList = (props: Props) => {
    const dispatch = useDispatch();

    const { itemList } = useSelector((state: RootState) => state.itemList);
    const { town } = useSelector((state: RootState) => state.filter);
    const [showList, setShowList] = useState<ItemTypes[]>([]);
    const { currentUser } = useSelector(
        (state: RootState) => state.currentUser,
    );
    useEffect(() => {
        const collectionRef = collection(dbService, 'items');
        const q = query(collectionRef, orderBy('date', 'desc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const itemsArray = querySnapshot.docs.map(
                (doc: QueryDocumentSnapshot<DocumentData>) => ({
                    ...doc.data(),
                    date: getMonthDayTime(doc.data().date?.toDate()),
                }),
            );
            dispatch(itemListAction.load(itemsArray));
        });
        return unsubscribe;
    }, []);
    useEffect(() => {
        let newList = [...itemList];
        if (town) newList = itemList.filter((item) => item.town === town);
        else if (!town && currentUser.town)
            newList = itemList.filter((item) => item.town === currentUser.town);
        setShowList(newList);
    }, [town, currentUser, itemList]);

    return (
        <>
            {showList.length === 0 ? (
                <div>{town}에 요청글이 없습니다 !</div>
            ) : (
                showList.map((item) => (
                    <Link key={item.id} href={`/items/${item.id}`}>
                        <PostBox>
                            <div>{item.ongoing ? '진행 중' : null}</div>
                            <div>{item.title}</div>
                            <div>{item.location}</div>
                            <div>{item.date}</div>
                            <div>{numberCommas(item.reward?.toString())}</div>
                        </PostBox>
                    </Link>
                ))
            )}
        </>
    );
};

const PostBox = styled.div`
    display: flex;
    margin: 20px;
    cursor: pointer;
`;

export default ItemList;

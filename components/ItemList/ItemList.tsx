import styled from '@emotion/styled';
import { dbService } from 'fbase';
import {
    collection,
    DocumentData,
    onSnapshot,
    orderBy,
    query,
    QueryDocumentSnapshot,
} from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { itemListAction, RootState } from 'store';

type Props = {};

const ItemList = (props: Props) => {
    const dispatch = useDispatch();

    const { itemList } = useSelector((state: RootState) => state.itemList);
    useEffect(() => {
        const collectionRef = collection(dbService, 'items');
        const q = query(collectionRef, orderBy('date', 'desc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const itemsArray = querySnapshot.docs.map(
                (doc: QueryDocumentSnapshot<DocumentData>) => ({
                    ...doc.data(),
                    id: doc.id,
                    date: doc.data().date?.toDate().getTime(),
                }),
            );
            dispatch(itemListAction.itemList(itemsArray));
        });
        return unsubscribe;
    }, []);
    console.log(itemList);

    return (
        <>
            {itemList.map((item) => (
                <PostBox key={item.id}>
                    <div>{item.ongoing ? '진행 중' : null}</div>
                    <div>{item.title}</div>
                    <div>{item.location}</div>
                    <div>{item.date}</div>
                    <div>{item.reward}</div>
                </PostBox>
            ))}
        </>
    );
};

const PostBox = styled.div`
    display: flex;
    margin: 20px;
`;

export default ItemList;

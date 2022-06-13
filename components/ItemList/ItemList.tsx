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
            // console.log('q: ', q);
            // console.log('querySnapshot: ', querySnapshot);
            // console.log('docs: ', ...querySnapshot.docs);
            // console.log('doc.data(): ', querySnapshot.docs[0].data());
            const itemsArray = querySnapshot.docs.map(
                (doc: QueryDocumentSnapshot<DocumentData>) => ({
                    ...doc.data(),
                    id: doc.id,
                    date: doc.data().date?.toDate().getTime(),
                }),
            );
            dispatch(itemListAction.load(itemsArray));
        });
        return unsubscribe;
    }, []);

    return (
        <>
            {itemList.map((item) => (
                <Link key={item.id} href={`/items/${item.id}`}>
                    <PostBox>
                        <div>{item.ongoing ? '진행 중' : null}</div>
                        <div>{item.title}</div>
                        <div>{item.location}</div>
                        <div>{item.date}</div>
                        <div>{item.reward}</div>
                    </PostBox>
                </Link>
            ))}
        </>
    );
};

const PostBox = styled.div`
    display: flex;
    margin: 20px;
`;

export default ItemList;

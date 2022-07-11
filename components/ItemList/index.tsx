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
import { filterAction, itemListAction, ItemTypes, RootState } from 'store';
import { getMonthDay, getMonthDayTime, numberCommas } from 'utils/dateFormat';
import { getTownWithOutDist } from 'utils/fetcher';

type Props = {};

const ItemList = (props: Props) => {
    const dispatch = useDispatch();

    const { itemList } = useSelector((state: RootState) => state.itemList);
    const { filterInfo } = useSelector((state: RootState) => state.filter);
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
        if (!filterInfo.name) {
            const myTownItem = itemList.filter(
                (item) => item.town === currentUser.town,
            );

            dispatch(
                filterAction.filter({
                    name: currentUser.town,
                    code: '',
                    filteredItem: myTownItem,
                }),
            );
        } else {
            if (filterInfo.name.match('전체')) {
                const getData = async () => {
                    const sliceCode = filterInfo.code.slice(2, 4);
                    const { regcodes } = await getTownWithOutDist(sliceCode);
                    const towns = regcodes.map(
                        (town: { name: string; code: string }) =>
                            town.name.split(' ')[2],
                    );
                    const updateItem = itemList.filter((item) =>
                        towns.some((name: string) => name === item.town),
                    );
                    dispatch(
                        filterAction.filter({
                            ...filterInfo,
                            filteredItem: updateItem,
                        }),
                    );
                };
                getData();
            } else {
                const updateItem = itemList.filter(
                    (item) => item.town === filterInfo.name,
                );
                dispatch(
                    filterAction.filter({
                        ...filterInfo,
                        filteredItem: updateItem,
                    }),
                );
            }
        }
    }, [currentUser, itemList]);

    return (
        <>
            {filterInfo.filteredItem?.length === 0 ? (
                <div>{filterInfo.name}에 요청글이 없습니다 !</div>
            ) : (
                filterInfo.filteredItem?.map((item) => (
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
    background-color: #eeeeee;
`;

export default ItemList;

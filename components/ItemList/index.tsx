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
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { docIdAction, filterAction, itemListAction, RootState } from 'store';
import colors from 'styles/colors';
import { getMonthDayTime } from 'utils/dateFormat';
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
        dispatch(docIdAction.docId(''));
        return unsubscribe;
    }, []);

    useEffect(() => {
        if (!filterInfo.name) {
            const myTownItem = itemList.filter(
                (item) => item.town === currentUser?.town,
            );

            dispatch(
                filterAction.filter({
                    name: currentUser?.town,
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
                            <div>{item.title}</div>
                            <div>{item.town}</div>
                            <div>{item.date}</div>
                            <div>
                                {item.ongoing ? (
                                    item.requestEnd ? (
                                        <span>완료 !</span>
                                    ) : (
                                        <span>진행 중</span>
                                    )
                                ) : null}
                            </div>
                            <div>{item.reward}</div>
                        </PostBox>
                    </Link>
                ))
            )}
        </>
    );
};

const PostBox = styled.div`
    display: grid;
    margin: 15px 5px;
    height: 5rem;
    cursor: pointer;
    background-color: #eeeeee;
    grid-template-columns: 1.5fr 1.5fr 1fr 2fr;
    grid-template-rows: 2fr 1fr 1fr;
    border: none;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px,
        rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
    border-radius: 10px;
    padding: 1rem;
    gap: 0.1rem;
    color: ${colors.dark};

    & div:nth-of-type(1) {
        grid-column: 1 / 5;
        grid-row: 1 / 2;
        align-self: center;
        font-size: 1.2rem;
    }
    & div:nth-of-type(2) {
        grid-column: 1 / 3;
        grid-row: 2 / 3;
        align-self: center;
        font-size: 0.8rem;
        color: ${colors.lightDark};
    }
    & div:nth-of-type(3) {
        grid-column: 1 / 3;
        grid-row: 3 / 4;
        align-self: center;
        font-size: 0.8rem;
        color: ${colors.lightDark};
    }
    & div:nth-of-type(4) {
        grid-column: 3 / 4;
        grid-row: 2 / 4;
        justify-content: center;
        align-self: center;
        display: flex;
        font-size: 0.8rem;
        background-color: ${colors.lightDark};
        border-radius: 5px;
        & span {
            max-width: 100%;
            margin: 0.4rem 0.2rem;
            color: ${colors.gold};
        }
    }
    & div:nth-of-type(5) {
        grid-column: 4 / 5;
        grid-row: 2 / 4;
        justify-self: center;
        align-self: center;
        font-size: 1.2rem;
    }
`;

export default ItemList;

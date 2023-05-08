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
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { docIdAction, filterAction, itemListAction, RootState } from 'store';
import { getMonthDayTime } from 'utils/dateFormat';
import { getTownWithOutDist } from 'utils/fetcher';
import * as S from './styles';

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
            if (currentUser.town) {
                const myTownItem = itemList.filter(
                    (item) => item.town === currentUser?.town,
                );

                dispatch(
                    filterAction.filter({
                        ...filterInfo,
                        name: currentUser?.town,
                        code: '',
                        filteredItem: myTownItem,
                    }),
                );
            } else {
                dispatch(
                    filterAction.filter({
                        ...filterInfo,
                        filteredItem: itemList,
                    }),
                );
            }
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
                <S.NoResult>
                    <h1>{filterInfo.name}에는 글이 없어요!</h1>
                </S.NoResult>
            ) : (
                filterInfo.filteredItem?.map((item) => (
                    <Link key={item.id} href={`/items/${item.id}`}>
                        <S.PostBox>
                            <div>{item.title?.slice(0, 16)}</div>
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
                        </S.PostBox>
                    </Link>
                ))
            )}
        </>
    );
};

export default ItemList;

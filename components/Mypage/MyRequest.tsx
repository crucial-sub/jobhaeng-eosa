import { dbService, firebaseInstance } from 'fbase';
import {
    collection,
    doc,
    DocumentData,
    Firestore,
    onSnapshot,
    query,
    QueryDocumentSnapshot,
    where,
} from 'firebase/firestore';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ItemTypes, RootState } from 'store';
import styled from '@emotion/styled';
import { numberCommas } from 'utils/dateFormat';

type Props = {};

const MyRequest = (props: Props) => {
    const [datas, setDatas] = useState({});
    const { currentUser } = useSelector(
        (state: RootState) => state.currentUser,
    );
    const collectionRef = collection(dbService, 'items');
    const { itemList } = useSelector((state: RootState) => state.itemList);
    const wholeItems = [...itemList];
    // const myRequests: ItemTypes[] = [{}];
    const dataArr = wholeItems.filter(
        (data) => data.userId === currentUser?.uid,
    );
    const count = dataArr.length;

    return (
        <>
            <Information>내 글 목록 </Information>
            {dataArr.map((data, i) => {
                return (
                    <MydataList key={i}>
                        <div>{data.title}</div>
                        <div>{data.contents}</div>
                        <div>{data.location}</div>
                        <div>{numberCommas(data.reward?.toString())}</div>
                        <div>{data.date}</div>
                    </MydataList>
                );
            })}
        </>
    );
};

const Information = styled.h1`
    font-size: 2rem;
    width: 100%;
    text-align: center;
    padding: 15px 0;
`;

const MydataList = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    line-height: 40px;
    text-align: center;
    background-color: skyblue;
    & div {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

export default MyRequest;

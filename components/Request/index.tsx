import { dbService } from 'fbase';
import {
    addDoc,
    collection,
    doc,
    getDoc,
    serverTimestamp,
    updateDoc,
} from 'firebase/firestore';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
    itemListAction,
    requestAction,
    requestInitialState,
    RootState,
} from 'store';
import RequestDetail from './RequestDetail';
import RequestLocation from './RequestLocation';
import RequestReward from './RequestReward';
import RequestTitle from './RequestTitle';
import { useRouter } from 'next/router';
import * as S from './styles';

type Props = {};

const Request = (props: Props) => {
    const dispatch = useDispatch();
    const { request } = useSelector((state: RootState) => state.request);
    const router = useRouter();
    const { currentUser } = useSelector(
        (state: RootState) => state.currentUser,
    );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (confirm('잡행어사 출두를 요청하시겠습니까?')) {
            const collectionRef = collection(dbService, 'items');
            const docRef = await addDoc(collectionRef, {
                ...request,
                date: serverTimestamp(),
                nickName: currentUser.nickName,
                userId: currentUser.uid,
            });
            await updateDoc(doc(dbService, 'items', docRef.id), {
                id: docRef.id,
            });
            const newDoc = (await getDoc(docRef)).data();
            const newDocData = {
                ...newDoc,
                date: newDoc?.date.toDate().getTime(),
            };
            dispatch(itemListAction.add(newDocData));
            dispatch(requestAction.request(requestInitialState.request));
            router.push(`/items/${docRef.id}`);
        } else return;
    };

    return (
        <S.Form onSubmit={handleSubmit}>
            <RequestTitle request={request} />
            <RequestReward request={request} />
            <RequestLocation request={request} currentUser={currentUser} />
            <RequestDetail request={request} />
            <S.RequestSubmit type="submit" value="잡행 요청하기" />
        </S.Form>
    );
};

export default Request;

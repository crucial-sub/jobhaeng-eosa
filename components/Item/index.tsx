import styled from '@emotion/styled';
import RequestDltBtn from 'components/Request/RequestDltBtn';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import { ItemTypes, RootState } from 'store';

type Props = {
    item: ItemTypes;
};

const Item = (props: Props) => {
    const { item } = props;
    const userId = item.userId;
    const userTitle = item.title;
    const router = useRouter();
    const { id } = router.query;
    const { currentUser } = useSelector(
        (state: RootState) => state.currentUser,
    );

    const currentUserUid = currentUser.uid;
    return (
        <>
            <ItemWrapper>
                <div>{item.title}</div>
                <div>{item.location}</div>
                <div>{item.extraLocation}</div>
                <div>{item.date}</div>
                <div>{item.contents}</div>
                <div>{item.reward}</div>
                {currentUser.uid === userId ? (
                    <>
                        <Link
                            href={{
                                pathname: `/edititem/${id}`,
                            }}
                            as={`/edititem/${id}`}
                        >
                            <UpdateBtn>수정</UpdateBtn>
                        </Link>
                        <RequestDltBtn
                            userId={userId ? userId : ''}
                            userTitle={userTitle ? userTitle : ''}
                            currentUserUid={
                                currentUserUid ? currentUserUid : ''
                            }
                        />
                    </>
                ) : null}
                <Link href={`/chats/${userId}`}>
                    <button>채팅하기</button>
                </Link>
            </ItemWrapper>
        </>
    );
};

const ItemWrapper = styled.div`
    position: relative;
    max-width: 90%;
    height: 90%;
    margin: 7.5% auto;
    overflow: auto;
    background-color: aliceblue;
`;

const UpdateBtn = styled.button`
    width: 50px;
    height: 30px;
`;

export default Item;

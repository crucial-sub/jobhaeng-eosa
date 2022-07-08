import styled from '@emotion/styled';
import RequestDltBtn from 'components/Request/RequestDltBtn';
import RequestEnd from 'components/Request/RequestEnd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ItemTypes, RootState } from 'store';
import ChatButton from './ChatButton';
import ChatOfRequest from './ChatOfRequest';

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
    const [isOpen, SetIsOpen] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        SetIsOpen((prev) => !prev);
    };

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
                        <RequestEnd />
                        <ChatListOpenBtn onClick={handleClick}>
                            채팅 목록 열기
                        </ChatListOpenBtn>
                        {isOpen && <ChatOfRequest isOpen={isOpen} id={id} />}
                    </>
                ) : (
                    <ChatButton id={id} item={item} />
                )}
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

const ChatListOpenBtn = styled.div``;

export default Item;

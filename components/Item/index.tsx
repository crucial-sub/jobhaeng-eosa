import styled from '@emotion/styled';
import RequestDltBtn from 'components/Request/RequestDltBtn';
import RequestEnd from 'components/Request/RequestEnd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useSelector } from 'react-redux';
import { ItemTypes, RootState } from 'store';
import { numberCommas } from 'utils/dateFormat';
import ChatButton from './ChatButton';
import ChatOfRequest from './ChatOfRequest';

type Props = {
    item: ItemTypes;
    setItem: Dispatch<SetStateAction<ItemTypes | undefined>>;
};

const Item = (props: Props) => {
    const { item, setItem } = props;
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

    const changeDate = numberCommas(item.reward?.toString());

    return (
        <>
            <ItemWrapper>
                {typeof item.reqeustEnd !== 'undefined' ? (
                    <div> 완료됐습니다! </div>
                ) : (
                    <div>{item.ongoing ? '진행중' : null}</div>
                )}

                <div>{item.title}</div>
                <div>{item.location}</div>
                <div>{item.extraLocation}</div>
                <div>{item.date}</div>
                <div>{item.contents}</div>
                <div>{changeDate}</div>
                {typeof item.reqeustEnd === 'undefined' &&
                currentUser.uid === userId ? (
                    <>
                        <Link
                            href={{
                                pathname: `/edititem/${id}`,
                            }}
                            as={`/edititem/${id}`}
                        >
                            <UpdateBtn>수정</UpdateBtn>
                        </Link>
                        <RequestEnd itemId={id} setItem={setItem} />
                        <ChatListOpenBtn onClick={handleClick}>
                            채팅 목록 열기
                        </ChatListOpenBtn>
                        {isOpen && <ChatOfRequest isOpen={isOpen} id={id} />}
                    </>
                ) : (
                    typeof item.reqeustEnd === 'undefined' && (
                        <ChatButton id={id} item={item} />
                    )
                )}
                {currentUser.uid === userId && (
                    <RequestDltBtn
                        userId={userId ? userId : ''}
                        userTitle={userTitle ? userTitle : ''}
                        currentUserUid={currentUserUid ? currentUserUid : ''}
                    />
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

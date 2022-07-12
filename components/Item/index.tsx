import styled from '@emotion/styled';
import RequestDltBtn from 'components/Request/RequestDltBtn';
import RequestEnd from 'components/Item/RequestEnd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useSelector } from 'react-redux';
import { ItemTypes, RootState } from 'store';
import { numberCommas } from 'utils/dateFormat';
import ChatButton from './ChatButton';
import ChatOfRequest from './ChatOfRequest';
import { AiOutlineMenu } from 'react-icons/ai';
import colors from 'styles/colors';

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
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const boxName = e.currentTarget.dataset.box;
        if (boxName === 'chat-box') setIsChatOpen((prev) => !prev);
        else if (boxName === 'edit-box') setIsEditOpen((prev) => !prev);
    };

    const reward = numberCommas(item.reward?.toString());
    console.log(item, item.id, item.ongoing, item.requestEnd);

    return (
        <ItemWrapper>
            {item.requestEnd ? (
                <ProcessInfo> 잡행이 완료된 글입니다! </ProcessInfo>
            ) : item.ongoing ? (
                <ProcessInfo>잡행어사가 출두 중인 글입니다!</ProcessInfo>
            ) : null}
            <OwnerBox>
                <RequestUser>{item.nickName}</RequestUser>
                {currentUser.uid === userId && (
                    <RequestEditOpenBtn
                        data-box="edit-box"
                        onClick={handleClick}
                    >
                        <AiOutlineMenu />
                    </RequestEditOpenBtn>
                )}
                <RequestEditBox isEditOpen={isEditOpen}>
                    {!item.requestEnd && (
                        <>
                            <Link
                                href={{
                                    pathname: `/edititem/${id}`,
                                }}
                                as={`/edititem/${id}`}
                            >
                                <UpdateBtn>요청글 수정</UpdateBtn>
                            </Link>
                            {item.ongoing && (
                                <RequestEnd itemId={id} setItem={setItem} />
                            )}
                        </>
                    )}
                    <RequestDltBtn
                        userId={userId ? userId : ''}
                        userTitle={userTitle ? userTitle : ''}
                        currentUserUid={currentUserUid ? currentUserUid : ''}
                    />
                </RequestEditBox>
            </OwnerBox>

            <RequestTitle>{item.title}</RequestTitle>
            <RequestLocationBox>
                <div>{item.location}</div>
                <div>{item.extraLocation}</div>
            </RequestLocationBox>
            <RequestDate>{item.date}</RequestDate>
            <RequestContents>{item.contents}</RequestContents>
            <RequestReward>{reward}</RequestReward>

            <RequestChatBox>
                {currentUser.uid === userId ? (
                    <>
                        <ChatListOpenBtn
                            data-box="chat-box"
                            onClick={handleClick}
                        >
                            채팅 목록 열기
                        </ChatListOpenBtn>
                        <ChatOfRequest isChatOpen={isChatOpen} id={id} />
                    </>
                ) : (
                    !item.requestEnd && <ChatButton id={id} item={item} />
                )}
            </RequestChatBox>
        </ItemWrapper>
    );
};

const ItemWrapper = styled.div`
    position: relative;
    max-width: 90%;
    height: 90%;
    margin: 7.5% auto;
    overflow-x: hidden;
    background-color: #eeeeee;
`;
const ProcessInfo = styled.div`
    margin: 0 auto;
    width: 60%;
    padding: 1rem;
    background-color: ${colors.lightDark};
    color: ${colors.gold};
    border-radius: 30px;
    text-align: center;
`;

const RequestUser = styled.div``;

const RequestTitle = styled.div``;

const RequestLocationBox = styled.div``;

const RequestDate = styled.div``;
const RequestContents = styled.div``;
const RequestReward = styled.div``;
const OwnerBox = styled.div`
    position: relative;
`;
const RequestEditOpenBtn = styled.div`
    width: fit-content;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    user-select: none;
`;
const RequestEditBox = styled.div<{ isEditOpen: boolean }>`
    font-size: 0.8rem;
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 20px;
    right: 0;
    background-color: ${colors.gold};
    color: ${colors.dark};
    border-radius: 5px;
    width: 100px;

    opacity: ${(props) => (props.isEditOpen ? 1 : 0)};
    transition: 200ms;
    transform: translateX(${(props) => (props.isEditOpen ? 0 : 150)}px);

    & div {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
        user-select: none;
    }
`;

const UpdateBtn = styled.div`
    width: 100%;
`;

const ChatListOpenBtn = styled.div`
    cursor: pointer;
    width: fit-content;
    user-select: none;
`;
const RequestChatBox = styled.div``;

export default Item;

import styled from '@emotion/styled';
import RequestDltBtn from 'components/Item/RequestDltBtn';
import RequestEnd from 'components/Item/RequestEnd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useState,
} from 'react';
import { useSelector } from 'react-redux';
import { ItemTypes, RootState } from 'store';
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

    const close = useCallback((e: any) => {
        const clicked = e.target.closest('.modal');
        if (!clicked) {
            setIsChatOpen(false);
            setIsEditOpen(false);
        } else if (clicked.classList.contains('edit')) {
            setIsChatOpen(false);
        } else if (clicked.classList.contains('chat')) {
            setIsEditOpen(false);
        }
    }, []);

    useEffect(() => {
        if (isChatOpen || isEditOpen) {
            document.addEventListener('click', close);
        } else {
            document.removeEventListener('click', close);
        }
    }, [isChatOpen, isEditOpen]);

    return (
        <ItemWrapper onClick={handleClick}>
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
                        className="modal edit"
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
            <RequestDate>{item.date}</RequestDate>
            <RequestLocationBox>
                <div>{item.location}</div>
                <div>{item.extraLocation}</div>
            </RequestLocationBox>
            <RequestContents>{item.contents}</RequestContents>
            <RequestBottomBox>
                <RequestReward>{item.reward}</RequestReward>
                <RequestChatBox isChatOpen={isChatOpen}>
                    {currentUser.uid === userId ? (
                        <ChatListOpenBtn
                            data-box="chat-box"
                            className="modal chat"
                            onClick={handleClick}
                        >
                            채팅 목록 열기
                        </ChatListOpenBtn>
                    ) : (
                        !item.requestEnd && <ChatButton id={id} item={item} />
                    )}
                </RequestChatBox>
                <ChatOfRequest isChatOpen={isChatOpen} id={id} />
            </RequestBottomBox>
        </ItemWrapper>
    );
};

const ItemWrapper = styled.div`
    position: relative;
    max-width: 90%;
    height: 99%;
    margin: 1px auto;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #eeeeee;
`;
const ProcessInfo = styled.div`
    margin: 1rem auto 0;
    width: 60%;
    padding: 1rem;
    background-color: ${colors.lightDark};
    color: ${colors.gold};
    border-radius: 30px;
    text-align: center;
`;
const OwnerBox = styled.div`
    position: relative;
    height: 3.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${colors.dark};
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
    margin-bottom: 1rem;
`;
const RequestUser = styled.div`
    font-size: 1.2rem;
`;
const RequestEditOpenBtn = styled.div`
    width: fit-content;
    cursor: pointer;
    user-select: none;
    font-size: 1.2rem;
`;
const RequestEditBox = styled.div<{ isEditOpen: boolean }>`
    font-size: 0.9rem;
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 3rem;
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

const RequestTitle = styled.div`
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 0.3rem;
`;
const RequestDate = styled.div`
    font-size: 0.8rem;
    margin-bottom: 1rem;
`;

const RequestLocationBox = styled.div`
    margin-bottom: 1rem;
    font-size: 0.9rem;
    div:nth-of-type(1) {
        margin-bottom: 0.2rem;
    }
    div:nth-of-type(2) {
        display: flex;
        flex-direction: column;
    }
`;

const RequestContents = styled.div`
    line-height: 1.1rem;
    margin-bottom: 3rem;
`;
const RequestBottomBox = styled.div`
    position: fixed;
    bottom: 10vh;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 350px;
    max-width: 390px;
    padding: 0 20px;
    height: 4rem;
    transform: translateX(-19.5px);
    background-color: ${colors.white};
    box-shadow: rgba(0, 0, 0, 0.13) 0px 1px 2px 0px inset;
`;
const RequestReward = styled.div`
    font-size: 1.2rem;
    font-weight: 700;
`;
const RequestChatBox = styled.div<{ isChatOpen: boolean }>`
    user-select: none;
    padding: 10px;
    color: ${(props) => (props.isChatOpen ? colors.lightDark : colors.gold)};
    background-color: ${colors.lightDark};
    border-radius: 10px;
`;
const ChatListOpenBtn = styled.div`
    cursor: pointer;
    width: fit-content;
`;

export default Item;

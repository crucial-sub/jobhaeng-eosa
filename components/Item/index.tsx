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
import * as S from './styles';

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
        document.addEventListener('click', close);
        return () => {
            document.removeEventListener('click', close);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isChatOpen, isEditOpen]);

    return (
        <S.ItemWrapper onClick={handleClick}>
            {item.requestEnd ? (
                <S.ProcessInfo> 잡행이 완료된 글입니다! </S.ProcessInfo>
            ) : item.ongoing ? (
                <S.ProcessInfo>잡행어사가 출두 중인 글입니다!</S.ProcessInfo>
            ) : null}
            <S.OwnerBox>
                <S.RequestUser>{item.nickName}</S.RequestUser>
                {currentUser.uid === userId && (
                    <S.RequestEditOpenBtn
                        data-box="edit-box"
                        className="modal edit"
                        onClick={handleClick}
                    >
                        <AiOutlineMenu />
                    </S.RequestEditOpenBtn>
                )}
                <S.RequestEditBox isEditOpen={isEditOpen}>
                    {!item.requestEnd && (
                        <>
                            <Link
                                href={{
                                    pathname: `/edititem/${id}`,
                                }}
                                as={`/edititem/${id}`}
                            >
                                <S.UpdateBtn>요청글 수정</S.UpdateBtn>
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
                </S.RequestEditBox>
            </S.OwnerBox>
            <S.RequestTitle>{item.title}</S.RequestTitle>
            <S.RequestDate>{item.date}</S.RequestDate>
            <S.RequestLocationBox>
                <div>{item.location}</div>
                <div>{item.extraLocation}</div>
            </S.RequestLocationBox>
            <S.RequestContents>{item.contents}</S.RequestContents>
            <S.RequestBottomBox>
                <S.RequestReward>{item.reward}</S.RequestReward>
                <S.RequestChatBox isChatOpen={isChatOpen}>
                    {currentUser.uid === userId ? (
                        <S.ChatListOpenBtn
                            data-box="chat-box"
                            className="modal chat"
                            onClick={handleClick}
                        >
                            채팅 목록 열기
                        </S.ChatListOpenBtn>
                    ) : (
                        !item.requestEnd && <ChatButton id={id} item={item} />
                    )}
                </S.RequestChatBox>
                <ChatOfRequest isChatOpen={isChatOpen} id={id} />
            </S.RequestBottomBox>
        </S.ItemWrapper>
    );
};

export default Item;

import { dbService } from 'fbase';
import { doc, updateDoc } from 'firebase/firestore';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { itemListAction, ItemTypes, RootState } from 'store';
import * as S from './styles';

type Props = {
    item: ItemTypes;
    itemId: string;
};

const RequestCancel = (props: Props) => {
    const { item, itemId } = props;
    const { docId } = useSelector((state: RootState) => state.docId);

    const dispatch = useDispatch();

    const handleClick = async (e: React.MouseEvent<HTMLDivElement>) => {
        if (confirm('해임하시겠습니까?') && itemId) {
            await updateDoc(doc(dbService, 'items', itemId), {
                ongoing: false,
            });
            const newItem = { ...item, ongoing: false };
            dispatch(itemListAction.update({ newItem, itemId }));
            await updateDoc(doc(dbService, 'chats', docId), {
                ongoing: false,
            });
        } else return;
    };

    return (
        <S.RequestCancelBtn onClick={handleClick}>
            잡행어사 해임
        </S.RequestCancelBtn>
    );
};

export default RequestCancel;

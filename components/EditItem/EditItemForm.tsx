import styled from '@emotion/styled';
import { dbService } from 'fbase';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { itemListAction, ItemTypes, RootState } from 'store';
import colors from 'styles/colors';
import { numberCommas } from 'utils/moneyFormat';
import EditItemDetail from './EditItemDetail';
import EditItemLocation from './EditItemLocation';
import EditItemReward from './EditItemReward';
import EditItemTitle from './EditItemTitle';

type Props = {};

const EditItemForm = (props: Props) => {
    const router = useRouter();
    const { id } = router.query;
    const { itemList } = useSelector((state: RootState) => state.itemList);
    const { currentUser } = useSelector(
        (state: RootState) => state.currentUser,
    );
    const [items, setItems] = useState<ItemTypes>();
    const dispatch = useDispatch();
    const numberWithCommas = (reward: string) => {
        const first = reward.replace(/,/g, '').replace(/[^0-9]/g, '');
        const final = Number(first).toLocaleString('ko-KR').toString();
        return final;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { info } = e.currentTarget.dataset;
        if (info === 'title') {
            setItems({ ...items, title: e.target.value });
        } else if (info === 'reward') {
            const valueWithCommas = numberWithCommas(e.currentTarget.value);
            const removeCommas = valueWithCommas.replace(/,/g, '');
            const reward = numberCommas(removeCommas.toString());
            setItems({ ...items, reward: reward });
        } else if (info === 'contents') {
            setItems({ ...items, contents: e.target.value });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setItems({
            ...items,
            date: serverTimestamp().toString(),
        });
        if (items && id) {
            dispatch(itemListAction.update({ items, id }));
            const UpdateRef = doc(dbService, 'items', `${id}`);
            await updateDoc(UpdateRef, {
                ...items,
                id: id,
                nickName: currentUser.nickName,
                userId: currentUser.uid,
                date: serverTimestamp(),
            });
            router.push(`/items/${id}`);
        } else {
            return;
        }
    };

    useEffect(() => {
        setItems(itemList.find((item) => item.id === id));
    }, [id]);
    return (
        <>
            {items && (
                <Form onSubmit={handleSubmit}>
                    <EditItemTitle items={items!} handleChange={handleChange} />
                    <EditItemReward
                        items={items!}
                        handleChange={handleChange}
                    />
                    <EditItemLocation
                        items={items!}
                        currentUser={currentUser}
                        setItems={setItems}
                    />
                    <EditItemDetail
                        items={items!}
                        handleChange={handleChange}
                    />
                    <EditItemSubmit type="submit" value="수정하기" />
                </Form>
            )}
        </>
    );
};

const Form = styled.form`
    display: flex;
    flex-direction: column;
    & * {
        width: 100%;
    }
`;

const EditItemSubmit = styled.input`
    width: 100%;
    background-color: ${colors.gold};
    color: ${colors.lightDark};
    font-weight: bold;
    user-select: none;
    text-align: center;
    justify-content: center;
    align-items: center;
    padding: 1rem 0;
    cursor: pointer;
`;

export default EditItemForm;

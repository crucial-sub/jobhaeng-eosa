import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { itemListAction, ItemTypes, RootState } from 'store';
import { dbService } from 'fbase';
import { json } from 'stream/consumers';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';

type Props = {
    item: ItemTypes;
};

interface IndexNumber {
    targetIndex: number;
}

const ItemEdit = (props: Props) => {
    const router = useRouter();
    const { id } = router.query;
    const { itemList } = useSelector((state: RootState) => state.itemList);
    const { currentUser } = useSelector(
        (state: RootState) => state.currentUser,
    );
    const [items, setItems] = useState<ItemTypes>();
    const [targetIndex, setTargetIndex] = useState<IndexNumber>();
    const dispatch = useDispatch();
    let targetItemList = itemList;
    useEffect(() => {
        setItems(itemList.find((item) => item.id === id));
    }, [itemList]);
    console.log(items);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.id;
        if (name === 'title') {
            setItems({ ...items, title: e.target.value });
        } else if (name === 'location') {
            setItems({ ...items, location: e.target.value });
        } else if (name === 'reward') {
            setItems({ ...items, reward: e.target.value });
        } else if (name === 'contents') {
            setItems({ ...items, contents: e.target.value });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // setItems({...items, id: id,
        //     nickName: currentUser.nickName,
        //     userId: currentUser.uid,
        //     date: serverTimestamp(),})
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
    return (
        <>
            {items && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title">제목</label>
                        <input
                            id="title"
                            value={items.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="location">위치</label>
                        <input
                            id="location"
                            value={items.location}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="reward">보상</label>
                        <input
                            id="reward"
                            value={items.reward}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="contents">내용</label>
                        <input
                            id="contents"
                            value={items.contents}
                            onChange={handleChange}
                        />
                    </div>
                    <input type="submit" value={'update request'} />
                </form>
            )}
        </>
    );
};

export default ItemEdit;

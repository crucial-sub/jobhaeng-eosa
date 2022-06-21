import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { itemListAction, ItemTypes, RootState } from 'store';
import { json } from 'stream/consumers';

type Props = {
    item: ItemTypes;
};

const ItemEdit = (props: Props) => {
    const router = useRouter();
    const { id } = router.query;
    const { itemList } = useSelector((state: RootState) => state.itemList);
    const [items, setItems] = useState<ItemTypes>();
    const dispatch = useDispatch();
    let targetIndex: number;
    useEffect(() => {
        for (let i = 0; i < itemList.length; i++) {
            if (itemList[i].id === id) {
                targetIndex = i;
                setItems(itemList[i]);
                break;
            }
        }
    }, [itemList]);

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!items) {
            return;
        }
        // dispatch(
        //     itemListAction.update({ targetIndex: targetIndex, items: items }),
        // );
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

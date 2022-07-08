import Item from 'components/Item';
import { dbService } from 'fbase';
import {
    collection,
    DocumentData,
    getDocs,
    QueryDocumentSnapshot,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ItemTypes } from 'store';
import { getMonthDayTime } from 'utils/dateFormat';

type Props = {};

const ItemPage = ({}: Props) => {
    const router = useRouter();
    const { id } = router.query;
    const [item, setItem] = useState<ItemTypes>();
    useEffect(() => {
        if (id) {
            const fetchDoc = async () => {
                const querySnapshot = await getDocs(
                    collection(dbService, 'items'),
                );
                const findDoc = querySnapshot.docs.find(
                    (doc: QueryDocumentSnapshot<DocumentData>) => doc.id === id,
                );
                const docItem = {
                    ...findDoc?.data(),
                    id: findDoc?.id,
                    date: getMonthDayTime(findDoc?.data().date?.toDate()),
                };
                setItem(docItem);
            };
            fetchDoc();
            return;
        }
    }, [id]);
    return item && <Item item={item} setItem={setItem} />;
};

export default ItemPage;

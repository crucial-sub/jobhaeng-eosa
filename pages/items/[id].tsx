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
                    date: findDoc?.data().date?.toDate().getTime(),
                };
                setItem(docItem);
            };
            fetchDoc();
            return;
        }
    }, [id]);

    return item && <Item item={item} />;
};

export default ItemPage;

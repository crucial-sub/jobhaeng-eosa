import { dbService } from 'fbase';
import { collection, doc, getDoc } from 'firebase/firestore';
import React from 'react';

type Props = {
    chatId: string | string[] | undefined;
};

const Conversations = (props: Props) => {
    const { chatId } = props;
    // if (typeof chatId === 'string') {
    //     const docRef = doc(dbService, 'chats', chatId);
    //     const docSnap = await getDoc(docRef);
    //     return;
    // }

    return (
        <div>
            <div>안녕하세요</div>
            <div>안녕하세요</div>
            <div>안녕하세요</div>
            <div>안녕하세요</div>
        </div>
    );
};

export default Conversations;

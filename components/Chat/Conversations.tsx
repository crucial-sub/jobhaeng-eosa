import { dbService } from 'fbase';
import {
    collection,
    doc,
    getDoc,
    onSnapshot,
    orderBy,
    query,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

type Props = {
    chatId: string | string[] | undefined;
    docId: string;
};

export interface ChatContentType {
    message?: string;
    timeStamp?: number;
    user?: string | undefined;
    id?: string | undefined;
    nickName?: string | undefined;
}

const Conversations = (props: Props) => {
    const { chatId, docId } = props;
    const [messages, setMessages] = useState<ChatContentType[]>([]);
    // useEffect(() => {
    //     const chatRef = collection(dbService, 'chats', docId, 'messages');
    //     const g = query(chatRef, orderBy('timestamp', 'asc'));
    //     const unsubscribe = onSnapshot(g, (querySnapshot) => {
    //         setMessages(
    //             querySnapshot.docs.map((doc) => ({
    //                 ...doc.data(),
    //                 id: doc.id,
    //                 timestamp: doc.data().timestamp?.toDate().getTime(),
    //             })),
    //         );
    //     });
    // }, [docId, messages]);

    return (
        <>
            <div> 안녕! </div>
            {/* {messages &&
                messages.map((a) => {
                    return <div key={a.id}>{a.message}</div>;
                })} */}
        </>
    );
};

export default Conversations;

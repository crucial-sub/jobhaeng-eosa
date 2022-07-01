import React, { useState } from 'react';
import { ItemTypes } from 'store';

type Props = {
    items: ItemTypes | undefined;
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
    const { items, docId } = props;
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

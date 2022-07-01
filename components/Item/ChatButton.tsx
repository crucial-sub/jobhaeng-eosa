import Link from 'next/link';
import React from 'react';
import { ItemTypes } from 'store';

type Props = {
    id: string | string[] | undefined;
    item: ItemTypes;
};

const ChatButton = (props: Props) => {
    const { id } = props;
    return (
        <Link href={`/chats/${id}`}>
            <button>채팅하기</button>
        </Link>
    );
};

export default ChatButton;

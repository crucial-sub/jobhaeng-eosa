import ChatLists from 'components/Chat/ChatList';
import { authService } from 'fbase';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';

type Props = {};

const Chats = (props: Props) => {
    return (
        <>
            <ChatLists />
        </>
    );
};

export default Chats;

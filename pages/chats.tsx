import ChatLists from 'components/Chat/ChatLists';
import { authService } from 'fbase';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';

type Props = {};

const Chats = (props: Props) => {
    // useEffect(() => {
    //     const listener = onAuthStateChanged(
    //         authService,
    //       async (user) => {
    //         if (options?.onUserChanged) {
    //           // onUserChanged function to process custom claims on any other trigger function
    //           try {
    //             await options.onUserChanged(user);
    //           } catch (e) {
    //             setError(e as Error);
    //           }
    //         }
    //         setValue(user);
    //       },
    //       setError
    //     );
    return (
        <>
            <ChatLists />
        </>
    );
};

export default Chats;

import styled from '@emotion/styled';
import RequestDltBtn from 'components/Request/RequestDltBtn';
import RequestUpdateBtn from 'components/Request/RequestUpdateBtn';
import React from 'react';
import { useSelector } from 'react-redux';
import { ItemTypes, RootState } from 'store';

type Props = {
    item: ItemTypes;
};

const Item = (props: Props) => {
    const { item } = props;
    const userId = item.userId;
    const userTitle = item.title;
    const { currentUser } = useSelector(
        (state: RootState) => state.currentUser,
    );
    const currentUserUid = currentUser.uid;
    // console.log(currentUser.uid);
    return (
        <>
            <ItemWrapper>
                <div>{item.title}</div>
                <div>{item.location}</div>
                <div>{item.date}</div>
                <div>{item.contents}</div>
                <div>{item.reward}</div>
                {currentUser.uid === userId ? (
                    <>
                        <RequestUpdateBtn />
                        <RequestDltBtn
                            userId={userId ? userId : ''}
                            userTitle={userTitle ? userTitle : ''}
                            currentUserUid={
                                currentUserUid ? currentUserUid : ''
                            }
                        />
                    </>
                ) : null}
            </ItemWrapper>
        </>
    );
};

const ItemWrapper = styled.div`
    position: relative;
    max-width: 90%;
    height: 90%;
    margin: 7.5% auto;
    overflow: auto;
    background-color: aliceblue;
`;

export default Item;

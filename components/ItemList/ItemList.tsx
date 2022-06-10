import styled from '@emotion/styled';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

type Props = {};

const ItemList = (props: Props) => {
    const { posts } = useSelector((state: RootState) => state.posting);
    console.log(posts);

    return (
        <>
            {posts.map((post) => (
                <PostBox>
                    <div>{post.ongoing ? '진행 중' : null}</div>
                    <div>{post.title}</div>
                    <div>{post.address}</div>
                    <div>{post.date}</div>
                    <div>{post.reward}</div>
                </PostBox>
            ))}
        </>
    );
};

const PostBox = styled.div`
    display: flex;
`;

export default ItemList;

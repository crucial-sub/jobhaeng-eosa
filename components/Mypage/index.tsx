import React from 'react';
import MyInfo from './MyInfo';
import MyRequest from './MyRequest';
import styled from '@emotion/styled';

type Props = {};

const MyPage = (props: Props) => {
    return (
        <div>
            <MyInfo />
            <MyRequest />
        </div>
    );
};

export default MyPage;

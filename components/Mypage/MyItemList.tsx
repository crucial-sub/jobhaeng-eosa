import styled from '@emotion/styled';
import React, { useState } from 'react';
import colors from 'styles/colors';
import MyJobHangList from './MyJobHangList';
import MyRequestList from './MyRequestList';

type Props = {};

const MyItemList = (props: Props) => {
    const [selectedList, setSelectedList] = useState<string>('request');
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const listName = e.currentTarget.dataset.list;
        setSelectedList(listName!);
    };

    return (
        <div>
            <SelectTab selectedList={selectedList}>
                <div data-list="request" onClick={handleClick}>
                    요청 내역
                </div>
                <div data-list="job-hang" onClick={handleClick}>
                    출두 내역
                </div>
            </SelectTab>
            {selectedList === 'request' && <MyRequestList />}
            {selectedList === 'job-hang' && <MyJobHangList />}
        </div>
    );
};

const SelectTab = styled.div<{ selectedList: string }>`
    display: flex;
    border-bottom: 1px solid ${colors.dark};
    > div {
        margin: 0 1rem 1rem;
        cursor: pointer;
    }
`;

export default MyItemList;

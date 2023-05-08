import React, { useState } from 'react';
import MyJobHangList from './MyJobHangList';
import MyRequestList from './MyRequestList';
import * as S from './styles';

type Props = {};

const MyItemList = (props: Props) => {
    const [selectedList, setSelectedList] = useState<string>('request');
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const listName = e.currentTarget.dataset.list;
        setSelectedList(listName!);
    };

    return (
        <S.MyListContainer>
            <S.SelectTab selectedList={selectedList}>
                <div
                    className={`${
                        selectedList === 'request' ? 'selected' : ''
                    }`}
                    data-list="request"
                    onClick={handleClick}
                >
                    요청 내역
                </div>
                <div
                    className={`${
                        selectedList === 'job-hang' ? 'selected' : ''
                    }`}
                    data-list="job-hang"
                    onClick={handleClick}
                >
                    출두 내역
                </div>
            </S.SelectTab>
            {selectedList === 'request' && <MyRequestList />}
            {selectedList === 'job-hang' && <MyJobHangList />}
        </S.MyListContainer>
    );
};

export default MyItemList;

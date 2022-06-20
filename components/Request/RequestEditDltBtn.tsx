import React from 'react';
import styled from '@emotion/styled';

type Props = {
    word: string;
};

const RequestEditDltBtn = (props: Props) => {
    const { word } = props;
    const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (e.currentTarget.value === '수정') {
        } else if (e.currentTarget.value === '삭제') {
        }
    };
    return (
        <ChangeBtn onClick={handleOnClick} value={word}>
            {word}
        </ChangeBtn>
    );
};

const ChangeBtn = styled.button`
    width: 60px;
    height: 30px;
    margin-right: 20px;
`;

export default RequestEditDltBtn;

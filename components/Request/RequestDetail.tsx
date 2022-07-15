import styled from '@emotion/styled';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ItemTypes, requestAction } from 'store';
import colors from 'styles/colors';

type Props = {
    request: ItemTypes;
};

const RequestDetail = (props: Props) => {
    const dispatch = useDispatch();
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(
            requestAction.request({
                ...props.request,
                contents: e.target.value,
            }),
        );
    };
    return (
        <DetailBox>
            <TextArea
                required
                onChange={handleChange}
                placeholder="잡행어사에게 요청할 내용을 작성해주세요."
            ></TextArea>
        </DetailBox>
    );
};
const DetailBox = styled.div`
    > textarea {
        min-height: 9rem;
    }
`;
const TextArea = styled.textarea`
    padding: 1rem 0;
    border: none;
    resize: none;
    background-color: ${colors.white};
    font-size: 1rem;
`;

export default RequestDetail;

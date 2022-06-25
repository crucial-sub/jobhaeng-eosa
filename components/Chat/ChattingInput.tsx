import React from 'react';
import styled from '@emotion/styled';

type Props = {};

const ChattingInput = (props: Props) => {
    return (
        <Container>
            <TextArea id="story" name="story" />
            <Send type="submit" value="전송" />
        </Container>
    );
};

const Container = styled.form`
    width: 100%;
`;
const TextArea = styled.textarea`
    width: 80%;
    height: 100%;
`;

const Send = styled.input`
    height: 100%;
    width: 15%;
`;
export default ChattingInput;

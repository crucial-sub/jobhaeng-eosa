import React from 'react';
import styled from '@emotion/styled';
import Tab from 'components/Tab/Tab';

type Props = {};

const Footer = ({}: Props) => {
    return (
        <FooterBox>
            <Tab />
        </FooterBox>
    );
};

const FooterBox = styled.div`
    position: absolute;
    width: 100%;
    height: 10vh;
    bottom: 0;
    background-color: aliceblue;
    display: flex;
    align-items: center;

    .clicked {
        background-color: aqua;
    }
`;

export default Footer;

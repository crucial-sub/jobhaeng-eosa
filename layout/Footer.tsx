import React from 'react';
import styled from '@emotion/styled';
import Tab from 'components/Tab';

type Props = {};

const Footer = ({}: Props) => {
    return (
        <FooterBox>
            <Tab />
        </FooterBox>
    );
};

const FooterBox = styled.div`
    width: 100%;
    flex: 1 1 0;
    background-color: #393e46;
    color: #ffd369;
    display: flex;
    align-items: center;

    .clicked {
        background-color: #222831;
    }
`;

export default Footer;

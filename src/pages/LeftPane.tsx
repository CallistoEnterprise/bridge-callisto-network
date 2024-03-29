import Spacer from 'components/Spacer';
import { Assets } from 'constants/images';
import { Theme } from 'constants/theme';
import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
    background-color: #FFFFFF;
    padding: 40px 20px;
    border-radius: 20px;
    width: 25%;
    max-height: 550px;
    @media screen and (max-width: 600px){
        width: 100%;
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

const Title = styled.p`
    font-size: 20px;
    font-family: ${Theme.fonts.medium};
    line-height: 30px;
    color: ${Theme.colors.secondary};
`;

const StyledText = styled.p`
    font-size: 14px;
    font-family: ${Theme.fonts.text};
    line-height: 18px;
    .color: ${Theme.colors.secondary};
`;

const StyledLink = styled.a`
    font-size: 16px;
    font-family: ${Theme.fonts.medium};
    line-height: 18px;
    color: ${Theme.colors.primary};
`;

const StyledImg = styled.img`
    margin: 50px 0;
    @media screen and (max-width: 600px){
        width: 240px;
        margin: 20px 0;
    }
`;

const Bridge: React.FC = () => {

    return (
        <Container>
            <Title>Callisto Bridge</Title>
            <Spacer height="20px" />
            <StyledText>Allow user to transfer tokens from one chain to another.</StyledText>
            <Spacer height="20px" />
            <StyledLink>View Assets Lists</StyledLink>
            <Spacer height="10px" />
            <StyledLink href="https://callisto.network/cross-chain-bridges-security-model/" target="_blank">Callisto Bridge Security Model</StyledLink>
            <Spacer height="40px" />
            <StyledImg src={Assets.back} />
        </Container>
    )
}

export default Bridge;

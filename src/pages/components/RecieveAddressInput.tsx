import React from 'react'
import { Theme } from 'constants/theme';
import styled from 'styled-components';

const Container = styled.div`
    width: calc(100%);
    border-radius: 10px;
    margin-top: 10px;
`;

const Title = styled.p`
    font-size: 16px;
    font-family: ${Theme.fonts.textBold};
    line-height: 30px;
    color: ${Theme.colors.secondary};
`;

const StyledInput = styled.input`
    width: 100%;
    background-color: #f5f5f5;
    padding: 10px;
    border: none;
    color: ${Theme.colors.secondary};
    font-size: 18px;
    border-radius: 10px;
    @media screen and (max-width: 600px) {
        font-size: 14px;
    }
`;

const RecieveAddressInput = ({value, handleChange}) => {

    return (
        <Container>
            <Title>Claim Address</Title>
            <StyledInput
                placeholder="Your receive address."
                value={value}
                readOnly
                onChange={(e)=>handleChange(e.target.value)}
            />
        </Container>
    )
}

export default RecieveAddressInput;

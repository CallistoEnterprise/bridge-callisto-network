import React from 'react'
import { Theme } from 'constants/theme';
import styled from 'styled-components';
// import { escapeRegExp } from 'utils'

const Container = styled.div`
    width: calc(100%);
    border-radius: 10px;
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
    font-size: 14px;
    border-radius: 10px;
    outline: none;
    margin-bottom: 10px;
    @media screen and (max-width: 600px) {
        font-size: 12px;
    }
`;

// const inputRegex = RegExp(`/^0x([A-Fa-f0-9]{64})$/`) // match escaped "." characters via in a non-capturing group

const TxInput = ({value, handleChange}) => {
    const enforcer = (nextUserInput: string) => {
        handleChange(nextUserInput)
    }
    return (
        <Container>
            <Title>Previous Transaction Hash</Title>
            <StyledInput
                placeholder="Your previous hash."
                value={value}
                autoComplete="off"
                autoCorrect="off"
                type="text"
                minLength={1}
                maxLength={66}
                spellCheck="false"
                onChange={(e)=>enforcer(e.target.value.replace(/,/g, '.'))}
            />
        </Container>
    )
}

export default TxInput;

import React from 'react'
import { Theme } from 'constants/theme';
import styled from 'styled-components';
import { escapeRegExp } from 'utils'

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
    font-size: 30px;
    border-radius: 10px;
    @media screen and (max-width: 600px) {
        font-size: 24px;
    }
`;

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`) // match escaped "." characters via in a non-capturing group


const AmtInput = ({value, handleChange}) => {
    const enforcer = (nextUserInput: string) => {
        if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
            handleChange(nextUserInput)
        }
    }
    return (
        <Container>
            <Title>Amount to Swap</Title>
            <StyledInput
                placeholder="Input amount."
                value={value}
                inputMode="decimal"
                autoComplete="off"
                autoCorrect="off"
                type="text"
                pattern="^[0-9]*[.,]?[0-9]*$"
                minLength={1}
                maxLength={79}
                spellCheck="false"
                onChange={(e)=>enforcer(e.target.value.replace(/,/g, '.'))}
            />
        </Container>
    )
}

export default AmtInput;

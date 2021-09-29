import React from 'react'
import { Theme } from 'constants/theme';
import styled from 'styled-components';
import { FaBell } from 'react-icons/fa';
import Spacer from 'components/Spacer';

const Container = styled.div`
    display: flex;
    width: 100%;
    background-color: rgba(52, 200, 138, .1);
    border-radius: 10px;
    border: 1px solid ${Theme.colors.primary};
    padding: 10px;
`;


const StyledText = styled.p<{color: string}>`
    font-size: 14px;
    font-family: ${Theme.fonts.text};
    line-height: 20px;
    color: ${({color}) => color};
    margin-left: 10px;
`;
const StyledTitle = styled.p<{color: string}>`
    font-size: 18px;
    font-family: ${Theme.fonts.text};
    line-height: 20px;
    color: ${({color}) => color};
    margin-left: 10px;
// `;

// const reminder = {
//     "USDT": {
//         min: 'no limit',
//         max: 'no limit'
//     },
//     "CLO": {
//         min: 'no limit',
//         max: 'no limit'
//     },
//     "BNB": {
//         min: 'no limit',
//         max: 'no limit'
//     },
//     "ETH": {
//         min: 'no limit',
//         max: 'no limit'
//     }
// }

const Reminder = () => {

    return (
        <Container>
            <FaBell size={20} color={Theme.colors.primary} />
            <div>
                <StyledTitle color={Theme.colors.primary}>Reminder</StyledTitle>
                <Spacer height="10px" />
                <StyledText color={Theme.colors.primary}>There is no limitation on the minimum or maximum amount to swap.</StyledText>
                {/* <StyledText color={Theme.colors.primary}>{`1. Minimum amount is ${reminder[symbol].min}.`}</StyledText>
                <StyledText color={Theme.colors.primary}>{`2. Maximum amount is ${reminder[symbol].max}.`}</StyledText> */}
            </div>
        </Container>
    )
}

export default Reminder;

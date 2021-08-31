import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from "@web3-react/injected-connector";
import { setupEthereumNetwork, setupNetwork } from 'utils/wallet';
import Spacer from 'components/Spacer';
import { Theme } from 'constants/theme';
import styled from 'styled-components';
import useAuth from 'hooks/useAuth';

const Container = styled.div`
    width: 100%;
    white-space: pre-line;
`;

const StyledText = styled.p<{color: string}>`
    font-size: 14px;
    font-family: ${Theme.fonts.text};
    line-height: 18px;
    text-align: center;
    color: ${({color}) => color};
`;
const StyledTextBold = styled.p<{color: string}>`
    font-size: 14px;
    font-family: ${Theme.fonts.textBold};
    line-height: 18px;
    text-align: center;
    color: ${({color}) => color};
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    @media screen and (max-width: 600px) {
        flex-direction: column;
    }
`
const RowFlex = styled.div`
    display: flex;
    align-items: center;
`
const Con = styled.div<{bk: string}>`
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    background-color: ${({bk}) => bk};
    padding: 10px;
    :hover {
        background-color: #78d9b0;
        cursor: pointer;
    }
`;

export const NetImg = styled.img`
    width: 20px;
    margin-right: 10px;
`;

const Divider = styled.div`
    display: none;
    @media screen and (max-width: 600px) {
        display: block;
        height: 20px;
    }
`

export const injected = new InjectedConnector({
    supportedChainIds: [1, 56, 820]
});

const AddNetworkSection = ({curNet, toNet, step}) => {
    const { account, activate } = useWeb3React()
    const { logout } = useAuth()
    const accountEllipsis = account ? `${account.substring(0, 6)}...${account.substring(account.length - 6)}` : null;

    async function handleConnectToMetamask() {
        activate(injected);
        const network = step === 2 ? toNet : curNet
        if (network.symbol === "ETH") {
            await setupEthereumNetwork(network)
        } else {
            await setupNetwork(network)
        }
    }

    return (
        <Container>
            {!account && <StyledText color="#f70556">If you have not connected to your MetaMask yet, please connect.</StyledText>}
            <Spacer height="10px" />
            <Row>
                <Con onClick={handleConnectToMetamask} bk={Theme.colors.primary}>
                    <StyledTextBold color={Theme.colors.secondary}>{accountEllipsis !== null? accountEllipsis : `Connect Wallet / Add Network`}</StyledTextBold>
                    {
                        account && <RowFlex>
                            <NetImg src="https://dex-bin.bnbstatic.com/static/images/metamask.svg" alt="net_image" />
                            <StyledTextBold color={Theme.colors.secondary}>{curNet.name}</StyledTextBold>
                        </RowFlex>
                    }
                </Con>
                <Divider />
                {account && <Con onClick={()=>logout()} bk='rgba(0, 0, 0, .5)'>
                    <StyledTextBold color={Theme.colors.secondary}>Disconnect</StyledTextBold>
                </Con>}
            </Row>
        </Container>
    )
}

export default AddNetworkSection;

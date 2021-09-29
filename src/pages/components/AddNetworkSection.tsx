import React, { useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from "@web3-react/injected-connector";
import { setupEthereumNetwork, setupNetwork } from 'utils/wallet';
import Spacer from 'components/Spacer';
import { Theme } from 'constants/theme';
import styled from 'styled-components';
import useAuth from 'hooks/useAuth';
import WalletModal from './WalletModal';

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

export const injected = new InjectedConnector({
    supportedChainIds: [1, 56, 820]
});

const AddNetworkSection = ({curNet, toNet, step}) => {
    const { account } = useWeb3React()
    const { login, logout } = useAuth()
    const accountEllipsis = account ? `${account.substring(0, 6)}...${account.substring(account.length - 6)}` : null;

    const [isOpen, setIsOpen] = useState(false)

    async function handleConnectToWallet(connector) {
        setIsOpen(false);
        login(connector, curNet);
        const network = step === 2 ? toNet : curNet
        if (network.symbol === "ETH") {
            await setupEthereumNetwork(network)
        } else {
            await setupNetwork(network)
        }        
    }

    function toggleModal(e) {
        setIsOpen(!isOpen)
    }

    return (
        <Container>
            {!account && <StyledText color="#f70556">Please log in to MetaMask if you are not already connected.</StyledText>}
            <Spacer height="10px" />
            <Row>
                <Con onClick={toggleModal} bk={Theme.colors.primary}>
                    <StyledTextBold color={Theme.colors.secondary}>{accountEllipsis !== null? accountEllipsis : `Connect Wallet / Add Network`}</StyledTextBold>
                    {
                        account && <RowFlex>
                            <NetImg src="https://dex-bin.bnbstatic.com/static/images/metamask.svg" alt="net_image" />
                            <StyledTextBold color={Theme.colors.secondary}>{curNet.name}</StyledTextBold>
                        </RowFlex>
                    }
                </Con>
            </Row>
            <WalletModal 
                isOpen={isOpen}
                toggleModal={toggleModal}
                handleConnect={(connector) => handleConnectToWallet(connector)}
                logout={() => {
                    setIsOpen(false)
                    logout()
                }}
            />
        </Container>
    )
}

export default AddNetworkSection;

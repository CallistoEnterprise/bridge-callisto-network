import React from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import Modal from 'styled-react-modal'
import CloseIcon from 'components/Icons/Close'
import { Theme } from 'constants/theme'

const WalletModal = ({isOpen, toggleModal, handleConnect, logout}) => {
    const { account } = useWeb3React()

    return (
        <StyledModal
            isOpen={isOpen}
            onBackgroundClick={()=>toggleModal()}
            onEscapeKeydown={()=>toggleModal()}
        >
            <StyledModalHeader>
                <StyledText>Connect Wallet</StyledText>
                <CloseIcon color={Theme.colors.secondary} onClick={toggleModal}/>
            </StyledModalHeader>
            <Row
                onClick={()=>handleConnect("injected")}
                disabled={account !== undefined}

            >
                <NetImg src="https://dex-bin.bnbstatic.com/static/images/metamask.svg" w="30px" alt="net_image" />
                <StyledText2 disabled={account !== undefined}>Metamask</StyledText2>
            </Row>
            <Row
                onClick={()=>handleConnect("walletconnect")}
                disabled={account !== undefined}
            >
                <NetImg src="https://gblobscdn.gitbook.com/spaces%2F-LJJeCjcLrr53DcT1Ml7%2Favatar.png?alt=media" w="40px" alt="net_image" />
                <StyledText2 disabled={account !== undefined}>Wallet Connect</StyledText2>
            </Row>
            <StyledFooter>
                <LogoutBtn
                    disabled={!account}
                    grey={!account}
                    onClick={logout}
                >
                    Logout
                </LogoutBtn>
            </StyledFooter>
        </StyledModal>
    )
}

const StyledModal = Modal.styled`
  width: 280px;
//   height: 20rem;
  border-radius: 20px;
  background-color: ${Theme.colors.white};
`
const StyledText = styled.p`
    color: ${Theme.colors.secondary};
    font-family: ${Theme.fonts.textBold};
    font-size: 20px;
`
const StyledText2 = styled.p<{disabled: boolean}>`
    color: ${({disabled}) => disabled? 'grey' : Theme.colors.secondary};
    font-family: ${Theme.fonts.textBold};
    font-size: 20px;
    &:hover {
        cursor: pointer;
    }
`
const LogoutBtn = styled.button<{grey: boolean}>`
    color: ${({grey}) => grey? 'grey' : Theme.colors.secondary};
    font-family: ${Theme.fonts.textBold};
    font-size: 20px;
    border: none;
    background-color: transparent;
    &: hover {
        color: ${({grey}) => grey? 'grey' : '#f70556'};
    }
`
const StyledModalHeader = styled.div`
    -webkit-box-align: center;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(139.73deg, rgb(229, 253, 255) 0%, rgb(243, 239, 255) 100%);
    border-bottom: 1px solid rgb(231, 227, 235);
    display: flex;
    padding: 24px;
    border-radius: 20px 20px 0 0;
    width: 100%;
`
const StyledFooter = styled.div`
    -webkit-box-align: center;
    align-items: center;
    justify-content: center;
    background: linear-gradient(139.73deg, rgb(243, 239, 255) 0%, rgb(229, 253, 255) 100%);
    border-top: 1px solid rgb(231, 227, 235);
    display: flex;
    padding: 24px;
    border-radius: 0px 0px 20px 20px;
    width: 100%;
`
const Row = styled.button`
    display: flex;
    padding: 24px;
    align-items: center;
    justify-content: center;
    border: none;
    width: 100%;
    background-color: ${Theme.colors.white};
    &:hover {
        background-color: rgba(229, 253, 255, 1);
        cursor: pointer;
    }
`
const NetImg = styled.img<{w: string}>`
    width: ${({w}) => w};
    margin-right: 20px;
`;
export default WalletModal;

import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components';
import { FaLongArrowAltRight, FaLongArrowAltDown } from 'react-icons/fa';
import Web3 from 'web3'
import { ethers } from 'ethers'
import { Spinner } from 'react-bootstrap';
import { setupEthereumNetwork, setupNetwork, switchNetwork } from 'utils/wallet';
import Spacer from 'components/Spacer';
import { Theme } from 'constants/theme';
import { Networks, tokenList } from 'constants/strings';
import { getBridgeAddress } from 'utils/decimal';
import { getBridgeContract, getTokenContract } from 'utils';
import getSignatures from 'utils/getSignatures';
import { useNativeCoinBalance } from 'hooks/wallet';
import useActiveWeb3React from 'hooks/useActiveWeb3';
import AssetsSelector from './components/AssetsSelector';
import FromCard from "./components/FromCard";
import ToCard from "./components/ToCard";
import AddNetworkSection from './components/AddNetworkSection';
import ErrorSection from './components/ErrorSection';
import AmtInput from './components/AmtInput';
import RecieveAddressInput from './components/RecieveAddressInput'
import Reminder from './components/Reminder';
import TxInput from './components/TxInput';

const Container = styled.div`
    background-color: #FFFFFF;
    padding: 40px;
    border-radius: 20px;
    width: calc(75% - 40px);
    margin-left: 40px;
    @media screen and (max-width: 600px){
        width: 100%;
        margin: 20px 0;
        padding: 20px;

    }
`;

const NetworkSection = styled.div`
    display: flex;
    align-items: center;
    @media screen and (max-width: 600px){
        flex-direction: column;
    }
`;

const DropCon = styled.div`
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #d9dbde;
    border-radius: 3px;
    width: 40px;
    height: 30px;
    margin: 30px 10px 0px;
    :hover {
        background-color: ${Theme.colors.primary};
    }
    @media screen and (max-width: 600px) {
        display: none;
    }
`;

const DropConMob = styled.div`
    padding: 10px;
    display: none;
    justify-content: center;
    align-items: center;
    background-color: #d9dbde;
    border-radius: 3px;
    width: 30px;
    height: 40px;
    margin: 30px 10px 0px;
    :hover {
        background-color: ${Theme.colors.primary};
    }
    @media screen and (max-width: 600px) {
        display: flex;
    }
`;
const StyledButton = styled.button<{disabled: boolean}>`
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    border: none;
    font-size: 26px;
    font-family: ${Theme.fonts.textBold};
    color: ${({disabled}) => disabled? `#51768d`: Theme.colors.secondary};
    background-color: ${({disabled}) => disabled? `#7ea594`: Theme.colors.primary};
    :hover {
        background-color: ${({disabled}) => disabled? `#7ea594`: Theme.colors.secondary};
        color: ${({disabled}) => disabled? `#51768d`: Theme.colors.white};
    }
`;

const CheckBoxDiv = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    cursor: pointer;
    justify-content: flex-end;
`
const StyledText = styled.p`
    color: ${Theme.colors.primary};
    font-family: ${Theme.fonts.textBold};
    margin-left: 10px;
`

const RightPane: React.FC = () => {
    const { chainId, account, library } = useActiveWeb3React()
    const [step, setStep] = useState(0)
    const [fromNetwork, setFromNetwork] = useState(Networks[0])
    const [toNetwork, setToNetwork] = useState(Networks[1])
    const [curAsset, setCurAsset] = useState(tokenList[0])
    const [amt, setAmt] = useState("")
    const [txHash, setTxHash] = useState("")
    const [isPendingTx, setIsPendingTx] = useState(false)
    const [rcvAddress, setRcvAddress] = useState("")
    const [manualClaim, setManualClaim] = useState(false)
    const [prevHash, setPrevHash] = useState("")
    const chainError = (chainId !== parseInt(fromNetwork.chainId) || !chainId) && step === 0


    const balances = useNativeCoinBalance(fromNetwork, curAsset)
    const validBalance = parseInt(fromNetwork.chainId) === chainId ? balances : "0.00"

    useEffect(() => {
        const init = async () => {
            const tx = await window.localStorage.getItem("prevData");
            setPrevHash(tx)
        }
        init()
    }, [])

    const CurrentStatus = {
        curAsset: curAsset.symbol,
        fromNetwork: fromNetwork.name,
        toNetwork: toNetwork.name
    }

    function handleChangeNetwork(index, validator) {
        if( validator === "1") {
            setFromNetwork(Networks[index])
            if(Networks[index].symbol === toNetwork.symbol ) {
                const newIdx = index + 1;
                if( newIdx > 2 ) {
                    setToNetwork(Networks[0])
                } else {
                    setToNetwork(Networks[newIdx])
                }
            }

        } else if(Networks[index].symbol !== fromNetwork.symbol )
            setToNetwork(Networks[index])
    }

    function handleAsset(item) {
        setCurAsset(item)
    }

    async function handleSwap() {
        if( manualClaim ) {
            if( chainId === parseInt(fromNetwork.chainId) ) {
                if( toNetwork.symbol === "ETH" ){
                    await setupEthereumNetwork(toNetwork)
                } else {
                    await setupNetwork(toNetwork)
                }
            } else {
                handlePrevClaim()
            }
        } else if(step === 2 && chainId === parseInt(fromNetwork.chainId)) {
            if( toNetwork.symbol === "ETH" ){
                await setupEthereumNetwork(toNetwork)
            } else {
                await setupNetwork(toNetwork)
            }
        } else {
            const web3 = new Web3(new Web3.providers.HttpProvider(fromNetwork.rpcs[0]))
            const amount = web3.utils.toWei(amt)
            if( !account || chainError) {
                alert("Cannot swap")
            } else if(step === 1) {
                handleSwapFirst(amount)            
            } else if( step === 2 ) {
                handleClaim()
            }
        }
    }

    async function handleSwapFirst(amount) {
        const swapTokenAddr = curAsset.addresses[`${fromNetwork.symbol}`]
        if( swapTokenAddr === "" ) {
            setStep(0)
            setAmt("")
            setRcvAddress("")
            alert("Please select another asset. Current asset is not supported yet!")
        } else {
            const bridgeAddr = getBridgeAddress(chainId)
            let value = "0"
            if(swapTokenAddr.slice(0, -2) === "0x00000000000000000000000000000000000000") {
                value = amount
            } else {
                const tkContract = getTokenContract(swapTokenAddr, library, account);
                const allowed = await tkContract.allowance(account, bridgeAddr, {value:0});
                if( allowed < amount ) {
                    await tkContract.approve(bridgeAddr, ethers.constants.MaxUint256, {value:0})
                }
            }
            const bridgeContract = getBridgeContract(bridgeAddr, library, account)
            const tx = await bridgeContract.depositTokens(swapTokenAddr, amount, toNetwork.chainId, {value})
            setIsPendingTx(true)
    
            const receipt = await tx.wait()
            if( receipt.status ) {
                await switchNetwork(toNetwork)
                setIsPendingTx(false)
                window.localStorage.setItem("prevData", tx.hash)
                setTxHash(tx.hash)
                setStep(2)
                setRcvAddress(account)
            } else {
                setIsPendingTx(false)
            }
        }
    }

    async function handleClaim(){
        if( txHash )
        setIsPendingTx(true)
        const {signatures, respJSON} = await getSignatures(txHash, fromNetwork.chainId)
        if( signatures.length !== 3 ) {
            setIsPendingTx(false)
            alert("Please check your network connection and try again.")
            return;
        }
        const bridgeContract = await getBridgeContract(respJSON.bridge, library, account)
        const tx = await bridgeContract.claim(respJSON.token, txHash, respJSON.to, respJSON.value, fromNetwork.chainId, signatures, {value: 0})
        const receipt = await tx.wait()
        if( receipt.status ) {
            window.localStorage.removeItem("prevData")
            setIsPendingTx(false)
            setStep(0)
            setAmt("")
            setTxHash("")
        } else {
            setIsPendingTx(false)
        }
    }
    async function handlePrevClaim(){
        if( !prevHash ) {
            alert("Invalid transaction hash.")
            return
        }
        setIsPendingTx(true)
        const {signatures, respJSON} = await getSignatures(prevHash, fromNetwork.chainId)
        if( signatures.length !== 3 ) {
            setIsPendingTx(false)
            alert("Please check your network connection and try again.")
            return;
        }
        const bridgeContract = await getBridgeContract(respJSON.bridge, library, account)
        const tx = await bridgeContract.claim(respJSON.token, prevHash, respJSON.to, respJSON.value, fromNetwork.chainId, signatures, {value: 0})
        const receipt = await tx.wait()
        if( receipt.status ) {
            window.localStorage.removeItem("prevData")
            setIsPendingTx(false)
            setStep(0)
            setAmt("")
            setTxHash("")
        } else {
            setIsPendingTx(false)
        }
    }

    return (
        <Container>
            <CheckBoxDiv onClick={()=>setManualClaim(!manualClaim)}>
                <input
                    type="checkbox"
                    checked={manualClaim}
                    onChange={()=>setManualClaim(!manualClaim)}
                />
                <StyledText>Manual Claim of Previous Transaction.</StyledText>
            </CheckBoxDiv>
            {
                manualClaim && <TxInput value={prevHash} handleChange={(val)=>setPrevHash(val)} />
            }
            <AssetsSelector curToken={curAsset} changeAsset={(item)=>handleAsset(item)} fromNet = {fromNetwork} balance={validBalance}/>
            <Spacer height="30px" />
            <NetworkSection>
                <FromCard curNet={fromNetwork} changeNetwork={(idx) => handleChangeNetwork(idx, "1")}/>
                <DropCon>
                    <FaLongArrowAltRight color={Theme.colors.secondary} size={16}/>
                </DropCon>
                <DropConMob>
                    <FaLongArrowAltDown color={Theme.colors.secondary} size={16}/>
                </DropConMob>
                <ToCard curNet={toNetwork} changeNetwork={(idx) => handleChangeNetwork(idx, "2")}/>
            </NetworkSection>
            <Spacer height="30px" />
            <AddNetworkSection curNet={fromNetwork} toNet={toNetwork} step={step}/>
            <Spacer height="30px" />
            {
                chainError || (step === 1 && chainId !== parseInt(fromNetwork.chainId) ) && <ErrorSection currentStatus={CurrentStatus}/>
            }
            <Spacer height="30px" />
            
            {
                !manualClaim && <AmtInput value={amt} handleChange={(val)=>{
                    setStep(1)
                    setAmt(val)
                }}/>
            }
            { step === 2 &&
                <RecieveAddressInput value={rcvAddress} handleChange={(val)=>setRcvAddress(val)}/>
            }
            <Spacer height="30px" />
            { 
                manualClaim? 
                    <StyledButton disabled={!manualClaim || !account} onClick={handleSwap}>
                        {isPendingTx && step !== 0 ? <Spinner animation="border" role="status" />:
                        <p>{ chainId === parseInt(fromNetwork.chainId) ? `Switch Network to ${toNetwork.name}` : `Claim`}</p>}
                    </StyledButton>:
                    <StyledButton 
                        disabled={
                            chainError ||
                            isPendingTx ||
                            amt === "" ||
                            (step === 1 && chainId !== parseInt(fromNetwork.chainId))||
                            parseInt(amt) >= parseInt(validBalance.toString())
                        }
                        onClick={handleSwap}
                    >
                        {isPendingTx && step !== 0 ? <Spinner animation="border" role="status" />:
                        <p>{step === 2 ? chainId === parseInt(fromNetwork.chainId) ? `Switch Network to ${toNetwork.name}` : `Claim` : `Swap`}</p>}
                    </StyledButton>
                }
            <Spacer height="30px" />
            <Reminder symbol={CurrentStatus.curAsset}/>
        </Container>
    )
}

export default RightPane;

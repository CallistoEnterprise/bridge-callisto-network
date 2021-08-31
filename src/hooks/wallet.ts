import BigNumber from "bignumber.js";
import { ethers } from "ethers";
import { Contract } from '@ethersproject/contracts'
import sample from 'lodash/sample'
import { useEffect, useMemo, useState } from "react";
// import { simpleRpcProvider } from "utils/providers";
import erc20Abi from 'constants/abis/erc20.json'
import WETH_ABI from 'constants/abis/weth.json'
import { getContract } from "utils";
import useActiveWeb3React from "./useActiveWeb3";


// returns null on errors
function useContract(address: string | undefined, ABI: any, withSignerIfPossible = true): Contract | null {
    const { library, account } = useActiveWeb3React()
  
    return useMemo(() => {
      if (!address || !ABI || !library) return null
      try {
        return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
      } catch (error) {
        console.error('Failed to get contract', error)
        return null
      }
    }, [address, ABI, library, withSignerIfPossible, account])
}

const getNodeUrl = (nodes) => {
    return sample(nodes)
  }

export const useNativeCoinBalance = (fromNet: any, curAsset?: any) => {
    const { account, chainId } = useActiveWeb3React()
    const [amt, setAmt] = useState<number | string>(0)
    const RPC_URL = useRpcProvider(fromNet.rpcs)
    const tokenContract = getErc20Contract(curAsset.addresses[`${fromNet.symbol}`], RPC_URL)
    useEffect(() => {
        const getBalance = async () => {
            if( account && fromNet.symbol === curAsset.symbol && parseInt(fromNet.chainId) === chainId) {
                const amount = await RPC_URL.getBalance(account)
                const bigAmt = new BigNumber(amount.toString())
                const decimalBalance = (parseInt(bigAmt.toString())/10 ** 18).toFixed(2)
                setAmt(decimalBalance)
            } else if( account && parseInt(fromNet.chainId) === chainId ) {
                const balance: BigNumber = await tokenContract.balanceOf(account, {value: 0})
                const strBalance = balance.toString()
                const decimalBalance = (parseInt(strBalance)/10 ** 18).toFixed(2)
                setAmt(decimalBalance)
            }
        }
        getBalance()
    }, [account, tokenContract, chainId, RPC_URL, curAsset.addresses, fromNet.rpcs, fromNet.chainId, fromNet.symbol, curAsset.symbol])
    return amt
}


export const useERC20 = (address: string) => {
    const { library } = useActiveWeb3React()
    return useMemo(() => getErc20Contract(address, library.getSigner()), [address, library])
}

export const useRpcProvider = (rpcs: string[]) => {
    const RPC_URL = getNodeUrl(rpcs)
    return useMemo(() => new ethers.providers.JsonRpcProvider(RPC_URL), [RPC_URL])
}
  
export const getErc20Contract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
    // const signerOrProvider = signer
    return new ethers.Contract(address, WETH_ABI, signer)
}

export function useWETHContract(address: string, withSignerIfPossible?: boolean): Contract | null {
    const { chainId } = useActiveWeb3React()
    return useContract(chainId ? address : undefined, WETH_ABI, withSignerIfPossible)
}
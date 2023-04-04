import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import React from 'react'
import { useDispatch } from 'react-redux'
import { initiateNetwork } from '../../integration/web3Client'
import { setWalletData, walletConnect } from '../../redux/counter/counterSlice'
import './cards.scss';
const ConnectWallet = ({ title, text }) => {
    const dispatch = useDispatch();

    const connectNetwork = async (provider) => {
        try {
          const info = await initiateNetwork(provider);
        console.log ("Info",info);  
          if (info instanceof Error) {
            alert(info.message)
            disconnectNetwork();
          } else if (info) {
            const { ethBalance, account, chainId, networkId } = info;
            console.log("Info 2",info);
            dispatch(setWalletData(info));
            // console.log(newWalletAddress, "WalletAddress in connectNetwork");
            // if (validateNetwork(networkId)) {
            //   if (newWalletAddress != null && newWalletAddress != '') {
            //     console.log(newWalletAddress, "WalletAddress inside connectNetwork");
            //     if (validateAccount(account)) {
            //       saveUserInfo(ethBalance, account, chainId, networkId, provider);
            //     } else {
            //       alert('Please check the connected wallet address');
            //       disconnectNetwork();
            //     }
            //   } 
            //   // else {
            //   //   saveUserWalletAddress(ethBalance, account, chainId, networkId, provider)
            //   // }
            // } else {
            //   alert('Please check the Network');
            //   disconnectNetwork();
            // }
          } else {
            alert('Please check the Network or Account');
            disconnectNetwork();
          }
        } 
        catch (err) {
          console.log(err)
          // alert(err.message);
        }
      }

      const disconnectNetwork = async () => {
        window.localStorage.removeItem('userAccount');
        // setIsConnected(false);
        dispatch(walletConnect(false));
      }
  return (
    <div className='connect-wallet'>
        <h1> {title} </h1>
        <div style={{ textAlign: 'center' }}>
        <Button disableRipple className='btn-wallet' onClick={()=> connectNetwork('metamask')} > Connect wallet </Button> 
        <p> {text}</p>
        </div>
    </div>
  )
}

export default ConnectWallet
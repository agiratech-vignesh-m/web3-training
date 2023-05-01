import { useDispatch } from "react-redux";
import { initiateNetwork } from "../integration/web3Client";
import { clearData, setWalletData } from "../redux/counter/counterSlice";
import web3 from 'web3';
import { useState } from "react";

export const NetworkConnection = () => {
    const dispatch = useDispatch();
    const [wallet, setWallet] = useState(null);

    // const autoConnect = async () => {
    //     const info = await initiateNetwork("metamask");
    //     if (info instanceof Error) {
    //       alert(info.message)
    //       disconnectNetwork();
    //     } else if (info) {
    //       const { account, networkId } = info;
    //       if (validateNetwork(networkId)) {
    //         setWallet(account);
    //         dispatch(setWalletData(info));
    //         dispatch(setConnectAMENetwork(true));
    //         dispatch(setLoading(false));
    //       } else {
    //         // disconnectNetwork();
    //         let networks = {
    //           development: {
    //             chainId: 181,
    //             chainName: 'AME Testnet',
    //             nativeCurrency: {
    //               name: 'AME',
    //               symbol: 'AME',
    //               decimals: 18
    //             },
    //             rpcUrls: ['https://testnet.amechain.io'],
    //             blockExplorerUrls: ['https://testnet.amescan.io']
    //           },
    //           production: {
    //             chainId: 180,
    //             chainName: 'AME Mainnet',
    //             nativeCurrency: {
    //               name: 'AME',
    //               symbol: 'AME',
    //               decimals: 18
    //             },
    //             rpcUrls: ['https://node1.amechain.io/'],
    //             blockExplorerUrls: ['https://amescan.io']
    //           }
    //         };
    
    //         if (window.ethereum.networkVersion !== networks[process.env.REACT_APP_NODE_ENV].chainId) {
    //           try {
    //             await window.ethereum.request({
    //               method: 'wallet_switchEthereumChain',
    //               params: [{ chainId: web3.utils.toHex(networks[process.env.REACT_APP_NODE_ENV].chainId) }]
    //             });
    //             autoConnect("metamask");
    //           } catch (err) {
    //               // This error code indicates that the chain has not been added to MetaMask
    //             if (err.code === 4902) {
    //               await window.ethereum.request({
    //                 method: 'wallet_addEthereumChain',
    //                 params: [
    //                   {
    //                     chainName: networks[process.env.REACT_APP_NODE_ENV].chainName,
    //                     chainId: web3.utils.toHex(networks[process.env.REACT_APP_NODE_ENV].chainId),
    //                     nativeCurrency: {
    //                       name: networks[process.env.REACT_APP_NODE_ENV].nativeCurrency.name,
    //                       decimals: networks[process.env.REACT_APP_NODE_ENV].nativeCurrency.decimals,
    //                       symbol: networks[process.env.REACT_APP_NODE_ENV].nativeCurrency.symbol
    //                     },
    //                     rpcUrls: networks[process.env.REACT_APP_NODE_ENV].rpcUrls,
    //                     blockExplorerUrls: networks[process.env.REACT_APP_NODE_ENV].blockExplorerUrls
    //                   }
    //                 ]
    //               });
    //               autoConnect("metamask");
    //             }
    //           }
    //         }
    //       }
    //     }
    //   };

      const connectNetwork = async () => {
        try {
            // dispatch(setLoading(true));
          const info = await initiateNetwork("metamask");
          if (info instanceof Error) {
            alert(info.message)
            disconnectNetwork();
          } else if (info) {
            const { account, networkId } = info;
            if (validateNetwork(networkId)) {
                setWallet(account);
                dispatch(setWalletData(info));
                // dispatch(setConnectAMENetwork(true));
                // dispatch(setLoading(false));
            } else {
              alert('Please check the Network');
              disconnectNetwork();
            }
          } else {
            alert('Please check the Network or Account');
            disconnectNetwork();
          }
        }
        catch (err) {
            disconnectNetwork();
            console.log(err);
        }
      }
      const disconnectNetwork = async () => {
        setWallet(pre => pre = null);
        logout();
        // dispatch(setConnectAMENetwork(false));
      }

      const logout = () => {
        dispatch(clearData());
        // dispatch(setLoading(false));
      };

      const validateNetwork = (networkId) => {
        const networks = {
          production: {
            // 180: "AME"
            // Need to polygon mainnet
          },
          development: {
            80001: 'Polygon test newtork',
            // 181: 'AME Testnet',
    
          }
        }
        return networks[process.env.REACT_APP_NODE_ENV][networkId]
      }
      return {
        // autoConnect,
        connectNetwork,
        disconnectNetwork,
        logout,
        validateNetwork,
        wallet
      }
}

export default NetworkConnection;
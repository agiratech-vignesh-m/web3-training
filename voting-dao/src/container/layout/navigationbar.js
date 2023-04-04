import React, { useCallback, useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
// import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Button } from '@mui/material';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import WalletDetails from '../../components/popups/walletDetails';
import { walletStatus, getWalletData } from '../../redux/counter/counterSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { walletConnect, setWalletData, clearData } from '../../redux/counter/counterSlice';
import { initiateNetwork } from '../../integration/web3Client';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '33px',
  backgroundColor: alpha('#F6F6F6', 1),
  '&:hover': {
    backgroundColor: alpha('#F6F6F6', 1),
  },
  marginRight: theme.spacing(2),
  marginLeft: '0 !important',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  top: 0,
  right: 7,
  color: '#575757',
  width: '20px'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 2),
    // vertical padding + font size from searchIcon
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    fontFamily: 'InterMedium',
    [theme.breakpoints.up('md')]: {
      width: '60ch',
    },
  },
}));

export default function Navigationbar() {
  const [anchorEl, setAnchorEl] = React.useState(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isWalletConnected = useSelector(walletStatus);
  const walletData = useSelector(getWalletData);
  // console.log("WalletData", walletData);
  const dispatch = useDispatch();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const [open, setOpen] = React.useState(false);

  const[wallet, setWallet] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const logout = useCallback(() => {
      dispatch(clearData());
      setOpen(false);
    },[isWalletConnected]);

useEffect(() => {
  if(wallet){
    if (window.ethereum) { // this is for metamask installation detection
      window.ethereum.on('chainChanged', () => {
        connectNetwork("metamask") // TODO: reuse the isConnected variable instead local storage
      });
      window.ethereum.on('accountsChanged', () => {
        connectNetwork("metamask") // TODO: reuse the isConnected variable instead local storage
      });
    }
  }
}, [wallet])

const onConnect = async (provider) => {
  // console.log('connection provider: ', provider);
  connectNetwork(provider);
};

const disconnectNetwork = async () => {
  // setIsConnected(false);
  dispatch(walletConnect(false));
}

  // internal: validate the connected network in the metamask
  const validateNetwork = (networkId) => {
    const networks = {
      production: {
       // 1: "Ethereum Mainnet",
       137: "Polygon Mainnet",
       180: "AME"
     },
     development: {
       // 3: 'Ropsten test network',
       // 4: 'Rinkeby test network',
       // 5: 'Goerli test network',
       // 137: "Polygon Mainnet"
       80001: 'Polygon test newtork',
       181: 'AME Testnet',

      }
    }
  // console.log("network validation ", networkId, networks[process.env.REACT_APP_NODE_ENV][networkId])
  return networks[process.env.REACT_APP_NODE_ENV][networkId]
  }

const connectNetwork = async (provider) => {
  try {
    const info = await initiateNetwork(provider);
    // console.log ("Info",info);  
    if (info instanceof Error) {
      alert(info.message)
      disconnectNetwork();
    } else if (info) {
      const { ethBalance, account, chainId, networkId } = info;
      if (validateNetwork(networkId)) {
        setWallet(account);
        dispatch(setWalletData(info));      
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
    console.log(err)
    // alert(err.message);
  }
}
  return (
    <Box sx={{ flexGrow: 1 }} className="nav-bar-box" >
      <WalletDetails open={open} handleClose={handleClose} logout= {logout} />
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Search>
            {/* <StyledInputBase
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}
            />
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper> */}
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <div className="header-logo" onClick={handleProfileMenuOpen} >
                {isWalletConnected ?
                 <>
                 <Button disableRipple className='btn-wallet'> <img src={require("../../asset/ame.png")} width='32'></img> </Button>
                 <Button disableRipple className='btn-wallet' onClick={handleClickOpen} startIcon={<AccountBalanceWalletOutlinedIcon />}> {walletData?.account.slice(0,4)}...{walletData?.account.slice(-4)} </Button>
                 </> 
                 :
                <Button disableRipple className='btn-wallet' onClick={()=> onConnect('metamask')} > Connect wallet </Button> 
               }
            </div>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

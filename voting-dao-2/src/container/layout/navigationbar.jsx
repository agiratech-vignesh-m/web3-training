import React, { useCallback, useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Button, Divider, Drawer } from '@mui/material';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import WalletDetails from '../../components/popups/walletDetails';
import { walletStatus, getWalletData } from '../../redux/counter/counterSlice';
import { useSelector, useDispatch } from 'react-redux';
import { clearData } from '../../redux/counter/counterSlice';
import NetworkConnection from '../../helpers/networkConnection';
import NavigationMenu from './navMenu';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { XSMenuList } from './list';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

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

export default function Navigationbar() {

  const { autoConnect, connectNetwork, wallet } = NetworkConnection();
  const [anchorEl, setAnchorEl] = React.useState(false);
  const isWalletConnected = useSelector(walletStatus);
  const walletData = useSelector(getWalletData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setState] = React.useState(false);
  const [isCopy, setCopy] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCopy(false);
    }
  }, [isOpen])

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setState(false);
  };

  const logout = useCallback(() => {
    dispatch(clearData());
    setOpen(false);
    setState(false);
  }, [isWalletConnected]);


  useEffect(() => {
    if (wallet) {
      if (window.ethereum) { // this is for metamask installation detection
        window.ethereum.on('chainChanged', () => {
          console.log('wallet', wallet);
          connectNetwork() // TODO: reuse the isConnected variable instead local storage
        });
        window.ethereum.on('accountsChanged', () => {
          connectNetwork() // TODO: reuse the isConnected variable instead local storage
        });
      }
    }
  }, [wallet])

  // useEffect(() => {
  //   if (window.ethereum) {
  //     autoConnect();
  //   }
  // }, []);

  useEffect(() => {
    console.log('window.ethereum', window.ethereum);
    if (window.ethereum) {
      autoConnect();
    }
  }, [window.ethereum])

  // Sticky Menu Area
  useEffect(() => {
    window.addEventListener('scroll', isSticky);
    return () => {
      window.removeEventListener('scroll', isSticky);
    };
  });

  /* Method that will fix header after a specific scrollable */
  const isSticky = (e) => {
    const header = document.querySelector('.nav-bar-box');
    const scrollTop = window.scrollY;
    // console.log('window.innerHeight', window.innerHeight);
    const body = document.body;
    const html = document.documentElement;
    const height = Math.max(body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight);
    // console.log('height', height);
    ((height > (window.innerHeight + 350)) && scrollTop >= 200) ? header.classList.add('is-sticky') : header.classList.remove('is-sticky');
  };

  return (
    // style={{ position: location.pathname ==='/createproposal'? 'static' : 'sticky' }}
    <Box sx={{ flexGrow: 1 }} className="nav-bar-box" >
      <WalletDetails open={open} handleClose={handleClose} logout={logout} />
      <AppBar position="static" color="transparent">
        <Toolbar>
          {/* onClick={() => window.open('https://amechain.io/', '_blank', 'noreferrer')} */}
          <div className="side-menu-img" onClick={() => navigate('/proposals')}>
            <img style={{ width: "100%", height: "auto", position: "relative", overflow: 'hidden' }}
              src={require("../../asset/amelogo.svg").default} />
          </div>
          <Search>
          </Search>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' } }} />
          <Box sx={{ display: { xs: 'none', sm: 'flex', md: 'flex', lg: 'flex' } }}>
            <div className="header-logo" onClick={handleProfileMenuOpen} >
              <NavigationMenu />
              {isWalletConnected ?
                <>
                  <Button disableRipple className='btn-wallet' style={{ cursor: 'default' }}> <img src={require("../../asset/ame.png")} width='32' /> </Button>
                  <Button disableRipple className='btn-wallet' onClick={handleClickOpen} startIcon={<AccountBalanceWalletOutlinedIcon />}> {walletData?.account.slice(0, 4)}...{walletData?.account.slice(-4)} </Button>
                </>
                :
                <Button disableRipple className='btn-wallet' onClick={()=> window.location.reload(true)} > Connect wallet </Button>
              }
            </div>
          </Box>
          <Box sx={{ display: { xs: 'flex', sm: 'none', md: 'none', lg: 'none' } }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={() => setState(true)}
            // sx={{ ...(isOpen && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            {isOpen && <Drawer
              anchor={'right'}
              open={isOpen}
              onClose={() => setState(false)}
            >
              <Box
                sx={{ width: 300 }}
                role="presentation"
              // onClick={() => setState(false)}
              // onKeyDown={() => setState(false)}
              >
                <div className='mobile-drawer-div' style={{ padding: '40px 30px' }}>
                  <div className='pannel-close' onClick={() => setState(false)}>
                    <CloseIcon style={{ fontSize: '2rem' }} />
                  </div>
                  <div className="mobile-side-menu-img">
                    <img style={{ width: "100%", height: "auto", position: "relative", overflow: 'hidden' }}
                      src={require("../../asset/amelogo.svg").default} />
                  </div>
                  {isWalletConnected && <>
                    <div>
                      <h1 className='wallet-detail-heading'> Your Wallet </h1>
                      <p className='wallet-detail-address'> <span style={{ marginRight: '10px', fontSize: '1.3rem' }} >{walletData?.account.slice(0, 4)}...{walletData?.account.slice(-4)}</span> <ContentCopyIcon onClick={() => { navigator.clipboard.writeText(walletData.account); setCopy(true); }} style={{ cursor: 'pointer', color: isCopy ? '#ff0a0a6e' : 'rgb(255 10 10 / 91%)' }} />  </p>
                      <div className='wallet-detail-btn'>
                        <p style={{ fontSize: '1.2rem', margin: '0rem' }}> <span style={{ color: '#8b949e' }} >Balance:</span>  {walletData?.ameBalance && parseFloat(walletData?.ameBalance).toFixed(4)}
                          <span style={{ marginLeft: '10px', color: 'dimgray' }}>AME</span>
                        </p>
                      </div>
                    </div>
                    <Divider style={{ borderColor: 'rgb(244 201 160)' }} />
                  </>
                  }
                  <XSMenuList closeDrawer={() => {
                    setState(false);
                    setTimeout(() => {
                      navigate('/proposals');
                    }, 100);
                  }}
                    closeDrawerCreate={() => {
                      setState(false);
                      setTimeout(() => {
                        navigate('/createproposal');
                      }, 100);
                    }}
                  />
                </div>
                <div className='wallet-logout'>
                  {isWalletConnected ?
                    <>
                      <Button onClick={logout} variant="text" style={{ color: 'inherit', fontSize: '15px' }} >
                        <img src={require("../../asset/ame.png")}
                          width="16px"
                          height="16px"
                          alt="logo" />
                        <span style={{ marginLeft: '6px' }}> Disconnect</span>
                      </Button>
                    </>
                    :
                    <Button onClick={autoConnect} variant="text" style={{ color: 'inherit', fontSize: '15px' }} >
                      <img src={require("../../asset/ame.png")}
                        width="16px"
                        height="16px"
                        alt="logo" />
                      <span style={{ marginLeft: '6px' }}> Connect wallet</span>
                    </Button>
                  }
                </div>
              </Box>
            </Drawer>}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

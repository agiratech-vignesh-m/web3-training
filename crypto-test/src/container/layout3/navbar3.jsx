import { AppBar, Box, Button, Toolbar } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import NetworkConnection from '../../helpers/networkConnection';
import { getWalletData, walletStatus } from '../../redux/counter/counterSlice';
const Navbar = () => {
    // const onConnect = () => {
    // }
  const isWalletConnected = useSelector(walletStatus);
  const { connectNetwork, logout } = NetworkConnection();
  const walletData = useSelector(getWalletData);
  return (
    <Box sx={{ flexGrow: 1 }} className="nav-bar-box" >
      <AppBar position="static" style={{ backgroundColor: "#A3EEFF", padding: '10px'  }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <div className="header-logo">
                  {isWalletConnected ?
                    <Button variant="contained" onClick={logout} style={{width:"15%",height:'60%', position:'absolute',top:'1rem',right:'1rem', fontWeight:'600'}}>{walletData?.account.slice(0, 4)}...{walletData?.account.slice(-4)}</Button>
                    :
                    <Button variant="contained" onClick={connectNetwork} style={{width:"15%",height:'60%', position:'absolute',top:'1rem',right:'1rem', fontWeight:'600'}}>Connect Wallet</Button>
                  }
            </div>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
export default Navbar
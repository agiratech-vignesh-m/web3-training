import { AppBar, Box, Button, Toolbar } from '@mui/material'
import React from 'react'

const Navbar = () => {

    const onConnect = () => {

    }
  return (
    <Box sx={{ flexGrow: 1 }} className="nav-bar-box" >
      <AppBar position="static" style={{ backgroundColor: "#A3EEFF", padding: '10px'  }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <div className="header-logo">
                <Button disableRipple className='btn-wallet' onClick={()=> onConnect('metamask')} > Connect wallet </Button> 
            </div>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
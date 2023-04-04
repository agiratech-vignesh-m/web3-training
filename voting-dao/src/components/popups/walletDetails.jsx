import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CloseIcon from '@mui/icons-material/Close';
import './popup.scss';
import { IconButton } from '@mui/material';
import { getWalletData } from '../../redux/counter/counterSlice';
import { useSelector } from 'react-redux';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function WalletDetails({open, handleClose, logout}) {
    const walletData = useSelector(getWalletData);
    const [isCopy, setCopy] = useState(false);

    useEffect(() => {
      if(open) setCopy(false);
    }, [open])
    

  return (
      <Dialog
      className='wallet-detail'
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className='wallet-detail-title'> 
        <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon style={{ fontSize: '2rem', color: '#e4671f' }} />
            </IconButton>
        {/* <img src={require("../../asset/eth.png")} width='50' />  Ethereum  */}
        <span className='wallet-logo' >
        <img src={require("../../asset/logo.svg").default} />
        </span>
        </DialogTitle>
        <DialogContent>
            <p className='wallet-detail-heading'> Your Wallet </p>
            <p className='wallet-detail-address'> <span style={{marginRight: '10px'}} >{walletData?.account}</span> <ContentCopyIcon onClick={() => {navigator.clipboard.writeText(walletData.account); setCopy(true);}}  style={{ cursor: 'pointer', color: isCopy?'#ff0a0a6e':'rgb(255 10 10 / 91%)' }} />  </p>
            <div className='wallet-detail-btn'>
                <p style={{ fontSize: '2rem' }}> <span style={{ color: '#8b949e' }} >Balance:</span>  { walletData?.ethBalance } <span>AME</span> </p>
                {/* <span className='btn-group' onClick={()=> window.open('https://dao.amechain.io/')}>
                <Button disableRipple className='btn'>View on Explorer </Button>
                <OpenInNewIcon style={{ color: '#434976' }} /> 
                </span> */}
                {/* <span className='btn-group' onClick={() => navigator.clipboard.writeText('0x631E9B031b16b18172a2B9D66C3668A68a668d20')}>
                <Button disableRipple className='btn'> Copy Address</Button>
                <ContentCopyIcon style={{ color: '#434976' }} /> 
                </span> */}

            </div>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>
          <Button disableRipple className='btn-wallet' onClick={logout}>Logout</Button>
        </DialogActions>
      </Dialog>
  );
}
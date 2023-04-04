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
import ConnectWallet from '../cards/connectWallet';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConnectWalletPopup({open, handleClose}) {
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
            <ConnectWallet title="Cast your vote" text="Connect your wallet to cast your vote" />
        </DialogContent>
      </Dialog>
  );
}
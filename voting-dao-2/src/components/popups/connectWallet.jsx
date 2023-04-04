import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import ConnectWallet from '../cards/connectWallet';
import './popup.scss';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConnectWalletPopup({ open, handleClose }) {
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
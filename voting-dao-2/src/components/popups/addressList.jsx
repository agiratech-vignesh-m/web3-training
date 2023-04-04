import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Divider, Drawer, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { quantityOfAgainstVotes, quantityOfForVotes } from '../../integration/web3Client';
import moment from 'moment';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const List = ({ li }) => {
    const [isCopy, setCopy] = useState(false);
    const { address, timestamp } = li;
    function dateFormat(date) {
        if (!date) return '';
        const newDate = new Date(date);
        return moment(newDate).toString();
    }
    return (
        <>
            <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                 <span style={{ marginRight: '10px', fontSize: '1rem' }} > {address} </span>
                {dateFormat(+timestamp * 1000)}
                {/* <ContentCopyIcon onClick={() => { navigator.clipboard.writeText(address); setCopy(true); }} style={{ cursor: 'pointer', color: isCopy ? '#ff0a0a6e' : 'rgb(255 10 10 / 91%)' }} />  */}
            </p>
            <Divider style={{ borderColor: 'rgb(221 197 197 / 21%)' }} />
        </>
    )
}

export const AddressList = ({ open, handleClose, text, proposalId }) => {

    let [addressList, setAddressList] = useState([]);

    useEffect(() => {
        if (open) {
            if (text === "For Voter Address") {
                forVoterDetails();
            } else if (text === "Against Voter Address") {
                againstVoterDetails();
            }
        }
    }, [open]);


    async function forVoterDetails() {
        addressList = await quantityOfForVotes("metamask", proposalId);
        console.log("addressList", addressList);
        setAddressList(addressList);
    }

    async function againstVoterDetails() {
        addressList = await quantityOfAgainstVotes("metamask", proposalId);
        setAddressList(addressList);
    }

    const download = () => {
        let data = [];
        for (let i = 0; i < addressList.length; i++) {
            const { address, timestamp, balance } = addressList[i];
            const newDate = moment(+timestamp * 1000).utc().format();
            data.push({ Address: address, Date: newDate, Votes: balance });
        }
        const fileName = text === "For Voter Address" ? "For_Voter_Address" : "Against_Voter_Address";
        const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const fileExtension = ".xlsx";
        let xlHeader = [];
        xlHeader = text === "For Voter Address" ? ["For voter address", "Date", "Wallet balance while voting"] : ["Against voter address", "Date", "Wallet balance while voting"];
        console.log('xlHeader', xlHeader);
        const ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.sheet_add_aoa(ws, [xlHeader], { origin: "A1" });
        const colWidth = [{ width: 60 }, { width: 30 }, { width: 10 }]
        ws["!cols"] = colWidth;
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const bufferBlob = new Blob([excelBuffer], { type: fileType });
        setTimeout(() => {
            FileSaver.saveAs(bufferBlob, fileName + fileExtension);
        }, 500);
    }

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
                    <img src={require("../../asset/amelogo.svg").default} width="100%" />
                </span>
            </DialogTitle>
            <span className='address-list-heading' >
                <h2 style={{ textAlign: 'center' }}>{text}</h2>
                <Button className='btn-add-download' onClick={download} variant="contained" endIcon={<FileDownloadIcon />} > .xlsx </Button>
            </span>

            <DialogContent>
                {addressList.map((li, i) => (
                    <List li={li} i={i} key={i} />
                ))}
            </DialogContent>
        </Dialog>
    );
}

const ListDrawer = ({ li }) => {
    const [isCopy, setCopy] = useState(false);
    const { address, timestamp } = li;
    function dateFormat(date) {
        if (!date) return '';
        const newDate = new Date(date);
        return moment(newDate).toString();
    }
    return (
        <>
            <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ marginRight: '10px', fontSize: '1rem' }} >{address.slice(0, 6)}...{address.slice(-6)} </span>
                <ContentCopyIcon onClick={() => { navigator.clipboard.writeText(address); setCopy(true); }} style={{ cursor: 'pointer', color: isCopy ? '#ff0a0a6e' : 'rgb(255 10 10 / 91%)' }} />
            </p>
            <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontSize: '.7rem' }}>{dateFormat(+timestamp * 1000)}</p>
            <Divider style={{ borderColor: 'rgb(221 197 197 / 21%)' }} />
        </>
    )
}

export const AddressListDrawer = ({ open, handleClose, text, proposalId }) => {

    let [addressList, setAddressList] = useState([]);

    useEffect(() => {
        if (open) {
            if (text === "For Voter Address") {
                forVoterDetails();
            } else if (text === "Against Voter Address") {
                againstVoterDetails();
            }
        }
    }, [open]);


    async function forVoterDetails() {
        addressList = await quantityOfForVotes("metamask", proposalId);
        console.log("addressList", addressList);
        setAddressList(addressList);
    }

    async function againstVoterDetails() {
        addressList = await quantityOfAgainstVotes("metamask", proposalId);
        setAddressList(addressList);
    }
    return (
        <Drawer
            anchor={'right'}
            open={open}
            onClose={handleClose}
        >
            <Box
                sx={{ width: 300 }}
                role="presentation"
            // onClick={handleClose}
            // onKeyDown={handleClose}
            >
                <div className='mobile-drawer-div' style={{ padding: '20px 15px' }}>
                    <div className='pannel-close' onClick={handleClose}>
                        <CloseIcon style={{ fontSize: '2rem' }} />
                    </div>
                    <div className="mobile-side-menu-img">
                        <img style={{ width: "100%", height: "auto", position: "relative", overflow: 'hidden' }}
                            src={require("../../asset/amelogo.svg").default} />
                    </div>
                    <span className='address-list-heading' >
                        <h2 style={{ textAlign: 'center' }}>{text}</h2>
                    </span>
                    <div style={{ padding: '0px 30px' }}>
                        {addressList.map((li, i) => (<ListDrawer li={li} i={i} key={i} />))}
                    </div>
                </div>
            </Box>
        </Drawer>
    );
}



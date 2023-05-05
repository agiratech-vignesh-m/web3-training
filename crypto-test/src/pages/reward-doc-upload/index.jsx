import { Grid, Box, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import FileDragDrop from "../../components/file_upload/fileupload";
import * as ipfsClient from "ipfs-http-client";
import LoadingButton from '@mui/lab/LoadingButton';
import { studentUploadRewardSetup } from "../../integration/web3Client";
import { getWalletData } from '../../redux/counter/counterSlice';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function UploadOne() {
  const [file, setFile] = useState(null);
  const [uploaded, setUpload] = useState(false);
  const fileTypes = ["JPG", "PNG", "GIF", "PDF"];
  const [url, setCid] = useState("");
  const [uploading, setUploading] = useState(false);
  const walletData = useSelector(getWalletData);
  const studentid = localStorage.getItem("studentId");
  // console.log("studentid", studentid)
  const navigate = useNavigate();

  const ipfs = new ipfsClient.create({
    url: process.env.REACT_APP_IPFC_SERVER,
  });

  const onSubmitHandler = async () => {
    try {
      setUploading(true)
      console.log("onSubmitHandler", file);
      const content = new Blob([file], { type: file.type })
      const { cid } = await ipfs.add(content);
      console.log("ciddd", cid.toString());
      let url = process.env.REACT_APP_IPFC_FILE_URL + "/ipfs/" + cid.toString();
      setCid(url);
      setUpload(true);
      setUploading(false)

      let upload1 = await studentUploadRewardSetup("metamask", walletData?.account, studentid, url)
      console.log("Fetching data", walletData?.account, studentid, url)
      navigate("/l2_reward_verification");

      // Need to enter the Student ID, ipfs_URL and Wallet address

    } catch (err) {
      console.log("errrrr", err);
      throw new Error(err?.message);
    }

  };
   
  const handleChange = (file) => {
    console.log("file", file);
    setFile(file);
  };

  const deleteFile = () => {
    try {
      setFile(null);
      setUpload(false);
    } catch (err) {
      console.log("err", err);
    }
  }

  return (
    <Grid container>
      <Grid
        item
        width={"100%"}
        mt={10}
        style={{
          textAlign: "center",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box width={"50%"} p={3} border={"1px solid #B5B5B5"} borderRadius={3}>
          <Typography align="left" fontWeight={900} mb={3}>
            File Upload
          </Typography>
          <Box width={"97%"}>
            <FileDragDrop files={file} fileTypes={fileTypes} handleChange={handleChange} />
          </Box>
          <Box mt={3}>
            <Button color="error" sx={{ mr: 2 }} variant="contained" onClick={deleteFile}>
              Remove
            </Button>
            <LoadingButton color="primary" loading={uploading} variant="contained" onClick={onSubmitHandler}>
              Upload
            </LoadingButton>
          </Box>
        </Box>
      </Grid>
      {uploaded && (
        <Grid
          item
          width={"100%"}
          mt={4}
          style={{
            textAlign: "center",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* NEED TO DISPAY THE ipfs LINK */}
          <Box width={"55%"} p={3} borderRadius={3}>
            {url}
          </Box>
        </Grid>
      )}
    </Grid>
  );
}

export default UploadOne;
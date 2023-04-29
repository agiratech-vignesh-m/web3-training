import { Grid, Box, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import FileDragDrop from "../../components/file_upload/fileupload";

function RewardInfo() {
  const [file, setFile] = useState(null);
  const [uploaded, setUpload] = useState(false);
  const fileTypes = ["JPG", "PNG", "GIF", "PDF"];

  const handleChange = (file) => {
    console.log("file", file);
    setFile(file);
  };

  const uploadFile = async () => {
    try {
      setUpload(true);
    } catch (err) {
      console.log("err", err);
    }
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
            <Button color="primary" variant="contained" onClick={uploadFile}>
              Upload
            </Button>
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
          <Box width={"55%"} p={3} borderRadius={3}>
            {file.name}
          </Box>
        </Grid>
      )}
    </Grid>
  )
}

export default RewardInfo
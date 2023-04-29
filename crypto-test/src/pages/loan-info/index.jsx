import { Grid, Box, TextField, Typography, Button } from "@mui/material";
import React from "react";

function Loan_Info() {
  const formSubmit = (e) => {
    try {
      e.preventDefault();
      console.log("ee", e.target.student_id.value);
    } catch (err) {
      console.log("err", err);
    }
  };
  return (
    <Grid container>
      <Grid
        item
        sm={12}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          width={"30%"}
          component="form"
          noValidate
          autoComplete="off"
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          mt={4}
          borderRadius={1}
          py={8}
          onSubmit={formSubmit}
          // bgcolor={"red"}
          boxShadow={"0px 0px 48px -15px rgba(0,0,0,0.75);"}
        >
          <Typography fontSize={25} fontWeight={"700"}>
            Repay Loan
          </Typography>
          <TextField
            required
            name="student_id"
            sx={{ width: "80%", mt: 3 }}
            id="outlined-required"
            label="Student Id"
          />

          <TextField
            required
            name="amount"
            sx={{ width: "80%", mt: 3 }}
            id="outlined-required"
            label="Amount"
          />

          <TextField
            required
            name="currency"
            sx={{ width: "80%", my: 3 }}
            id="outlined-required"
            label="CRYPTO"
          />

          <Button color="primary" type="submit" variant="contained">
            Pay
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Loan_Info;

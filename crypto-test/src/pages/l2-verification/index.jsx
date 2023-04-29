import { Box, Grid, TextField, Typography, Button } from "@mui/material";

const L2verification = () => {
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
        <Box width={"50%"} mt={3}>
          <Typography fontSize={25} fontWeight={700}>
            L1 Verificiation
          </Typography>
          <Box
            component={"form"}
            sx={{
              display: "flex",
              // justifyContent: "center",
              alignItems: "center",
              mt: 3,
            }}
          >
            <Typography fontSize={20}>Enter student id :</Typography>
            <TextField
              sx={{
                ml: 3,
              }}
              required
              name="student_id"
              label="Student ID"
              id="outlined-required"
            />
            <Button variant="contained" sx={{ height: 50, ml: 3 }}>
              Search
            </Button>
          </Box>
          <Box
            component={"form"}
            sx={{
              display: "flex",
              // justifyContent: "center",
              // alignItems: "center",
              mt: 3,
            }}
          >
            <Typography fontSize={20}>
              IPFS URL : https://ipfs.io/ipfs/
              QmUekmQdD9stUSswQ3Y8H14YXkQUtvBU5BKXHGVG7FJcB3
            </Typography>
          </Box>

          <Box
            component={"form"}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 5,
            }}
          >
            <Button
              variant="contained"
              color="error"
              sx={{ height: 50, ml: 3 }}
            >
              Reject
            </Button>
            <Button variant="contained" sx={{ height: 50, ml: 3 }}>
              Approve
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default L2verification;

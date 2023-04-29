import React from "react";
import "./login.css";

import { Button, Grid, TextField } from "@mui/material";
import textImage from "../../asset/Text.png";
import logo from "../../asset/ethlogo.png";
import metamask from "../../asset/metamask.png";
import mask from "../../asset/edited.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const register = () => {
    navigate("/register");
  };
  const dashboard = () => {
    navigate("/dashboard");
  };

  return (
    <Grid container style={{ height: "100vh", width: "100%" }}>
      <Grid item md={6} style={{ background: "#ffffff" }}>
        <img
          src={textImage}
          style={{ width: "80%", padding: "10% 10% 5% 10%" }}
        />
        <img
          src={logo}
          style={{
            width: "80%",
            objectFit: "contain",
            height: "50vh",
            padding: "0 10%",
          }}
        />
        <img
          src={metamask}
          style={{
            width: "80%",
            objectFit: "contain",
            height: "20vh",
            padding: "0 10%",
          }}
        />
      </Grid>

      <Grid item md={6} style={{ background: "#6ED4FD" }}>
        <img
          src={mask}
          style={{
            width: "80%",
            objectFit: "contain",
            height: "20vh",
            padding: "0 10%",
          }}
        />
        <h4 style={{ textAlign: "center" }}> Powered By Crypto Hisenberg </h4>
        <div style={{ marginTop: "6rem" }}>
          {/* <label style={{margin:"0 3rem 3rem"}}>
        ID</label> */}
          <TextField
            id="outlined-basic"
            placeholder="Id"
            variant="outlined"
            style={{ padding: "0 5% 5% 5%" }}
          />
        </div>
        <div>
          {/* <label  style={{margin:"0 3rem 3rem"}}>
        Password
        </label> */}
          <TextField
            id="outlined-basic"
            placeholder="Password"
            variant="outlined"
            style={{ padding: "0 5% 5% 5%" }}
          />
        </div>
        <p
          style={{
            textAlign: "end",
            marginRight: "3rem",
            cursor: "pointer",
            color: "red",
          }}
        >
          Forget password?
        </p>
        <Button
          onClick={dashboard}
          variant="contained"
          style={{ width: "90%", margin: "5%", padding: "1.5%" }}
        >
          Login
        </Button>
        <p style={{ textAlign: "center" }}>
          Don’t have an account?{" "}
          <span onClick={register} style={{ color: "red", cursor: "pointer" }}>
            Register
          </span>
        </p>
      </Grid>
    </Grid>
  );
};

export default Login;

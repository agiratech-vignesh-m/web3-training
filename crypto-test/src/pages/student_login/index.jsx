// import React, { useState } from "react";
// import "./login.css";
// import { Button, Grid, TextField } from "@mui/material";
// import textImage from "../../asset/Text.png";
// import logo from "../../asset/ethlogo.png";
// import metamask from "../../asset/metamask.png";
// import mask from "../../asset/edited.png";
// import { useNavigate } from "react-router-dom";
// // import { useSelector } from 'react-redux';
// // import { walletStatus, getWalletData } from '../../redux/counter/counterSlice';
// // import NetworkConnection from '../../helpers/networkConnection';
// import { loginVerifySetup } from '../../integration/web3Client';
// import swal from 'sweetalert';
// const Login = () => {
//   const navigate = useNavigate();
//   const [error, setError] = useState("");
//   const [id ,setId]= useState();
//   const [password ,setPassword]= useState();
//   // const register = () => {
//   //   navigate("/register");
//   // };
//   // const dashboard = () => {
//   //   navigate("/dashboard");
//   // };
// // const isWalletConnected = useSelector(walletStatus);
// // const { connectNetwork, logout } = NetworkConnection();
// // const walletData = useSelector(getWalletData);
// const handleSubmit = async () => {
//     // let loginDetails = {UserID: id, Password: password};
//     // console.log("loginDetails", loginDetails)
//     let verifyLogin = await loginVerifySetup("metamask", id, password);
//     console.log("verifyLogin-Data",verifyLogin)
//     if (!verifyLogin) {
//       setError("Invalid login credentials");
//       swal("Invalid Credential", error, "error");
//       setError("")
//       console.log("error",error)
//     } else {
//       navigate("/dashboard");
//     }
//   }
//   return (
//     <Grid container style={{ height: "100vh", width: "100%" }}>
//       <Grid item md={6} style={{ background: "#FFFFFF" }}>
//       {/* <div className='wallet-logout'>
//                   {isWalletConnected ?
//                     <>
//                       <Button variant="contained" onClick={logout} style={{width:"12%",height:'5%', position:'absolute',top:'1rem',right:'1rem', fontWeight:'600'}}>{walletData?.account.slice(0, 4)}...{walletData?.account.slice(-4)}</Button>
//                     </>
//                     :
//                     <Button variant="contained" onClick={connectNetwork} style={{width:"12%",height:'5%', position:'absolute',top:'1rem',right:'1rem'}}>Connect Wallet</Button>
//                   }
//         </div> */}
//         <img
//           src={textImage}
//           style={{ width: "80%", padding: "10% 10% 5% 10%" }}
//         />
//         <img
//           src={logo}
//           style={{
//             width: "80%",
//             objectFit: "contain",
//             height: "50vh",
//             padding: "0 10%",
//           }}
//         />
//         <img
//           src={metamask}
//           style={{
//             width: "80%",
//             objectFit: "contain",
//             height: "20vh",
//             padding: "0 10%",
//           }}
//         />
//       </Grid>
//       <Grid item md={6} style={{ background: "#6ED4FD" }}>
//         <img
//           src={mask}
//           style={{
//             width: "80%",
//             objectFit: "contain",
//             height: "20vh",
//             padding: "0 10%",
//           }}
//         />
//         <h4 style={{ textAlign: "center" }}> Powered By Crypto Hisenberg </h4>
//         <div style={{ marginTop: "6rem" }}>
//           {/* <label style={{margin:"0 3rem 3rem"}}>
//         ID</label> */}
//           <TextField
//             id="outlined-basic"
//             placeholder="Id"
//             variant="outlined"
//             style={{ padding: "0 5% 5% 5%" }}
//             value={id}
//             onChange={e => setId(e.target.value)}
//           />
//         </div>
//         <div>
//           {/* <label  style={{margin:"0 3rem 3rem"}}>
//         Password
//         </label> */}
//           <TextField
//             id="outlined-basic"
//             placeholder="Password"
//             variant="outlined"
//             style={{ padding: "0 5% 5% 5%" }}
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//           />
//         </div>
//         <p
//           style={{
//             textAlign: "end",
//             marginRight: "3rem",
//             cursor: "pointer",
//             color: "red",
//           }}
//         >
//           Forget password?
//         </p>
//         <Button
//           onClick={handleSubmit}
//           variant="contained"
//           style={{ width: "90%", margin: "5%", padding: "1.5%" }}
//         >
//           Login
//         </Button>
//         <p style={{ textAlign: "center" }}>
//           Don’t have an account?{" "}
//           <span onClick={() => navigate("/register")} style={{ color: "red", cursor: "pointer" }}>
//             Register
//           </span>
//         </p>
//       </Grid>
//     </Grid>
//   );
// };
// export default Login;

import React, { useState } from "react";
import "./login.css";

import { Button, Grid, TextField } from "@mui/material";
import textImage from "../../asset/Text.png";
import logo from "../../asset/Agira_Logo.png";
import metamask from "../../asset/metamask.png";
import mask from "../../asset/edited.png";
import { useNavigate } from "react-router-dom";
import { loginVerifySetup } from '../../integration/web3Client';
import { setStudentInfo } from "../../redux/counter/studentSlice";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [id ,setId]= useState();
  const [password ,setPassword]= useState();

  // const register = () => {
  //   navigate("/register");
  // };
  // const dashboard = () => {
  //   navigate("/dashboard");
  // };

// const isWalletConnected = useSelector(walletStatus);
// const { connectNetwork, logout } = NetworkConnection();
// const walletData = useSelector(getWalletData);

const handleSubmit = async () => {
    let verifyLogin = await loginVerifySetup("metamask", id, password);
    console.log("verifyLogin-Data",verifyLogin)

    if (!verifyLogin) {
      setError("Invalid login credentials");
    } else {
      console.log("Enteredddd", { id: id })
      localStorage.setItem("studentId", id.toString());
      navigate("/dashboard");
    }
  }

  return (
    <Grid container style={{ height: "100vh", width: "100%" }}>
      <Grid item md={6} style={{ background: "#ffffff" }}>
      {/* <div className='wallet-logout'>
                  {isWalletConnected ?
                    <>
                      <Button variant="contained" onClick={logout} style={{width:"12%",height:'5%', position:'absolute',top:'1rem',right:'1rem', fontWeight:'600'}}>{walletData?.account.slice(0, 4)}...{walletData?.account.slice(-4)}</Button>
                    </>
                    :
                    <Button variant="contained" onClick={connectNetwork} style={{width:"12%",height:'5%', position:'absolute',top:'1rem',right:'1rem'}}>Connect Wallet</Button>
                  }
        </div> */}
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
            value={id} 
            onChange={e => setId(e.target.value)}
          />
        </div>
        <div>
          {/* <label  style={{margin:"0 3rem 3rem"}}>
        Password
        </label> */}
          <TextField
            id="outlined-basic"
            placeholder="Password"
            type= "password"
            variant="outlined"
            style={{ padding: "0 5% 5% 5%" }}
            value={password} 
            onChange={e => setPassword(e.target.value)}
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
          onClick={handleSubmit}
          variant="contained"
          style={{ width: "90%", margin: "5%", padding: "1.5%" }}
        >
          Login
        </Button>
        <p style={{ textAlign: "center" }}>
          Don’t have an account?{" "}
          <span onClick={() => navigate("/register")} style={{ color: "red", cursor: "pointer" }}>
            Register
          </span>
        </p>
      </Grid>
    </Grid>
  );
};

export default Login;

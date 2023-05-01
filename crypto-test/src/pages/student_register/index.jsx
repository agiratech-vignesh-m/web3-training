import React, { useState } from 'react'
import './reg.css'
import InputAdornment from '@mui/material/InputAdornment';
import {Button,Grid, TextField} from '@mui/material';
import textImage from '../../asset/Text.png'
import logo from '../../asset/ethlogo.png'
import metamask from '../../asset/metamask.png'
import mask from '../../asset/edited.png'
import AutorenewIcon from '@mui/icons-material/Autorenew';
import metafox from '../../asset/MetaMask_Fox.png'
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux';
import { walletStatus, getWalletData } from '../../redux/counter/counterSlice';
import NetworkConnection from '../../helpers/networkConnection';
import { addStudentSetup } from '../../integration/web3Client';

const Register = () => {
  const [num, setNum] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [walletAddress, setWalletAddress] = useState();
  const navigate = useNavigate();
  const isWalletConnected = useSelector(walletStatus);
  const { connectNetwork, logout } = NetworkConnection();
  const walletData = useSelector(getWalletData);
  const [isSubmited, setSubmited] = useState(false);

    const randomNumberInRange = (min, max) => {
       //  get number between min and max
       return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const handleClick = () => {
      setNum(randomNumberInRange(123456, 5456789));
    };

    const handleSubmit = async () => {
      // let userDetails = {firstName: firstName, lastName: lastName, phoneNumber: phoneNumber, email: email, password: password, walletAddress: walletAddress, randomNumber: num};
      // console.log("userDetails", userDetails)
      setSubmited(true);
      let add = await addStudentSetup("metamask", walletData?.account, firstName, lastName, phoneNumber, email, walletAddress, num, password).then(res => {
        // ameBalance();
    }).catch(err => {
        console.log('err', err);
        setSubmited(false);
    })
      navigate("/login")
    }
    // console.log("{num}", {num})
  return (
    
      <Grid container style={{height:"100vh",width:"100%"}}>
        <Grid item md={6} style={{background:"#FFFFFF"}}>
            <img src={textImage} style={{width:"80%",padding:'10% 10% 5% 10%'}}/>
            <img src={logo} style={{width:"80%",objectFit:"contain",height:"50vh",padding:'0 10%'}}/>
            <img src={metamask} style={{width:"80%",objectFit:"contain",height:'20vh',padding:'0 10%'}}/>
        </Grid>
        <Grid item md={6} style={{background:"#6ED4FD"}}>
        
        <div className='wallet-logout'>
                  {isWalletConnected ?
                    <>
                      <Button variant="contained" onClick={logout} style={{width:"12%",height:'5%', position:'absolute',top:'1rem',right:'1rem', fontWeight:'600'}}>{walletData?.account.slice(0, 4)}...{walletData?.account.slice(-4)}</Button>
                    </>
                    :
                    <Button variant="contained" onClick={connectNetwork} style={{width:"12%",height:'5%', position:'absolute',top:'1rem',right:'1rem'}}>Connect Wallet</Button>
                  }
        </div>

        {/* <Button variant="contained" style={{width:"12%",height:'5%', position:'absolute',top:'1rem',right:'1rem', onCLick={}}}>Connect Wallet</Button> */}
        <img src={mask} style={{width:"80%",objectFit:"contain",height:'20vh',padding:'0 10%'}}/>
        <h4 style={{textAlign: "center"}}> Powered By Crypto Hisenberg </h4>
        {/* <form> */}
        <Grid container >
          <Grid item md={6} >
          <TextField id="outlined-basic" placeholder='First Name' variant="outlined" value={firstName} readOnly={isSubmited} onChange={e => setFirstName(e.target.value)} style={{padding:'5%'}}/>
          </Grid>
          <Grid item md={6} >
          <TextField id="outlined-basic" placeholder='Last Name' variant="outlined" value={lastName} readOnly={isSubmited} onChange={e => setLastName(e.target.value)} style={{padding:'5%'}}/>
          </Grid>
          <Grid item md={6} >
          <TextField id="outlined-basic" placeholder='Phone Number' variant="outlined" value={phoneNumber} readOnly={isSubmited} onChange={e => setPhoneNumber(e.target.value)} style={{padding:'5%'}}/>
          </Grid>
          <Grid item md={6} >
          <TextField id="outlined-basic" placeholder='Email ID' variant="outlined" value={email} type="email" readOnly={isSubmited} onChange={e => setEmail(e.target.value)} style={{padding:'5%'}}/>
          </Grid>
          <Grid item md={6} >
          <TextField id="outlined-basic" placeholder='Password' variant="outlined" value={password} readOnly={isSubmited} onChange={e => setPassword(e.target.value)} style={{padding:'5%'}}/>
          </Grid>
          <Grid item md={6} >
          <TextField id="outlined-basic" placeholder='Generate-ID' variant="outlined" value={num} readOnly={isSubmited} onChange={e => setNum(e.target.value)} InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              
              <AutorenewIcon onClick={handleClick} style={{cursor: 'pointer'}}/>
              
            </InputAdornment>
            
          ),
        }}
        style={{padding:'5%'}}>
          </TextField>
          </Grid>
          <Grid item xs={12} >
          <TextField id="outlined-basic" placeholder='Wallet address' variant="outlined"  value={walletAddress} readOnly={isSubmited} onChange={e => setWalletAddress(e.target.value)} InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <img src={metafox}  style = {{height:"2.5rem",objectFit:'contain'}}/>
            </InputAdornment>
          ),
        }}style={{paddingLeft:' 5%'}}/>
          </Grid>
          <Grid item md={12} >
          <Button variant="contained" style={{width:"90%", margin:'5%', padding: '1.5%'}} disabled={isSubmited} onClick={handleSubmit}>Register</Button>
          </Grid>  
        </Grid>
        
        </Grid>
      </Grid>
  )
}
export default Register

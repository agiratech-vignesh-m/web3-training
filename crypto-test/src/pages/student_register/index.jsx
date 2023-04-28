import React from 'react'
import './register.css'

import {Button,Grid, TextField} from '@mui/material';
import textImage from '../../asset/Text.png'
import logo from '../../asset/ethlogo.png'
import metamask from '../../asset/metamask.png'
import mask from '../../asset/edited.png'

const Login = () => {
  return (

      <Grid container style={{height:"100vh",width:"100%"}}>
        <Grid item md={6} style={{background:"#ffffff"}}>
            <img src={textImage} style={{width:"80%",padding:'10% 10% 5% 10%'}}/>
            <img src={logo} style={{width:"80%",objectFit:"contain",height:"50vh",padding:'0 10%'}}/>
            <img src={metamask} style={{width:"80%",objectFit:"contain",height:'20vh',padding:'0 10%'}}/>
        </Grid>

        <Grid item md={6} style={{background:"#6ED4FD"}}>

        <img src={mask} style={{width:"80%",objectFit:"contain",height:'20vh',padding:'0 10%'}}/>
        <h4 style={{textAlign: "center"}}> Powered By Crypto Hisenberg </h4>
        <Button variant="contained" style={{width:"90%", margin:'5%', padding: '1.5%'}}>Register</Button>
        </Grid>

      </Grid>

  )
}

export default Login
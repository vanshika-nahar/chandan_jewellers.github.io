import React, { useEffect } from "react";
import { TextField,Grid,Button, useTheme, useMediaQuery } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";
import CoPresentIcon from '@mui/icons-material/CoPresent';
import { BoltRounded } from "@mui/icons-material";
import OtpComponent from "./OtpComponent";
import OtpGenerator from "./OtpGenerator";
import { hover } from "@testing-library/user-event/dist/hover";
import { postData } from "../../Services/NodeServices";
import Swal from "sweetalert2";
import {Divider} from "@mui/material";
import { useContext } from 'react';
import { SessionContext } from "../../Services/SessionContext";
import FaceIcon from '@mui/icons-material/Face';


export default function UserComponentpannel(){
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down(900));
  const { session,setSession } = useContext(SessionContext);
  const Token=window.localStorage.getItem("Token")
  const icon = Token?'FaceIcon':'CoPresentIcon'
  const[open,setopen]=useState();
  const [openOtp, setOpenOtp] = useState(false);
  const [otp,setOtp]=useState()
  const [mobileNumber,setMobileNumber]=useState('')
  const [message,setMessage]=useState('')
  const handleOpen=()=>{
    setopen(true)
  }
  
  const handleClose=()=>{
    setopen(false)
  }


  const hadleopenotpdailog=()=>{
    setopen(false)
 setOpenOtp(true)
 
 var otpval=OtpGenerator()
 setOtp(otpval)
 alert(otpval)
    
  }
  const handleotpdailogClose=()=>{
    setOpenOtp(false)
  }
const ShowSignUpDailog=()=>{
    return(
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
   
          <Grid item xs={12}>
            <img src='first.jpg'  width='100%' height='100%'/>

          </Grid>
          <Grid xs={12} style={{fontSize:20,fontWeight:'bold'}}>
        
           SignUP
      
          </Grid>
          <Grid  item xs={12} >
           <hr></hr>
          <TextField  onChange={(event)=>setMobileNumber(event.target.value)} fullWidth id="standard-basic" label=" your mobile no" variant="standard" type='number' />
          </Grid>

          <Grid item xs={12} style={{marginTop:'5%'}}>
          <Button onClick={hadleopenotpdailog} variant="contained" fullWidth  style={{backgroundColor:'green',color:'white' }}>GET AN OTP</Button>
          </Grid>
          <Grid item xs={12} style={{ fontSize:15,fontWeight:'bold',marginTop:'4%',cursor:'pointer'}}>
           Already have an account..? 
          </Grid>

         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          
        </DialogActions>
      </Dialog>
    )
   
}



const chkOtp=async(value)=>{
  if(otp==value)
  {
    setOpenOtp(false)
    var formdata = new FormData();
    formdata.append("mobile", mobileNumber);
   

    var response = await postData("users/addusers", formdata, true);
    if(response.result==true || response.result=='exist')
    { 
      window.localStorage.setItem("Token",true)
      setSession(true)
      console.log(response.mobileNumber)
      window.localStorage.setItem("UserNumber",response.mobileNumber)
      Swal.fire({
      icon: 'success',
      title: 'successfully Log In',
     
    })

    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Try Again',
      
      })

    }
    
    
  }
  else
  {
   setMessage('Invalid Otp')
  }
}


const ShowOtpDailog=()=>{
  return (
    <div >
      
      <Dialog
        open={openOtp}
        keepMounted
        onClose={handleotpdailogClose}
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle >
        <div >
        Confirm your number
        </div>
        </DialogTitle>
        <Divider/>
        <DialogContent>
          <DialogContentText >
            <div >
            Enter the code we have sent via SMS to +91{mobileNumber}
            </div>
            </DialogContentText>
            <Grid container spacing={2}>
        <Grid item xs={12}>
          <OtpComponent value="" onChange={(value)=>{chkOtp(value)}}/>
        </Grid>
        <Grid item xs={12}>
          <div >
            Haven't recieved a code? More Options
        </div>
        </Grid>
        <Grid item xs={12}>
          <div >
           {message}
        </div>
        </Grid>
      
        </Grid>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleotpdailogClose}>Close</Button>
          
        </DialogActions>
      </Dialog>
    </div>
  );}

    return(
           <div>
      {Token?<FaceIcon   sx={{  cursor: "pointer", color: "#bd147c", fontSize:matches?20: 35}} />:
      <CoPresentIcon  sx={{  cursor: "pointer", color: "#bd147c", fontSize:matches?20: 35}} onClick={handleOpen}  />
      }      <div>
            {ShowSignUpDailog()}
            {ShowOtpDailog()}
           </div>
           </div>
    )
   
}
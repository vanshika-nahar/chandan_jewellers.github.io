import React from "react";
import { Grid, TextField ,Button} from "@mui/material";
import { color, fontWeight } from "@mui/system";
import SearchBar from "./SearchBar";
import MainBar from "./MainBar";
import DownBox from "./DownBox"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ImageSlider from "./ImageSlider";
import { useLocation } from "react-router";
import { serverURL } from "../../Services/NodeServices";
import { useDispatch,useSelector } from "react-redux";
import { useContext } from 'react';
import { SessionContext } from "../../Services/SessionContext";
import { postData } from "../../Services/NodeServices";
import { useEffect } from "react";
import { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Swal from "sweetalert2";
import OtpComponent from "./OtpComponent";
import OtpGenerator from "./OtpGenerator";
import { Divider } from "@material-ui/core";
import { useNavigate } from "react-router";

export default function SetProductDetails(props)
{     const { cart,setCart } = useContext(SessionContext);
    var dispatch = useDispatch()
    var navigate= useNavigate()
    const Token=window.localStorage.getItem("Token")
    const User=window.localStorage.getItem("UserNumber")
    var location=useLocation()
    var product= location.state.product 
    
    const[open,setopen]=useState();
    const [openOtp, setOpenOtp] = useState(false);
    const [button, setButton] = useState(false);
    const [otp,setOtp]=useState()
    const [mobileNumber,setMobileNumber]=useState('')
    const [message,setMessage]=useState('')
    const [reload, setReload] = useState(false);
    
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
        console.log(response.mobileNumber)
        window.localStorage.setItem("UserNumber",response.mobileNumber)
        Swal.fire({
        icon: 'success',
        title: 'successfully Log In',
       
      })
      window.location.reload()
  
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
  
    const func=async()=>{
      var formdata = new FormData();
      formdata.append("mobile", User);
      var response = await postData("cart/getAllProducts", formdata, true);
      
      setCart(response.products.length)
      const isProductInCart = response.products.some(products => products.productId==product._id);
     alert(isProductInCart)
      if (isProductInCart) {
        alert("Value is present in array");
        setButton(true)
      } else {
        console.log("Value is not present in array");
      }
      
      
     }
    const handleShadow=async()=>{

      if(Token)
      {
        var formdata = new FormData();
        formdata.append("mobile", User);
        formdata.append("productId", product._id);
        formdata.append("count", 1);
          var response = await postData("cart/add", formdata, true);
          if(response.result==true)
          {
            window.location.reload()
            func()
           
          }
      }
      else
      {
            handleOpen()
      }
    }
    useEffect(()=>{
       func()
    },[])
   

const showDetails=()=>{
    return(
           <Grid container>
            <Grid  item xs={6}  style={{marginTop:'1%',justifyContent:'center',alignItems:'center'}}>
                <ImageSlider pictures={product.picture}/>
                
            </Grid>
            <Grid item xs={6} >
              <Grid style={{fontSize:28,fontWeight:'bold',marginTop:7}}>
                   {product.productname}
              </Grid>
              <Grid style={{fontSize:20,fontWeight:'bold',marginTop:'3%',textDecoration:'line-through',color:"red"}}>
                  PRICE : {product.price}
              </Grid>
              <Grid style={{fontSize:20,fontWeight:'bold',marginTop:'3%',color:'green'}}>
                  Offer PRICE : {product.offerprice}
              </Grid>
              <Grid>
                inclusive of all Taxes + Free Shipping
              </Grid>
              <Grid container style={{marginTop:'3%'}}>
              <Grid item xs={6} style={{fontSize:21}}>
                SIZE
              </Grid>
              <Grid item xs={6}  style={{fontSize:23,color:'green'}}>
             SIZE CHART
              </Grid>
              </Grid>
              <Grid style={{marginTop:'2%'}}>
                Qty :
               
              </Grid>
              <Grid container style={{marginTop:'2%'}} >
                <Grid item xs={5} >
                {button?<Button  style={{backgroundColor:'#12CBC4'}} variant="contained" fullWidth onClick={()=>navigate('/cart')}>Go To Cart</Button>
                :<Button  style={{backgroundColor:'#12CBC4'}} variant="contained" fullWidth onClick={()=>handleShadow()}>ADD To Cart</Button>}
                </Grid>
                <Grid item xs={1}>

                </Grid>
                
                <Grid item xs={5} >
                <Button  style={{backgroundColor:'#ea8685'}} variant="contained" fullWidth>BUY NOW</Button>
                </Grid>
              </Grid>
              <Grid item xs={11}  style={{marginTop:'2%'}}>
                <Button  style={{backgroundColor:'#12CBC4'}} variant="contained" fullWidth>CUSTOMIZE IT</Button>
            </Grid>
            <Grid>
                <h3>DELIVERY OPTIONS</h3>
               <Grid style={{border:'1px solid black',padding:3}}>
                    Enter your Pincode TO check the delivery time and free pick up options
                <div>
                    <input type="text" placeholder="Enter Pincode"/>
                  </div>
                  <div style={{marginTop:"1%", fontWeight:'bolder'}}>
                    Cash On Delivery
                  </div>
                  <div style={{marginTop:"1%", fontWeight:'bolder'}}>
                    Express Shipping
                  </div>
               </Grid>
            </Grid>
            </Grid>
        </Grid>
    );
}



   const showproductDetail=()=>{
    return(<div>
            <div style={{marginTop:'5%', justifyContent:'center',textAlign:'center'}}>
        <div style={{fontSize:30,fontWeight:700,marginBottom:40,display:'flex',textAlign:'center',justifyContent:'center'}}>                                    Product Details</div>
        </div>
        <Grid style={{display:'flex',alignItem:'center',justifyContent:'center'}} container spacing={2}>
        <div style={{padding:25,}}>
            
        <Grid item xs={3}>
            <div style={{background:'#f5f5f5',width:300,height:300,padding:25,}}>
            <div style={{fontWeight:700,lineHeight:'35px',display:'flex',textAlign:'center',marginBottom:20}}>Product Highlights</div>
            <div>
            <table>
                <tr>
                    <th>Fabric:</th>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;NS Crush Lycra</td>
                </tr>
                <tr>
                    <th>Collar Type:</th>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;Mock Collar</td>
                </tr>
                <tr>
                    <th>Pattern:</th>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;Solid</td>
                </tr>
                <tr>
                    <th>Fit:</th>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;Regular-fit</td>
                </tr>
                <tr>
                    <th>Pocket:</th>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;2 Side Pockets</td>
                </tr>
                <tr>
                    <th>Purpose: </th>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;Moderate Winter</td>
                </tr>
            </table>
            </div>
            </div>
            
        </Grid>
        </div>
        <div style={{padding:25,}}>
        <Grid item xs={3}>
        <div style={{background:'#f5f5f5',padding:25,width:300,height:300}}>
        <div style={{fontWeight:700,lineHeight:'35px',display:'flex',textAlign:'center'}}>Product Description</div>
         <ul type="disc">
            <li>95% Nylon, 5% Lycra - durable fabric & resists you from the extreme cold winds</li>
            <li>Side Pockets - you can actually use to warm your hands & keeping the essentials</li>
            <li>Interior Hem Drawcord - fully adjustable lower hem to prevent from cold</li>
            <li>Elasticated Cuffs - can be pulled-up to assist in keeping heat from escaping</li>  
        </ul>
        </div>
        </Grid>
        </div>
        <div style={{padding:25,}}>
        <Grid item xs={3}>  
        <div style={{background:'#f5f5f5',padding:25,width:300,height:300}}>
        <div style={{fontWeight:700,lineHeight:'35px',display:'flex',textAlign:'center'}}>Delivery & Return Policy</div>  
        We provide free shipping on all orders. Pay online to avoid charges of ₹50/product applicable
         on COD orders. The return or exchange can be done within 15 days after delivery. Every delivery
          from Beyoung is processed under excellent condition and in the fastest time possible. For our 
          beloved customer’s care, we give contactless delivery. Refer to FAQ for more information.
          </div>
        </Grid>
        </div>

        
        </Grid>
           
       
    </div>
        
    );
   }
     return(<div>
        <SearchBar/>
        <div>
        <MainBar/>
        </div>
        <div>
        {showDetails()}
        </div>
        <div style={{marginTop:'5%'}}>
        {showproductDetail()}
        </div>
       
        <DownBox/>
        <div>
        {ShowSignUpDailog()}
            {ShowOtpDailog()}</div>
        
    </div>)
}
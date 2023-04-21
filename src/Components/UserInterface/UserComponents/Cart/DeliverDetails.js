import React, { useState } from 'react';
import { Grid, Typography, TextField, Button, Box,Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import SearchBar from './SearchBar';
import MainBar from './MainBar';
import DownBox from './DownBox';
import { useLocation } from 'react-router';

const useStyles = makeStyles({
    a: {
        color: "#bd147c",
        fontWeight: 700,
    },
    loginText: {
        letterSpacing: 1,
        wordSpacing: 2,
    },
    boxRow: {
        display: "flex",
        flexDirection: "row",
    },
});

export default function DeliverDetails(props) {
    const classes = useStyles();
    const location = useLocation()

    const User=window.localStorage.getItem("UserNumber")
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const matches1 = useMediaQuery(theme.breakpoints.down(480));
    const [name,setName]=useState('')
    const [address,setAddress]=useState('')
    const [pincode,setPincode]=useState('')
    const [city,setCity]=useState('')
    const [district,setDistrict]=useState('')
    const [state,setState]=useState('')
    const [number,setNumber]=useState(User)
    

    const item = {
        id: "43287ghy32te7234",
        productname: "Silver Diamond Necklace",
        price: "84000",
        offerprice: "72000",
        picture: "diamondnecklace1.png",
        quantity: 1
    }

    const handleOrderSummary = () => {
        return (
            <Box style={{ marginLeft: 20 }}>
                <Paper
                    elevation={1}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        flexWrap: "wrap",
                        width: matches?"80%":matches1 ? "100%" : "90%",
                        padding: matches1 ? 1 : 5,
                        borderRadius: matches1 ? 1 : 2,
                        backgroundColor: "#f2f2f2",
                    }}
                >
                    <Typography
                        style={{
                            color: "#7d0a0a",
                            fontSize: matches1 ? 16 : 24,
                        }}
                    >
                        ORDER SUMMARY
                    </Typography>
                    <Box
                        style={{
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                        className={classes.boxRow}
                    >
                        <Typography sx={{ fontSize: matches1 ? 10 : 20,color:'red' }}>
                            Sub total
                        </Typography>
                        <Typography sx={{ fontSize: matches1 ? 10 : 20,color:'red' }}>
                            ₹{location.state.subTotal}
                        </Typography>
                    </Box>
                    <Box
                        style={{
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                        className={classes.boxRow}
                    >
                        <Typography sx={{ fontSize: matches1 ? 10 : 20,color:'green' }}>
                             Discount
                        </Typography>
                        <Typography sx={{ fontSize: matches1 ? 10 : 20,color:'green' }}>
                            - ₹{location.state.discount}
                        </Typography>
                    </Box>
                    <Box
                        style={{
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                        className={classes.boxRow}
                    >
                        <Typography sx={{ fontSize: matches1 ? 10 : 20 }}>
                            Delivery Charges
                        </Typography>
                        <Typography sx={{ fontSize: matches1 ? 10 : 20 }}>FREE</Typography>
                    </Box>
                    <Box
                        style={{
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: 10,
                        }}
                        className={classes.boxRow}
                    >
                        <Typography
                            style={{
                                color: "black",
                                fontSize: matches1 ? 14 : 20,
                                fontWeight: 600,
                            }}
                        >
                            Total (incl of all taxes)
                        </Typography>
                        <Typography
                            style={{
                                color: "black",
                                fontSize: matches1 ? 14 : 20,
                                fontWeight: 600,
                            }}
                        >
                           ₹{location.state.totalPrice}{" "}
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        );
    };

   const addressFields=()=>{ 
    return (
        <div style={{marginTop:15}}>
            <Typography sx={{
                color: "#7d0a0a",
                fontWeight:"bold",
                fontSize: matches1 ? 26 : 30,
                textAlign: "center",
                marginBottom: matches ? 2 : matches1 ? 2 : 8,
                marginLeft: matches ? 0 : matches1 ? 1 : 0
            }}>
                DELIVERY CHARGES
            </Typography>
            <Grid sx={{ my: matches1?1:5,display:'flex',justifyContent:'center' }} container spacing={2}>
                <Grid item xs={11} md={11} lg={6}>
                    <Grid sx={{ marginLeft: matches1 ? 0 : 1 }} container spacing={2}>
                        <Grid item xs={12} lg={6}>
                            <TextField label={"Enter Name"} value={name} onChange={(e)=>setName(e.target.value)} fullWidth />
                        </Grid>
                       
                         <Grid item xs={12} lg={6}>
                            <TextField label={"Address"} value={address} onChange={(e)=>setAddress(e.target.value)} fullWidth />
                        </Grid>
                        <Grid item xs={6} lg={4}>
                            <TextField label={"Pincode"} value={pincode} onChange={(e)=>setPincode(e.target.value)} fullWidth />
                        </Grid>
                        <Grid item xs={6} lg={4}>
                            <TextField label={"City"} value={city} onChange={(e)=>setCity(e.target.value)} fullWidth />
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <TextField label={"District"} value={district} onChange={(e)=>setDistrict(e.target.value)} fullWidth />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <TextField value={state} onChange={(e)=>setState(e.target.value)} label={"State"} fullWidth />
                        </Grid>
                        <Grid item xs={9} lg={6}>
                            <TextField value={number} onChange={(e)=>setNumber(e.target.value)} label={"Recipient's Number"} fullWidth />
                        </Grid>
                        <Grid item xs={12}  >
                            <Button
                                fullWidth
                                style={{
                                    backgroundColor: "#7d0a0a",
                                    color: "#ffffff",
                                    fontSize: matches1 ? 14 : 15,
                                    padding: "10px 0px"
                                }}
                            >
                                Proceed To Payment
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid sx={{ marginLeft: matches?0:matches1 ? -0.5 : 5 }} item xs={11} md={11} lg={5}>
                    {handleOrderSummary()}
                </Grid>
            </Grid>
        </div>)
   }



   return (
    <>
     <SearchBar/>
     <MainBar/>
      <Grid container spacing={2}>
       
        <Grid item xs={12}>
          <Grid container spacing={2} style={{marginTop:2}}>
            <Grid item xs={12} lg={12} style={{ padding: 20,display:'flex',justifyContent:'center' }}>
              {addressFields()}
            </Grid>
           
          </Grid>
        </Grid>
      </Grid>
      <div
                style={{
                    marginTop: 50,
                    background: '#ff94ca',
                }}
            >
                <Container maxWidth={"xl"}>
                    <DownBox />
                </Container>
            </div>
    </>
  );
    
}

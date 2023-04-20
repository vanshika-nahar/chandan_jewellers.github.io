import { Grid, Typography, TextField, Button, Box,Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import React, { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import SearchBar from "./SearchBar";
import MainBar from "./MainBar";
import DownBox from "./DownBox";
import { postData } from "../../Services/NodeServices";
import { serverURL } from "../../Services/NodeServices";
import { useNavigate } from "react-router";
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

export default function CartPage() {
  const classes = useStyles();
  const navigate= useNavigate()
  const [cartProducts,setCartProducts]= useState([])
  const [products,setProducts]= useState([])
  const [subTotal,setSubTotal]= useState(0)
  const [discountPrice,setDiscountPrice]= useState(0)
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const matches1 = useMediaQuery(theme.breakpoints.down(480));
  const Token=window.localStorage.getItem("Token")
  const User=window.localStorage.getItem("UserNumber")
  const func=async(User)=>{
    var formdata = new FormData();
    formdata.append("mobile", User);
    var response = await postData("cart/getAllProducts", formdata, true);
  setCartProducts(response.products)
  console.log(response.products)
 
    
   }


   React.useEffect(()=>{
    func(User)
 },[])

 const fetchProductById=async(item)=>{
  const formData = new FormData();
  formData.append("productId", item);
  const response = await postData("products/getproductbyid", formData, true);
  return response.product;
}
 React.useEffect(() => {
  const fetchProducts = async () => {
    const productData = await Promise.all(
      cartProducts.map((item) => fetchProductById(item.productId))
    );
    setProducts(productData);
    console.log(productData)
    var price=0
    var discount=0
    productData.map((item)=>{
      return cartProducts.map((items)=>{
        if(item._id==items.productId)
        {
        var subTotal=item.price*items.count
        var discountPrice=(item.price-item.offerprice)*items.count
        return discount=discount+discountPrice,price=price+subTotal  
        }
      })

    })
    setSubTotal(price)
    setDiscountPrice(discount)
  };
  fetchProducts();
}, [cartProducts]);



const handleDelete=async(id)=>{
  const formData = new FormData();
  formData.append("mobile", User);
  formData.append("productId", id);
  const response = await postData("cart/remove", formData, true);
  window.location.reload()

}

const handleAdd=async(item)=>{
  var count
  cartProducts.map((items)=>{
    if(item._id==items.productId)
    {
     count=items.count+1
    }
    
  })
  const formData = new FormData();
  formData.append("mobile", User);
    formData.append("productId",item._id);
    formData.append("count",count);
    const response = await postData("cart/update-count", formData, true);
    window.location.reload()
}
const handleRemove=async(item)=>{
  var count
  cartProducts.map((items)=>{
    if(item._id==items.productId)
    {
     count=items.count-1
    }
    
  })
  const formData = new FormData();
  formData.append("mobile", User);
    formData.append("productId",item._id);
    formData.append("count",count);
    const response = await postData("cart/update-count", formData, true);
    window.location.reload()
}

  const handleProduct = (item) => {
   
    return products.map((item)=>{
      
     
return (

      <Box style={{ marginLeft: 5 }}>
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            width: matches1 ? "81%" : "90%",
            padding: 5,
          }}
        >
          <Grid
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <img
             src={`${serverURL}/images/${item.picture[0]}`}
              style={{
                backgroundColor: "hotpink",
                // height: matches1 ? "50%" : "75%",
                width: matches1 ? "40%" : "25%",
              }}
            />
            <Grid style={{ marginLeft: matches1 ? 15 : 30 }}>
              <Grid style={{ display:"flex",flexDirection:"row"}}>
                <Typography
                  sx={{
                    color:"#7d0a0a",
                    fontSize: matches1 ? 18 : 30,
                    margin: matches1 ? "0px 0px 5px" : "0px 15px",
                    textAlign: "left",
                  }}
                >
                  {item.productname}{" "}
                </Typography>
                <DeleteOutlineIcon id="icon" onClick={()=>{handleDelete(item._id)}} variant={ "filled"} sx={{ fontSize: 30,marginLeft:matches1?"85px":60 }} />
              </Grid>
              <Typography
                style={{
                  color: "lightgrey",
                  fontSize: matches1 ? 12 : 20,
                  margin: matches1 ? "0px 5px" : "0px 15px",
                  textAlign: "left",
                }}
              >
                {item._id}{" "}
              </Typography>
              <Box
                style={{
                  display: "flex",
                  flexDirection: matches1 ? "row" : "column",
                  textAlign: "left",
                }}
              >
                <Typography
                  style={{
                    fontSize: matches1 ? 18 : 26,
                    marginLeft: matches1 ? 0 : 20,
                    fontWeight: 600,
                    textAlign: "left",
                  }}
                >
                  ₹&nbsp;{item.offerprice}{" "}
                </Typography>
                <Typography
                  style={{
                    fontSize: matches1 ? 14 : 20,
                    fontWeight: 600,
                    color: "#808080",
                    marginTop: matches1 ? 2 : 0,
                    marginLeft: matches1 ? 10 : 20,
                    textAlign: "left",
                  }}
                >
                  <s>₹&nbsp;{item.price}</s>
                </Typography>
              </Box>
              <Box
                style={{
                  marginTop: matches1 ? 0 : 10,
                  marginLeft: matches1 ? 0 : 15,
                }}
                className={classes.boxRow}
              >
                <Box className={classes.boxRow}>
                  <AddCircleIcon
                  onClick={()=>handleAdd(item)}
                    style={{
                      fontSize: matches1 ? 20 : 30,
                      color:"#7d0a0a",
                      margin: 2,
                      marginRight: 10,
                    }}
                  />
                  <Typography
                    style={{
                      fontSize: matches1 ? 18 : 24,
                      color: "#000000",
                    }}
                  >
                    {cartProducts.map((items)=>{
                      if(item._id==items.productId)
                      {
                        return items.count
                      }
                    })}
                  </Typography>
                  <RemoveCircleIcon
                    onClick={()=>handleRemove(item)}
                    style={{
                      fontSize: matches1 ? 20 : 30,
                      color:"#7d0a0a",
                      margin: 2,
                      marginLeft: 10,
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    );
    }) 
  };

  const handleOrderSummary = () => {
    return (
      <Box style={{ marginLeft: 10 }}>
        <Paper
          elevation={1}
          sx={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            padding: matches1 ? 1 : 5,
            borderRadius: matches1 ? 1 : 2,
            backgroundColor: "#f2f2f2",
          }}
        >
        
          <Typography
            style={{
              color: "red",
              fontSize: matches1 ? 16 : 24,
              color:"#7d0a0a"
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
            <Typography  style={{
                color: "red",
                fontSize: matches1 ? 14 : 20,
                fontWeight: 600,
              }}>
              Sub total
            </Typography>
            <Typography  style={{
                color: "red",
                fontSize: matches1 ? 14 : 20,
                fontWeight: 600,
              }}>
            ₹{subTotal}
            </Typography>
          </Box>
          <Box
            style={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
            className={classes.boxRow}
          >
            <Typography  style={{
                color: "green",
                fontSize: matches1 ? 14 : 20,
                fontWeight: 600,
              }}>
             Discount
            </Typography>
            <Typography  style={{
                color: "green",
                fontSize: matches1 ? 14 : 20,
                fontWeight: 600,
              }}>
               - ₹{discountPrice}
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
                color: "",
                fontSize: matches1 ? 14 : 20,
                fontWeight: 600,
              }}
            >
              Total (incl of all taxes)
            </Typography>
            <Typography
              style={{
                color: "",
                fontSize: matches1 ? 14 : 20,
                fontWeight: 600
              }}
            >
              ₹{subTotal-discountPrice}{" "}
            </Typography>
          </Box>
          <Grid
            container
            spacing={2}
            style={{ marginTop: 2, marginBottom: matches1 ? 10 : 5 }}
          >
            <Grid item xs={6}>
              <Button
                variant="outlined"
                fullWidth
                style={{
                  color: "#7d0a0a",
                  border: "2px solid #7d0a0a",
                  fontSize: matches1 ? 8 : 11,
                }}
              >
                Continue to Shopping
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
              onClick={()=>navigate('/details',{state:{products:cartProducts,discount:discountPrice,subTotal:subTotal,totalPrice:subTotal-discountPrice}})}
                fullWidth
                style={{
                  backgroundColor: "#7d0a0a",
                  color: "#ffffff",
                  fontSize: matches1 ? 8 : 12,
                }}
              >
                Proceed to Checkout
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    );
  };

  return (
    <Box sx={{height:"100vh"}}>
     <SearchBar/>
     <MainBar/>
     <Container maxWidth={"xl"}>
      <Grid container spacing={2}>
       
        <Grid item xs={12}>
          <Grid container spacing={2} style={{marginTop:2}}>
            <Grid item xs={12} lg={8} style={{ padding: 20 }}>
              {handleProduct(cartProducts)}
            </Grid>
            <Grid item xs={12} lg={4} style={{ padding: 20 }}>
              {handleOrderSummary()}{" "}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      </Container>
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
    </Box>
  );
}

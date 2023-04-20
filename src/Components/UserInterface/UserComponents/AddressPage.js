import React from 'react';
import { Grid, Typography, TextField, Button, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

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

export default function AddressPage() {
    const classes = useStyles();

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const matches1 = useMediaQuery(theme.breakpoints.down(480));
    const product = [{
        id: "3367DSAJHGDH5435BB",
        productname: "Gold Diamond Ring",
        price: "34000",
        offerprice: "20000",
        picture: "diamondnecklace1.png",
        quantity:2
    },
    {
        id: "43287ghy32te7234",
        productname: "Silver Diamond Necklace",
        price: "84000",
        offerprice: "72000",
        picture: "diamondnecklace1.png",
        quantity:1
    }]

    const address={
        recipientsname:"Anuj Vishwakarma",
        address:"Anand Nagar",
        city:"Gwalior",
        district:"GWALIOR",
        pincode:"401198",
        state:"Madhya Pradesh"
    }

    const handleProduct = () => {
        return product.map((item) => {
            return (
                <Box style={{ marginLeft: matches?120:matches1?18:5, marginTop: 8 }}>
                    <Paper
                        elevation={3}
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            width: matches1 ? "80%" : "90%",
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
                                src=""
                                style={{
                                    backgroundColor: "hotpink",
                                    width: matches1 ? "40%" : "25%",
                                }}
                            />
                            <Grid style={{ marginLeft: matches1 ? 15 : 30 }}>
                                <Grid style={{ display: "flex", flexDirection: "row" }}>
                                    <Typography
                                        sx={{
                                            color: "hotpink",
                                            fontSize: matches1 ? 14 : 26,
                                            margin: matches1 ? "0px 0px 5px" : "0px 15px",
                                            textAlign: "left",
                                        }}
                                    >
                                        {item.productname}{" "}
                                    </Typography>
                                </Grid>
                                <Typography
                                    style={{
                                        color: "lightgrey",
                                        fontSize: matches1 ? 10 : 16,
                                        margin: matches1 ? "0px 0px" : "0px 15px",
                                        textAlign: "left",
                                    }}
                                >
                                    {item.id}{" "}
                                </Typography>
                                <Box
                                    style={{
                                        display: "flex",
                                        flexDirection:"column",
                                        textAlign: "left",
                                    }}
                                >
                                    <Box
                                        style={{
                                            display: "flex",
                                            flexDirection:"column",
                                            textAlign: "left",
                                        }}
                                    >

                                        <Typography
                                            style={{
                                                fontSize: matches1 ? 12 : 20,
                                                fontWeight: 600,
                                                color: "#808080",
                                                marginTop: matches1 ? 5 : 0,
                                                marginLeft: matches1 ? 10 : 20,
                                                textAlign: "left",
                                            }}
                                        >
                                            <s>₹&nbsp;{item.price}</s>
                                        </Typography>
                                        <Typography
                                            style={{
                                                fontSize: matches1 ? 16 : 26,
                                                marginLeft: matches1 ? 0 : 20,
                                                fontWeight: 600,
                                                textAlign: "left",
                                            }}
                                        >
                                            ₹&nbsp;{item.offerprice}{" "}
                                        </Typography>
                                    </Box>
                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        style={{
                                            color: "hotpink",
                                            border: "1px solid hotpink",
                                            fontSize: matches1 ? 8 : 11,
                                        }}
                                    >
                                        Quantity:{item.quantity}
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            );
        });
    };

    const handleOrderSummary = () => {
        return (
            <Box style={{ marginLeft: matches?120:matches1?18:10 }}>
                <Paper
                    elevation={1}
                    sx={{
                        display: "flex",
                        width:"99%",
                        flexDirection: "column",
                        flexWrap: "wrap",
                        padding: matches1 ? 1 : 5,
                        borderRadius: matches1 ? 1 : 2,
                        backgroundColor: "#f2f2f2",
                    }}
                >
                    <Typography
                        style={{
                            color: "hotpink",
                            fontSize: matches1 ? 14 : 18,
                            textAlign: "left",
                        }}
                    >
                        Recipient's Name
                    </Typography>
                    <Typography
                        style={{
                            color: "#000000",
                            fontSize: matches1 ? 14 : 18,
                            textAlign: "left"
                        }}
                    >
                        {address.recipientsname}
                    </Typography>
                    <Typography
                        style={{
                            color: "hotpink",
                            fontSize: matches1 ? 14 : 18,
                            textAlign: "left"
                        }}
                    >
                        Recipient's Address
                    </Typography>
                    <Typography
                        style={{
                            color: "#000000",
                            fontSize: matches1 ? 14 : 18,
                            textAlign: "left"
                        }}
                    >
                        {address.address},&nbsp;
                        {address.city}
                    </Typography>
                    <Typography
                        style={{
                            color: "#000000",
                            fontSize: matches1 ? 14 : 18,
                            textAlign: "left",
                            marginBottom: matches1 ? 10 : 22
                        }}
                    >
                        {address.district}-{address.pincode},&nbsp;{address.state}
                    </Typography>
                    <Typography
                        style={{
                            color: "red",
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
                        <Typography sx={{ fontSize: matches1 ? 10 : 20 }}>
                            Sub total
                        </Typography>
                        <Typography sx={{ fontSize: matches1 ? 10 : 20 }}>
                        ₹&nbsp;92000
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
                            Coupon Discount
                        </Typography>
                        <Typography sx={{ fontSize: matches1 ? 10 : 20 }}>
                            ₹&nbsp;3463
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
                                color: "red",
                                fontSize: matches1 ? 14 : 20,
                                fontWeight: 600,
                            }}
                        >
                            Total (incl of all taxes)
                        </Typography>
                        <Typography
                            style={{
                                color: "red",
                                fontSize: matches1 ? 14 : 20,
                                fontWeight: 600,
                            }}
                        >
                            ₹&nbsp;92000
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        );
    };
    return (
        <div>
            <Grid sx={{ my: 10 }} container spacing={2}>
                <Grid item xs={11} md={11} lg={6}>
                    {handleProduct()}
                </Grid>
                <Grid item xs={11} md={11} lg={6}>
                    {handleOrderSummary()}
                </Grid>
            </Grid>
        </div>
    );
}
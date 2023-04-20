import { Key } from "@mui/icons-material";
import React from "react";
import { useEffect, useState } from "react";
import { serverURL } from "../../Services/NodeServices";
import { Grid, TextField, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ColorButton = styled(Button)(({ theme }) => ({
    color: "black",
    "&:hover": {
        backgroundColor: "#D24A61",
        color: "white",
    },
}));
export function ShopByCategoryResponsive(props) {
    const theme = useTheme();
    const matches1 = useMediaQuery(theme.breakpoints.down(900));
    const settings = {
        dots: true,
        slidesToShow: 2,
        slidesToScroll: 2,
    };
    const card = () => {
        return props.data.map((items) => {
            return (
                <Grid style={{ display: "flex", flexWrap: "wrap" }}>
                    <Grid style={{ width:"90%", height: 100, margin: 2, marginTop: 5 }}>
                        <Grid xs={10} md={2.5} style={{ marginTop: 5 }}>
                            <Card
                                sx={{
                                    maxWidth: 345,
                                    borderStyle: "solid",
                                    border: 1,
                                    height:180,
                                    minHeight: 100,
                                }}
                            >
                                <CardMedia
                                    sx={{ height: 120, width: "100%" }}
                                    image={`${serverURL}/images/${items.icon}`}
                                    title="green iguana"
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        textAlign="center"
                                        sx={{ fontSize: 8,color:"#7d0a0a",fontWeight:"medium",marginTop:-1.2 }}
                                    >
                                        {items.categoryname}
                                    </Typography>
                                </CardContent>
                                <CardActions
                                    style={{ display: "flex", justifyContent: "center" }}
                                >
                                    <Button variant="filled"
                                    sx={{
                                        background: "#7d0a0a",
                                        fontSize: 6,
                                        color: "#ffffff",
                                        border:"1px solid #7d0a0a",
                                        width:140,
                                        "&:hover": {
                                            backgroundColor: "#ffffff",
                                            color:"#7d0a0a"
                                        },
                                        marginTop:-3,
                                        padding:0.4
                                    }}>Shop Now</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            );
        });
    };

    return (
        <Grid>
            <Slider {...settings}>{card()}</Slider>
        </Grid>
    );
}

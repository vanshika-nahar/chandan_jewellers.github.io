import { Key } from "@mui/icons-material";
import React from "react";
import { useEffect, useState } from "react";
import { serverURL } from "../../Services/NodeServices";
import { ButtonBase, Grid, TextField, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const ColorButton = styled(Button)(({ theme }) => ({
    color: "black",
    "&:hover": {
        backgroundColor: "#D24A61",
        color: "white",
    },
}));
export function ShopByCategory(props) {
    const cardComponent = () => {
        return props.data.map((items) => {
            return (
                <Grid style={{ width: "15%", height: 300, margin: 10, marginTop: 5 }}>
                    <Grid xs={10} md={2.5} style={{ marginTop: 5 }}>
                        <Card
                            sx={{
                                maxWidth: 345,
                                border: "none",
                                minHeight: 250,
                            }}
                        >
                            <CardMedia
                                sx={{ height: 180, width: "100%" }}
                                image={`${serverURL}/images/${items.icon}`}
                                title="green iguana"
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    textAlign="center"
                                    sx={{
                                        fontSize: { sm: 10, md: 13, lg: 15 },
                                        fontWeight: 500,
                                        textTransform:"uppercase",
                                        color: "#7d0a0a",
                                    }}
                                >
                                    {items.categoryname}
                                </Typography>
                            </CardContent>
                            <CardActions
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    marginTop: -13,
                                    marginBottom:4,
                                }}
                            >
                                <Button
                                    variant="filled"
                                    sx={{
                                        background: "#7d0a0a",
                                        fontSize: { lg: 12 },
                                        color: "#ffffff",
                                        border:"1px solid #7d0a0a",
                                        width:140,
                                        "&:hover": {
                                            backgroundColor: "#ffffff",
                                            color:"#7d0a0a"
                                        },
                                    }}
                                >
                                    Shop Now
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            );
        });
    };

    return (
        <Grid
            style={{
                display: "flex",
                padding: 3,
                margin: 2,
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 100,
                paddingRight: 100,
                flexDirection: "row",
            }}
        >
            {cardComponent()}
        </Grid>
    );
}

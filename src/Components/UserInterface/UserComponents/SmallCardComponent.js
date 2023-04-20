import { Key } from "@mui/icons-material";
import React from "react";
import { useEffect, useState } from "react";
import { serverURL } from "../../Services/NodeServices";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

export function SmallCardComponent(props) {
    const theme = useTheme();
    const matches1 = useMediaQuery(theme.breakpoints.down(900));
    return props.data.map((items) => {
        console.log(items.picture[0]);

        return (
            <div
                style={{
                    margin: 7,
                    borderRadius:5,
                    width:matches1?100:250,
                    height:matches1?120:290,
                    border:"1px solid #7d0a0a",
                    boxShadow:"4px 4px 5px 3px #bfbfbf"
                }}
            >
                <img
                    src={`${serverURL}/images/${items.picture[0]}`}
                    style={{borderRadius:"5px 5px 0px 0px",width:"100%"}}
                />
                <div
                    style={{
                        color:"#7d0a0a",
                        textAlign:"center",
                        fontWeight: "medium",
                        fontSize: matches1?8:20,
                    }}
                >
                    {items.productname}
                </div>
            </div>
        );
    });
}

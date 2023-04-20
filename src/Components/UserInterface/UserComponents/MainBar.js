import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useEffect } from "react";
import { getData, postData, serverURL } from "../../Services/NodeServices";
import { MenuItem, Menu } from "@mui/material";
import { useNavigate } from "react-router";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function MainBar() {
    const navigate = useNavigate();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down(900));
    
    const [getcategoryid, setcategoryid] = useState("");
    const [getsubcategoryid, setsubcategoryid] = useState("");
    const [getCategory, setCategory] = useState([]);
    const [getsubcategory, setsubcategory] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(anchorEl);

    const Fetchallcategory = async () => {
        var result = await getData("userinterface/display_all_category");
        setCategory(result.data);
    };

    const Fetchallsubcategory = async (categoryid) => {
        var response = await postData("userinterface/display_all_subcategory", {
            categoryid: categoryid,
        });
        setsubcategory(response.data);
    };
    useEffect(function () {
        Fetchallcategory();
    }, []);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
        setcategoryid(event.currentTarget.value);
        Fetchallsubcategory(event.currentTarget.value);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };

    const ShowCategory = () => {
        return getCategory.map((item) => {
            return (
                <Button
                    onClick={handleClick}
                    value={item._id}
                    style={{ color: "black", fontSize:matches?8: 12, margin: "0px 10px" }}
                >
                    {item.categoryname}
                </Button>
            );
        });
    };
    const handleData = (scid, icon) => {
        navigate(`/ProductList/${scid}/${icon}`, { state: { id: scid } });
    };

    const ShowSubCategory = () => {
        return getsubcategory.map((item) => {
            return (
                <MenuItem onClick={() => handleData(item._id, item.icon)}>
                    {item.subcategoryname}
                </MenuItem>
            );
        });
    };

    return (
        <>
            <Box sx={{ flexGrow: 1, display: matches ? "none" : "block" }}>
                <AppBar position="static" style={{ backgroundColor: "#FFF" }}>
                    <Toolbar>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                width: "100%",
                            }}
                        >
                            {matches ? "" : ShowCategory()}
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    "aria-labelledby": "basic-button",
                                }}
                            >
                                {" "}
                                {ShowSubCategory()}
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
}

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled, alpha } from "@mui/material/styles";
import {Container, useMediaQuery, useTheme } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import UserComponentpannel from "./UserComponentPannel.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { postData } from "../../Services/NodeServices.js";
import { useContext } from "react";
import { SessionContext } from "../../Services/SessionContext";
import { Button } from "@mui/material";


const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch",
            },
        },
    },
}));

export default function SearchBar() {

    const theme=useTheme();
    const matches = useMediaQuery(theme.breakpoints.down(900));

    var navigate = useNavigate();
    const { cart, setCart } = useContext(SessionContext);
    const { session, setSession } = useContext(SessionContext);
    const Token = window.localStorage.getItem("Token");
    const User = window.localStorage.getItem("UserNumber");
    const cartData = useSelector((state) => state.cart);
    const [count, setCount] = React.useState(0);

    const func = async () => {
        var formdata = new FormData();
        formdata.append("mobile", User);
        var response = await postData("cart/getAllProducts", formdata, true);
        setCart(response.products.length);
    };

    React.useEffect(
        function () {
            func();
        },
        [cart]
    );

    const handleLogout = () => {
        window.localStorage.removeItem("Token");
        window.localStorage.removeItem("UserNumber");
        window.location.reload();
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ backgroundColor: "#ff94ca"}}>
                <Container maxWidth="xl">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon sx={{color:"#bd147c",fontSize:30}} />
                    </IconButton>
                    <div
                        style={{ fontSize: "18", fontWeight: "bolder", width: "20%",display:matches?"none":"block" }}
                        onClick={() => navigate("/")}
                    >
                        Chandan Jewellers
                    </div>
                    <Search style={{ width: "50%" }}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ "aria-label": "search" }}
                        />
                    </Search>
                    <div
                        style={{ display: "flex", justifyContent: "right", width: "15%",marginLeft:matches?20:0 }}
                    >
                        <ShoppingCartIcon
                            style={{ cursor: "pointer", color: "#bd147c", fontSize: matches?20:35 }}
                            onClick={() => navigate("/cart")}
                        />
                        <Typography sx={{textAlign:"center",fontSize:matches?6:10}}>
                            {`${cart}`}
                        </Typography>
                    </div>
                    <div style={{ width: "5%" }}>

                    </div>
                    <div>
                        <UserComponentpannel/>
                        <div style={{ fontSize: 9,textAlign:"center",display:matches?"none":"block" }}>{Token ? "" : "Sign up"}</div>
                    </div>
                    <div>
                        {Token ? (
                            <Button sx={{fontSize:12,color:"#ffffff",background:"#bd147c",marginLeft:2,width:80,"&:hover":{background:"#eabfd5",color:"#7d0a0a",border:"1px solid #7d0a0a"}}}  onClick={() => handleLogout()}>Log Out</Button>
                        ) : (
                            ""
                        )}
                    </div>
                </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}

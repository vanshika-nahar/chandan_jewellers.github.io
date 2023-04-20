import React, { useEffect, useState } from "react";
import { getData, postData } from "../Services/NodeServices";
import MainBar from "./UserComponents/MainBar";
import SearchBar from "./UserComponents/SearchBar";
import ShowSlider from "./UserComponents/SliderComponent";
import { serverURL } from "../Services/NodeServices";
import { SmallCardComponent } from "./UserComponents/SmallCardComponent";
import ThreeCardComponent from "./UserComponents/ThreeCardComponent";
import OneCardComponent from "./UserComponents/OneCardComponent";
import DownBox from "./UserComponents/DownBox";
import { CenterFocusStrong } from "@material-ui/icons";
import { useContext } from "react";
import { SessionContext } from "../Services/SessionContext";
import { ShopByCategory } from "./UserComponents/ShopByCategory";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ShopByCategoryResponsive } from "./UserComponents/ShopByCategoryResponsive";
import "../../App.css";
import { Box, Container, Typography } from "@mui/material";
import ContactForm from "./UserComponents/ContactForm";
var bannersettings = {
    dots: false,
    arrow: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
};

export default function Home(props) {
    const [getbanner, setBanner] = useState([]);
    const Token = window.localStorage.getItem("Token");
    const User = window.localStorage.getItem("UserNumber");
    const theme = useTheme();
    const matches1 = useMediaQuery(theme.breakpoints.down(900));
    const [getCategory, setCategory] = useState([]);
    const [getProductBySaleStatus, setProductBySaleStatus] = useState([]);
    const [getProductByPopularSale, setProductByPopularSale] = useState([]);
    const [getSubcategoryByBanner, setSubcategoryByBanner] = useState([]);
    const { sessionId, setSessionId } = useContext(SessionContext);

    const fetchproduct = async (status) => {
        var body = { salestatus: status };
        var response = await postData(
            "userinterface/display_product_salestatus",
            body
        );
        setProductBySaleStatus(response.data);
    };

    const fetchPopularproduct = async (status) => {
        var body = { salestatus: status };
        var response = await postData(
            "userinterface/display_product_salestatus",
            body
        );
        setProductByPopularSale(response.data);
    };

    const fetchsubcategoryproduct = async (status) => {
        var body = { bannerpriority: status };
        var response = await postData(
            "userinterface/display_subcategory_banner",
            body
        );
        setSubcategoryByBanner(response.data);
    };

    const Fetchallcategory = async () => {
        var result = await getData("userinterface/display_all_category");
        setCategory(result.data);
    };

    useEffect(function () {
        fetchproduct("Trending");
        fetchPopularproduct("Popular");
        fetchsubcategoryproduct(1);
        Fetchallcategory();
    }, []);

    const Heading = (props) => {
        return (
            <div
                style={{
                    width: "100wh",
                    textAlign: "center",
                    fontSize: 30,
                    fontWeight: " bolder",
                    margin: 5,
                    letterSpacing: 1,
                }}
            >
                {props.heading}
            </div>
        );
    };

    const Fatchbanner = async () => {
        var result = await getData("userinterface/display_all_banner");
        console.log(Object.values(result.data[0].bannerpicture));
        setBanner(Object.values(result.data[0].bannerpicture));
    };

    useEffect(function () {
        Fatchbanner();
    }, []);
    console.log(getbanner);

    return (
        <div style={{ overflowX: "hidden" }}>
            <SearchBar />
            <MainBar />
            <ShowSlider images={getbanner} bannersettings={bannersettings} />

            <Box sx={{ background: "#eabfd5", mt:matches1?5: 18, paddingTop: matches1?5:12, paddingBottom: matches1?5:10 }}>
                <Container maxWidth={"xl"}>
                    <Typography sx={{ fontSize: matches1?30:40, textAlign: "center", fontWeight: "bold", color: "#7d0a0a" }}>SHOP BY CATEGORY</Typography>
                    <Typography sx={{ fontSize:matches1?12: 18, textAlign: "center", fontWeight: "medium", color: "#808080", wordSpacing: 3 }}>Explore all categories across our collecctions</Typography>
                    <Box sx={{ m:2 }}>
                        {matches1 ? (
                            <ShopByCategoryResponsive data={getCategory} />
                        ) : (
                            <ShopByCategory data={getCategory} />
                        )}
                    </Box>
                </Container>
            </Box>
            <Container maxWidth={"xl"} sx={{ paddingTop: matches1?5:12, paddingBottom: matches1?5:10, borderBottom: "1px solid #7d0a0a"}}>
                <Typography sx={{ fontSize:matches1?32: 40, textAlign: "center", fontWeight: "bold", color: "#7d0a0a" }}>TRENDING</Typography>
                <Typography sx={{ fontSize: matches1?10:18, textAlign: "center", fontWeight: "medium", color: "#808080", wordSpacing: 3, marginBottom: matches1?2:8 }}>{matches1?"Popular jewellery styles include minimalist and personalized pieces like layered delicate necklaces, colorful rings, bold earrings, and unique designs that make a statement.":`Popular jewellery styles include minimalist and personalized pieces like layered delicate necklaces.`}</Typography>
                <div
                    style={{
                        display: "flex",
                        flexDirection:matches1?"row":"",
                        padding: 3,
                        margin: 2,
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: matches1?0:100,
                        paddingRight: matches1?0:100,
                    }}
                >
                    <SmallCardComponent data={getProductBySaleStatus} />
                </div>
            </Container>
            <Container maxWidth={"xl"}>
                <ContactForm/>
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
        </div>
    );
}

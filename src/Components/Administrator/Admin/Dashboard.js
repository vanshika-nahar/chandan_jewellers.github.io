import * as React from "react";
import SideList from "./SideList";
import AdminAppBar from "./AdminAppBar";
import Category from "./Category";
import DisplayAllCategory from "./DisplayAllCategory";
import SubCategory from "./SubCategory";
import DisplaySubCategory from "./DisplaySubCategory";
import DisplayProduct from "./Products";
import DisplayAllProduct from "./DisplayProduct";

import BannerImages from "./BannerImages";
import { Routes, Route } from "react-router";
import { height } from "@mui/system";
// import { useTheme } from "@mui/material/styles";
// import { useMediaQuery } from "@mui/material";

export default function Dashboard(props) {

    // const theme = useTheme();
    // const mobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <div style={{ display: "flex", background: "#f5f6fa", flexDirection: 'column', width: "100%" }}>
            <AdminAppBar />
            <div style={{ display: "flex" }}>
                <div style={{ width: "15%", background: "#ffffff" }}>
                    <SideList />
                </div>
                <div style={{ width: "85%", height: "100vh" }}>
                    <Routes>
                        <Route element={<Category />} path="/category" />
                        <Route element={<DisplayAllCategory />} path="/displayallcategory" />

                        <Route element={<SubCategory />} path="/subcategory" />
                        <Route
                            element={<DisplaySubCategory />}
                            path="/displaysubcategory"
                        />
                        <Route element={<DisplayProduct />} path="/product" />
                        <Route element={<DisplayAllProduct />} path="/displayallproduct" />

                        <Route element={<BannerImages />} path="/bannerimage" />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

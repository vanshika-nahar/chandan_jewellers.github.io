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

export default function Dashboard(props) {
  return (
    <div  style={{ display:"flex" ,flexDirection:'column',width:"100%" }}>
      <AdminAppBar />
      <div style={{ display: "flex" }}>
        <div style={{ width: "15%" }}>
          <SideList />
        </div>
        <div style={{ width: "85%",marginTop:50 }}>
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

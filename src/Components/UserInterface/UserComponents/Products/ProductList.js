import React from "react";
import { useEffect,useState} from "react";
import { postData } from "../../Services/NodeServices";
import { useParams } from "react-router";
import { ProductsDetailComponent } from "./ProductsDetailComponent";
import MainBar from "./MainBar";
import SearchBar from "./SearchBar";
import DownBox from "./DownBox";
import { Grid } from "@mui/material";
import FilterCompomnent from "./FilterComponent";
import { serverURL } from "../../Services/NodeServices";
import { useLocation } from "react-router";

export default function ProductList(){
    const[getProduct,setProduct]=useState([])
    var location = useLocation()
    const {id,icon}=useParams()
    const id1 = location.state.id
    const FetchProductBySubcategory=async(id)=>{

      var body={subcategoryid:id}
      var result=await postData('userinterface/fetch_product_by_subcategory',body)
      setProduct(result.data)
      console.log(result.data)
     }
    
     useEffect(() => {
      FetchProductBySubcategory(id)
    },[id]);
     return(<div >
      <SearchBar/>
      <MainBar/>
      <div style={{ display:'flex',flexDirection:"column",padding:4,margin:4,flexWrap:'wrap',alignItems:'center',justifyContent:'center',paddingLeft:100,paddingRight:100}}>
      <div style={{margin:3,marginTop:10,padding:2, width:'100%',height:'auto'}}>
            <img src={`${serverURL}/images/${icon}`} style={{width:'100%', height:280}} />
           
        </div>

         </div>
      <Grid container spacing={2}>
        
      <Grid item xs={3}>
        <FilterCompomnent/>
      </Grid>
      <Grid item xs={9}>
       <div style={{ marginTop:20, display:'flex',padding:3,margin:2,flexWrap:'wrap',alignItems:'center',justifyContent:'center',paddingLeft:100,paddingRight:100}}>
         <ProductsDetailComponent data={getProduct} />
      </div>
      </Grid>
      </Grid>
    

  
      <DownBox/>
            </div>)

}
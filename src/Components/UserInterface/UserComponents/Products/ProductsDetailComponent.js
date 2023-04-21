import React from "react";
import { serverURL } from "../../Services/NodeServices";
import { useNavigate } from "react-router";


export function ProductsDetailComponent(props){
    var navigate=useNavigate()
const handleproduct=(items)=>{
    alert(JSON.stringify(items))
   navigate('/setproduct',{state:{product:items}})
}

     return props.data.map((items)=>{

    console.log()
   
        return(
            <div onClick={()=>handleproduct(items)}  style={{margin:5,padding:4,display:'flex',flexDirection:'column'}}>
            <div style={{position:'relative', width:280,height:300}}>
                <img src={`${serverURL}/images/${items.picture[0]}`} style={{width:'100%',height:'100%'}} />
                <div style={{zIndex:1,position:'absolute',color:'white',left:'25%',top:'90%',fontWeight:'bold',fontSize:20}} >{items.description}</div>
            </div>
            <div style={{fontSize:18,fontWeight:700,letterSpacing:1,marginTop:5}}>
                {items.productname}
            </div>
            <div style={{fontSize:16,fontWeight:600,letterSpacing:1,marginTop:3}}>
                {items.offerprice>0 ? <> <span >&#8377; {items.offerprice}</span><span style={{textDecoration:'line-through',color:'red',marginLeft:7}}>&#8377; {items.price}</span><span style={{color:'green',marginLeft:4}}>save &#8377; {items.price-items.offerprice}</span></>:<>{items.price}</>}
            </div>
            </div>
            
        )
    })
}
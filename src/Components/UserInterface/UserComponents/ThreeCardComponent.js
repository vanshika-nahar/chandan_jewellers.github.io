import { height } from "@mui/system";
import React from "react";
import { serverURL } from "../../Services/NodeServices";

export default function ThreeCardComponent(props)
{
    return props.data.map((item)=>{
        return(<div style={{margin:3,padding:2,position:'relative', width:420,height:520}}>
            <img src={`${serverURL}/images/${item.picture[0]}`} style={{width:'100%', height:'100%'}} />
            <div  style={{zIndex:1,position:'absolute',color:'white',left:'35%',top:'85%',fontWeight:'bolder',fontSize:40}} >{item.productname}</div>

        </div>)
    })
}
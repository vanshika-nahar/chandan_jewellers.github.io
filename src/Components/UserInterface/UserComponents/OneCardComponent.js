import React from "react";
import { serverURL } from "../../Services/NodeServices";
import { useNavigate } from "react-router";

export default function OneCardComponent(props){
    const navigate=useNavigate()

    const handleClick=(scid,icon)=>{
             navigate(`/${props.url}/${scid}/${icon}`,{state:{id:scid}})
    }
    return props.data.map((item)=>{
        return(
        <div onClick={()=>handleClick(item._id,item.icon)} style={{margin:3,marginTop:10,padding:2,position:'relative', width:'25%',height:'auto'}}>
            <img src={`${serverURL}/images/${item.icon}`} style={{width:'100%', height:'100%'}} />
            
        </div>)
    })
}
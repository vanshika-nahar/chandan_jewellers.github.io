import  { createRef } from "react";
import { useRef } from "react";
import React, { useState, useEffect } from "react";
import { Button, Grid } from '@mui/material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { serverURL } from "../../Services/NodeServices";
import { color } from "@mui/system";


const  setImageSlider=()=>{
    return(
        <img src={`${serverURL}/images/paytm.png`} style={{width:'97%',height:'100%',}} />
    )
}
var img= ({
    
    dots: false,
    arrow: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    focusOnSelect:true,
    
  });
  var img1=({
    dots: false,
    arrow: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    focusOnSelect:true,
    prevArrow:color.red
  });

  

export default function ImageSlider({pictures}){
    const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
    console.log(pictures)
    var images = [{ 'id': 1, 'image': `${serverURL}/images/${pictures[0]}` },
    { 'id': 2, 'image': `${serverURL}/images/slide2.jpg` },
    { 'id': 3, 'image': `${serverURL}/images/slide3.jpg` },
    { 'id': 4, 'image': `${serverURL}/images/slide4.jpg` },

    
    ]
const  setImageSlider=()=>{
return pictures.map((item)=>{
    return(<div>
        <img src={ `${serverURL}/images/${item}` } style={{width:'97%',height:'100%',}} />
    </div>)
})

}


 
    return(<div style={{display:'flex',justifyContent:'center',alignItem:'center',width:'90%',background:'#fff',height:'auto',flexWrap:'wrap'}}>
        <div></div>

        <div style={{width:'50%',marginTop:12,marginBottom:12}}>
            <Slider {...img1} ref={(slider2) => setNav2(slider2)}  asNavFor={nav1}>
         {setImageSlider()}
            </Slider>
        </div>
        <div style={{width:'100%',marginTop:5,marginBottom:12}}>
            <Slider {...img} ref={(slider1) => setNav1(slider1)} asNavFor={nav2} >
         {setImageSlider()}
            </Slider>
        </div>
        
     
    </div>)
}
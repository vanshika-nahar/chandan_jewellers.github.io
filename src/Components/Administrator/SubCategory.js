import {useStyles} from "./SubCategoryCss";
import { TextField,Button,Grid,Avatar} from "@material-ui/core";
import { useEffect, useState } from "react";
import { postData,getData } from "../Services/NodeServices";
import { SettingsBrightness } from "@material-ui/icons";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";





export  default  function SubCategory(props){
    const classes=useStyles()
    const navigate=useNavigate()
    const[categoryId,setcategoryId]=useState(' ')
    const[subcategory,setsubcategory]=useState(' ')
    const[getsetsubcategorypriority,setsubcategorypriority]=useState('')

    const [Icon,setIcon]=useState({url:'/girl.png', bytes:' '})
    const[categoryList,setcategoryList]=useState([ ])


    const FetchAllCategory=async()=>{
      var data= await getData('category/display_all_category')
        setcategoryList(data.data)
    }

    useEffect(function(){
        FetchAllCategory()
    },[])

  const FillAllCategory=()=>{

       return categoryList.map((item)=>{
      return( 
        <MenuItem value={item._id}>{item.categoryname}</MenuItem>

      )

   })
  }

  function handleIcon(event){
    setIcon({url:URL.createObjectURL(event.target.files[0]) ,bytes:event.target.files[0]})
    }

    const handlesubmit=async()=>{
      var formdata= new FormData()
      formdata.append('categoryid',categoryId)
      formdata.append('subcategoryname',subcategory)
      formdata.append('bannerpriority',getsetsubcategorypriority)
      formdata.append('icon',Icon.bytes)
      var response= await postData('subcategory/addsubcategory',formdata,true)
      if(response.data)
      {  Swal.fire({
        icon: 'success',
       title: 'Record successfully submited',
       
      })
  
      }
      else{
        Swal.fire({
          icon: 'success',
         title: 'Record successfully submited',
        })
      }
      

    }

    const handleChange=(event)=>{
      alert(event.target.value)
      setcategoryId(event.target.value)
    }

    
    return(
    <div className={classes.maincontainer}>
        <div className={classes.box}>
            
        <Grid container spacing={2}>
            <Grid item xs={12} className={classes.heading}> 
            <div className={classes.heading}>Add Sub Category
              </div>
              <div style={{justifyContent:'flex-end',display:'flex'}} >
              <Avatar src='report.png'  style={{width:'75'}} variant='square' onClick={()=> navigate('/dashboard/displaysubcategory')} />
            </div>

            </Grid>
        <Grid style={{width:'100%'}}>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={categoryId}
          label="category"
          onChange={handleChange}
          style={{display:'flex'}}
          
        >

         {FillAllCategory()}
        </Select>
      </FormControl>
         </Grid>
            <Grid item xs={12}>
            <TextField  onChange={(event)=>setsubcategory(event.target.value)} fullWidth id="outlined-basic" label="add subcategory" variant="outlined" />
            </Grid>

     <Grid item xs={12}>
       <TextField  onChange={(event)=>setsubcategorypriority(event.target.value)} fullWidth id="outlined-basic" label="priority" variant="outlined" />
     </Grid>

        <Grid item xs={6}>
            <Button color='primary' variant="contained" component="label">
             Upload
           <input hidden accept="image/*" onChange={handleIcon} multiple type="file" />
           </Button>
            </Grid>
            <Grid xs={6}>
            <Avatar  className={classes.images} alt="Remy Sharp" src={Icon.url}  />
            </Grid>
            <Grid item xs={12}>
            <Button onClick={handlesubmit} color='primary' variant="contained"  fullWidth>Click To ADD</Button>
            </Grid>
        </Grid>
         </div>
    </div>
    )
}

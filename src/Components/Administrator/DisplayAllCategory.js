import { useEffect,useState } from "react";
import MaterialTable from "@material-table/core";
import { getData, postData, serverURL } from "../Services/NodeServices";
// import React from "react";
import { Button,Grid,Avatar,TextField } from "@material-ui/core";
import { useStyles } from "./DisplayAllCategoryCss";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";

export default function DisplayAllCategory(props)
{ const classes=useStyles()
  const navigate=useNavigate()
  const[categoryID,setCategoryID]=useState(' ') 
  const [getcategory,setcategory]=useState(' '); 
  const [Icon,setIcon]=useState({url:'/girl.png',bytes:''})
  const[oldicon,setOldicon]=useState(' ')
  const[uploadbtn,setuploadbtn]=useState(false)

    const  handleIcon=(event)=>{
     setIcon({url:URL.createObjectURL(event.target.files[0]) ,bytes:event.target.files[0]})
      setBtnStatus(true)
      setuploadbtn(true)
    
    }
   
  const [open,setOpen]=useState(false)
  const [btnStatus,setBtnStatus]=useState(false)

  const [category,setCategory]=useState([ ])
  const FetchAllCategory=async()=>{
 var data= await getData('category/display_all_category')

    setCategory(data.data)
  }

  useEffect(function(){
    FetchAllCategory()
  },[])
     
  const handleOpen=(rowData)=>{
    setCategoryID(rowData._id)
    setcategory(rowData.categoryname)
    setOldicon({url:`${serverURL}/images/${rowData.icon}`,bytes:' '})
    setIcon({url:`${serverURL}/images/${rowData.icon}`,bytes:' '})
    setOpen(true)
  }
  const handleClose=()=>{
    setOpen(false)
  }
  const handleEditData=async()=>{
    var body={categoryname:getcategory,categoryid:categoryID}
    var result= await postData('category/edit_category_data',body)

    if(result.status)
    { 

      Swal.fire({
       
      icon: 'success',
     title: ' EDIT Record successfully submited',
     
    })

    }
    else{
      Swal.fire({
        position:'top-end',
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    }

    FetchAllCategory()

  }
  const handleDelete=async()=>{
    Swal.fire({
      title: 'Do you want to Delete the subcategory?',
      showDenyButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't Delete`,
    }).then(async(res) => {
      /* Read more about isConfirmed, isDenied below */
      if (res.isConfirmed) {
        var body={categoryid:categoryID}
         var result= await postData('category/delete_category_data',body)
        if(result.status)
        {
        Swal.fire('Delete!', '', 'success')
        FetchAllCategory()
        }
        else{
          Swal.fire('Server error', '', 'error')
        }
        FetchAllCategory()
      } 
      else if (res.isDenied) {
        Swal.fire('Changes are not deleted', '', 'info')
      }
    })

   
  
    FetchAllCategory()
    handleClose()

  }
  const handleCancel=()=>{
    setBtnStatus(false)
    setIcon({url:oldicon.url,bytes:''})
    setuploadbtn(false)
    setOldicon(' ')
  }

  const handleSavePicture=async()=>{
    var formdata= new FormData()
    formdata.append('categoryid',categoryID)
    formdata.append('icon',Icon.bytes)

   var response= await postData('category/update_icon',formdata,true)
    alert(response.status)
    setBtnStatus(false)
    setuploadbtn(false)
    FetchAllCategory();

   
  }


  const SaveAndCancel=()=>{
    return(<div>
         {btnStatus?<div style={{display:'flex', width:180 ,justifyContent:'space-between'}}><Button onClick={handleSavePicture} color="primary" variant="contained">Save</Button>
          <Button color="secondary" variant="contained" onClick={handleCancel}>cancel</Button></div>:<></>}
           </div>)
  }
    
   const  showCategory=()=>{
        return(<div>
           <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >

        
        <DialogContent>

       
            
               <Grid container spacing={2}>
                <Grid item xs={12} className={classes.heading}>
               Category_details
                </Grid>
                <Grid item xs={12} >
                <TextField value={getcategory}  onChange={(event)=>setcategory(event.target.value)}  fullWidth label="Category Name" variant="outlined"/>
                </Grid>

                  <Grid  item xs={6}>
                <Button onClick={handleEditData} style={{marginTop:40}} fullWidth color='primary' variant="contained">Edit</Button>
                </Grid>
                <Grid item xs={6}>
                <Button onClick={handleDelete}  style={{marginTop:40}} fullWidth color='primary' variant="contained">Delete</Button>
                </Grid> 

               
              <Grid item xs={4} className={classes.center} >
                <Button  disabled={uploadbtn} style={{marginTop:50}} fullWidth variant="contained" component="label">
               Upload
              <input hidden  onChange={handleIcon} accept="image/*"  multiple type="file"/>
             </Button>
                </Grid>
                <Grid item xs={4} className={classes.center} >
                <Avatar  fullWidth
              alt="Remy Sharp"
               src={Icon.url}
               sx={{ width:110,height:110}} 
                />
                
                </Grid>
                <Grid item xs={4} className={classes.center}>
                  {SaveAndCancel()}
                </Grid>
               
                 
               </Grid>
          

             
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
    
        </DialogActions>
      </Dialog>
  </div>

        )

      }


        function DisplayCategory() {
            return (
             
              <MaterialTable
                title="List of Category"
                columns={[
                  { title: 'Category-ID', field: '_id' },
                  { title: 'Category-Name', field: 'categoryname' },
                  { title: 'Category-Image', render:(rowData)=><img src={`${serverURL}/images/${rowData.icon}`} width='45' height='45'/>},
                 
                ]}
                data={category}        
                actions={[
                  {
                    icon: 'edit',
                    tooltip: 'edit category details',
                    onClick: (event, rowData) =>{handleOpen(rowData)}
                  },
                  {
                    icon: 'add',
                    tooltip: 'Add category',
                    isFreeAction: true,
                    onClick: (event) => navigate('/dashboard/category')
                  }
                ]}
              />
          
            )
          }
          
return(
  <div className={classes.maincontainer}>
    <div className={classes.box}>
        {DisplayCategory()}
    </div>
         {showCategory()}
    </div>
)
   
}
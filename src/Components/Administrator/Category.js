import { useStyles } from "./CategoryCss";
import {
  TextField,
  Grid,
  Button,
  Input,
  Avatar,
  alertTitleClasses,
} from "@mui/material";
import { postData } from "../Services/NodeServices";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Category(props) {
  const classes = useStyles();
  const navigate=useNavigate();
  const [getcategory, setcategory] = useState(" ");
  const [Icon, setIcon] = useState({ url: "/girl.png", bytes: "" });

  const handleIcon = (event) => {
    setIcon({
      url: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
  };
  const handleSubmit = async () => {
    var formdata = new FormData();
    formdata.append("categoryname", getcategory);
    formdata.append("icon", Icon.bytes);

    var response = await postData("category/addcategory", formdata, true);
    if(response.result)
    {  Swal.fire({
      icon: 'success',
     title: 'Record successfully submited',
     
    })

    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    }
  };
  return (
    <div className={classes.maincontainer}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item xs={12} className={classes.heading}>
            <div className={classes.heading} style={{display:'flex'}}> Category_details</div>
            <div style={{justifyContent:'flex-end',display:'flex'}} >
              <Avatar src='report.png'  style={{width:'75'}} variant='square' onClick={()=> navigate('/dashboard/displayallcategory')} />
            </div>
           
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={(event) => setcategory(event.target.value)}
              fullWidth
              label="Your Name"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={6}>
            <Button
              style={{ marginTop: 50 }}
              fullWidth
              variant="contained"
              component="label"
            >
              Upload
              <input
                hidden
                accept="image/*"
                onChange={(event) => handleIcon(event)}
                multiple
                type="file"
              />
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Avatar
              className={classes.images}
              fullWidth
              alt="Remy Sharp"
              src={Icon.url}
              sx={{ width: 110, height: 110 }}
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={handleSubmit}
              style={{ marginTop: 40 }}
              fullWidth
              color="primary"
              variant="contained"
            >
              Submit
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              style={{ marginTop: 40 }}
              fullWidth
              color="primary"
              variant="contained"
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

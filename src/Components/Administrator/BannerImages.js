import { useStyles } from "./CategoryCss";
import { TextField,Grid, Button, Input, Avatar,alertTitleClasses} from "@mui/material";
import { postData } from "../Services/NodeServices";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {DropzoneArea} from "material-ui-dropzone";




export default function BannerImages(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [getFiles, setFiles] = useState([]);
  

  
  const handleSubmit = async () => {
    var formdata = new FormData();
     getFiles.map((item,index)=>{
      formdata.append("pictures"+index,item)
     })
    var response = await postData("products/add_banner_picture", formdata, true);
    if (response.status) {
      Swal.fire({
        icon: "success",
        title: "Record successfully submited",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

 const handleSave=(files)=> {
    //Saving files to state for further use and closing Modal.
    setFiles(files)
}

  return (
    <div className={classes.maincontainer}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item xs={12} className={classes.heading}>
            <div className={classes.heading} style={{ display: "flex" }}>
              {" "}
             Banner Images Interface
            </div>
            <div style={{ justifyContent: "flex-end", display: "flex" }}>
              <Avatar
                src="report.png"
                style={{ width: "75" }}
                variant="square"
                onClick={() => navigate("/dashboard/displayallcategory")}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
          <DropzoneArea
                  
                    onChange={handleSave}
                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                    filesLimit={6}
                    maxFileSize={5000000}
                 
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

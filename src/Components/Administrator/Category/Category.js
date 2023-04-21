import { useStyles } from "./CategoryCss";
import { TextField, Grid, Button, Avatar } from "@mui/material";
import { postData } from "../Services/NodeServices";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ViewListIcon from '@mui/icons-material/ViewList';

export default function Category(props) {
    // STYLEING VARIABLE
    const classes = useStyles();

    // NAVIGATION VARIABLE
    const navigate = useNavigate();

    // CATEGORY VARIABLES
    const [getcategory, setCategory] = useState("");
    const [Icon, setIcon] = useState({ url: "/girl.png", bytes: "" });

    // FUNCTION FOR ICON HANDLING
    const handleIcon = (event) => {
        setIcon({
            url: URL.createObjectURL(event.target.files[0]),
            bytes: event.target.files[0],
        });
    };

    // FUNCTION TO SUBMIT DATA
    const handleSubmit = async () => {
        var formdata = new FormData();
        formdata.append("categoryname", getcategory);
        formdata.append("icon", Icon.bytes);

        var response = await postData("category/addcategory", formdata, true);
        if (response.result) {
            Swal.fire({
                icon: "success",
                title: "Done",
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

    // FUNCTION TO RESET THE FORM 
    const handleClearValues = () => {
        setCategory("");
        setIcon({ url: "/girl.png", bytes: "" });
    }

    return (
        <div className={classes.maincontainer}>
            <div className={classes.box}>
                <Grid container spacing={2}>
                    <Grid item xs={12} className={classes.headingContainer}>
                        <div className={classes.heading} style={{ display: "flex" }}>
                            {" "}
                            Category Interface
                        </div>
                        <div style={{ justifyContent: "flex-end", display: "flex" }}>
                            <ViewListIcon onClick={() => navigate("/dashboard/displayallcategory")} sx={{ fontSize: 34 }} />
                        </div>
                    </Grid>
                    <Grid sx={{ mt: 4 }} item xs={12}>
                        <TextField onChange={(event) => setCategory(event.target.value)} value={getcategory} label="Category Name" fullWidth />
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
                            fullWidth
                            variant="rounded"
                            alt="Remy Sharp"
                            src={Icon.url}
                            sx={{ width: 100, height: "auto", mt: 3, ml: 12 }}
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
                            onClick={handleClearValues}
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

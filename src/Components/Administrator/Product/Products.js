import { TextField, Button, Grid, Avatar } from "@material-ui/core";
import { useStyles } from "./ProductCss";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { useEffect, useState } from "react";
import { getData, postData, serverURL } from "../Services/NodeServices";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { Delete } from "@mui/icons-material";
import { DropzoneArea } from "material-ui-dropzone";
import ViewListIcon from '@mui/icons-material/ViewList';

export default function DisplayProduct(props) {
    // STYLING VARIABLE
    const classes = useStyles();

    // NAVIGATION VARIABLE
    const navigate = useNavigate();

    // PRODUCT VARIABLES
    const [getCategoryData, setCategoryData] = useState([]);
    const [getSubCategoryData, setSubCategoryData] = useState([]);
    const [getCategoryid, setCategoryid] = useState("");
    const [getSubcategoryid, setSubcategoryid] = useState("");
    const [getProductname, setProductname] = useState("");
    const [getprice, setPrice] = useState("");
    const [getOfferprice, setOfferprice] = useState("");
    const [getStock, setStock] = useState("");
    const [getDescription, setDescrition] = useState("");
    const [getRating, setRating] = useState("");
    const [getStatus, setstatus] = useState("");
    const [getSalestatus, setSaleStatus] = useState("");
    const [getIcon, setIcon] = useState({ url: "./girl.png", bytes: " " });
    const [tempPicture, setTempPicture] = useState({});
    const [count, setCount] = useState(0);
    const [getFiles, setFiles] = useState([]);


    const handleIcon = (event) => {
        setIcon({
            url: URL.createObjectURL(event.target.files[0]),
            bytes: event.target.files[0],
        });
    };

    // FUNCTION TO SUBMIT DATA
    const handleSubmit = async () => {
        var formdata = new FormData();
        formdata.append("categoryid", getCategoryid);
        formdata.append("subcategoryid", getSubcategoryid);
        formdata.append("productname", getProductname);
        formdata.append("price", getprice);
        formdata.append("offerprice", getOfferprice);
        formdata.append("stock", getStock);
        formdata.append("description", getDescription);
        formdata.append("rating", getRating);
        formdata.append("status", getStatus);
        formdata.append("salestatus", getSalestatus);

        getFiles.map((item, index) => {
            formdata.append("picture" + index, item);
        });

        var response = await postData("products/addrecord_data", formdata, true);
        if (response.status == true) {
            Swal.fire({
                icon: "success",
                title: "successfully submitted",
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }
    };

    // FUNCTION TO FETCH CATEGORY
    const fetchgetCategory = async () => {
        var result = await getData("category/display_all_category");
        setCategoryData(result.data);
    };
    useEffect(function () {
        fetchgetCategory();
    }, []);

    // DROPDOWN FUNCTION FOR CATEGORY
    const CategoryDropDown = () => {
        return getCategoryData.map((item) => {
            return <MenuItem value={item._id}>{item.categoryname}</MenuItem>;
        });
    };

    // FUNCTION TO FETCH SUBCATEGORY BY CATEGORY
    const fetchsubCategory = async (cid) => {
        var result = await postData("products/display_subcategory_by_category", {
            categoryid: cid,
        });
        setSubCategoryData(result.data);
    };

    // FUNCTION TO DISPLAY ALL SUBCATEGORY
    const getSubCategory = async () => {
        var result = await getData("subcategory/display_all_subcategory");
        setSubCategoryData(result.data);
    };
    useEffect(function () {
        getSubCategory();
    }, []);

    // DROPDOWN FUNCTION FOR SUBCATEGORY
    const SubCategoryDropDown = () => {
        return getSubCategoryData.map((item) => {
            return <MenuItem value={item._id}>{item.subcategoryname}</MenuItem>;
        });
    };

    // FUNCTION TO HANDLE MULTIPLE FILES
    const handleFiles = (files) => {
        setFiles(files);
    };

    // FUNCTION TO SHOW PICTURES
    const showPicture = () => {
        return Object.values(tempPicture).map((item, index) => {
            return (
                <div
                    style={{
                        padding: 5,
                        display: "flex",
                        justifyContent: "center",
                        border: "2px solid #000",
                        margin: 5,
                        borderRadius: 8,
                        display: "flex",
                        position: "relative",
                        width: 110,
                    }}
                >
                    <div>
                        <Delete
                            style={{
                                display: "flex",
                                position: "absolute",
                                zIndex: 2,
                                top: 0,
                                left: 10,
                            }}
                        />
                    </div>

                    <img
                        style={{ borderRadius: 15 }}
                        src={`${serverURL}/images/${item}`}
                        width="100"
                    />
                </div>
            );
        });
    };


    const handleCategoryId = (event) => {
        setCategoryid(event.target.value);
        fetchsubCategory(event.target.value);
    };

    // FUNCTION TO RESET FORM 
    const handleClearValues =()=>{
        setCategoryid("");
        setSubcategoryid("");
        setProductname("");
        setPrice("");
        setOfferprice("");
        setStock("");
        setDescrition("");
        setRating("");
        setstatus("");
        setSaleStatus("");
        setIcon({ url: "./girl.png", bytes: " " });
        setFiles("");
    }

    return (
        <div className={classes.maincontainer}>
            <div className={classes.box}>
                <Grid container spacing={2}>
                    <Grid item xs={12} className={classes.headingContainer}>
                        <div className={classes.heading} style={{ display: "flex" }}>
                            Product Interface
                        </div>
                        <div style={{ justifyContent: "flex-end", display: "flex" }}>
                            <ViewListIcon onClick={() => navigate("/dashboard/displayallproduct")} sx={{ fontSize: 34 }} />
                        </div>
                    </Grid>

                    <Grid item xs={6} style={{ width: "100%" }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                Category name
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={getCategoryid}
                                label="CategoryName"
                                onChange={handleCategoryId}
                            >
                                <MenuItem>choose-category</MenuItem>
                                {CategoryDropDown()}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6} style={{ width: "100%" }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                {" "}
                                SubCategory name
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={getSubcategoryid}
                                label="Sub-CategoryName"
                                onChange={(event) => setSubcategoryid(event.target.value)}
                            >
                                <MenuItem>choose-subcategory</MenuItem>
                                {SubCategoryDropDown()}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={4}>
                        <TextField
                            onChange={(event) => setProductname(event.target.value)}
                            fullWidth
                            label="Product Name"
                            variant="outlined"
                            value={getProductname}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <TextField
                            onChange={(event) => setPrice(event.target.value)}
                            fullWidth
                            label="Product price"
                            variant="outlined"
                            value={getprice}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <TextField
                            onChange={(event) => setOfferprice(event.target.value)}
                            fullWidth
                            label="Offert price"
                            variant="outlined"
                            value={getOfferprice}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <TextField
                            onChange={(event) => setStock(event.target.value)}
                            fullWidth
                            label="stock"
                            variant="outlined"
                            value={getStock}
                        />
                    </Grid>

                    <Grid item xs={8}>
                        <TextField
                            onChange={(event) => setDescrition(event.target.value)}
                            fullWidth
                            label="Description"
                            variant="outlined"
                            value={getDescription}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <TextField
                            onChange={(event) => setRating(event.target.value)}
                            fullWidth
                            label="Rating"
                            variant="outlined"
                            value={getRating}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            onChange={(event) => setSaleStatus(event.target.value)}
                            fullWidth
                            label="Status"
                            variant="outlined"
                            value={getSalestatus}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">
                                Status
                            </FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                onChange={(event) => {
                                    console.log("this is radio", event.target.value);
                                    setstatus(event.target.value);
                                }}
                            >
                                <FormControlLabel
                                    value="continue"
                                    control={<Radio />}
                                    label="Continue"
                                />
                                <FormControlLabel
                                    value="discontinue"
                                    control={<Radio />}
                                    label="Discontinue"
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={classes.content}>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                {showPicture()}
                            </div>
                            <DropzoneArea
                                onChange={handleFiles}
                                acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
                                showPreviews={false}
                                maxFileSize={5000000}
                                filesLimit={5 - count}
                                showFileNames={true}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container spacing={2}>
                        <Grid item xs={12}>
                        <TextField
                            onChange={(event) => setDescrition(event.target.value)}
                            fullWidth
                            label="Description"
                            variant="outlined"
                            value={getDescription}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            onChange={(event) => setDescrition(event.target.value)}
                            fullWidth
                            label="Description"
                            variant="outlined"
                            value={getDescription}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            onChange={(event) => setDescrition(event.target.value)}
                            fullWidth
                            label="Description"
                            variant="outlined"
                            value={getDescription}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            onChange={(event) => setDescrition(event.target.value)}
                            fullWidth
                            label="Description"
                            variant="outlined"
                            value={getDescription}
                        />
                        </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            onClick={handleSubmit}
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Submit
                        </Button>
                    </Grid>

                    <Grid item xs={6}>
                        <Button onClick={handleClearValues} fullWidth variant="contained" color="secondary">
                            Reset
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

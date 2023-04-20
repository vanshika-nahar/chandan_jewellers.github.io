import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import Image from "../../Assets/Contact_img.png";
import {useTheme} from "@mui/material/styles";
import useMediaQuery  from '@mui/material/useMediaQuery';

export default function ContactForm() {

    const theme = useTheme();
    const matches1 = useMediaQuery(theme.breakpoints.down(900));

    return (
        <Box sx={{ display: "flex", flexDirection:matches1?"column": "row", justifyContent: matches1?"center":"space-evenly", alignItems: "center", padding: "50px 0px" }}>
            <img src={Image} style={{ width: 450,display:matches1?"none":"block" }} />
            <Box sx={{ width: matches1?"100%":"30%" }}>
                <Typography sx={{ color: "#7d0a0a", fontSize: 24, textAlign: "center", marginBottom: 2, fontWeight: "bold" }}>
                    GET IN TOUCH
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField label="Name" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Email" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Message" multiline rows={5} fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <Button fullWidth sx={{
                            background: "#ff94ca", 
                            fontSize: 18, 
                            fontWeight: "bold", 
                            color: "#7d0a0a", 
                            "&:hover": {
                                background: "#7d0a0a",
                                color: "#ff94ca"
                            }
                        }}>Send</Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}
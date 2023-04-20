import React from "react";
import faceBook from "../../Assets/facebook_icon.png";
import Instagram from "../../Assets/instagram_icon.png";
import WhatsApp from "../../Assets/whatsapp_icon.png";
import LinkedIn from "../../Assets/linkedin_icon.png";
import { makeStyles } from '@material-ui/core'
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function DownBox() {
    const classes = useStyles();
    const theme = useTheme();
    const matches1 = useMediaQuery(theme.breakpoints.down(900));

    return (
        <div className={classes.footerContainer}>
            <div style={{ width: "100%" }}>
                <div className={classes.linkContainer}>
                    <div className={classes.links}>
                        <h2 style={{ marginBottom: 15 }}>COMPANY</h2>
                        <a href="#" className={classes.aStyles}>
                            About Us
                        </a>
                        <a href="#" className={classes.aStyles}>
                            Term and Condition
                        </a>
                        <a href="#" className={classes.aStyles}>
                            Collaboration
                        </a>
                        <a href="#" className={classes.aStyles}>
                            Privacy Policy
                        </a>
                        <a href="#" className={classes.aStyles}>
                            Shipping Policy
                        </a>
                        <a href="#" className={classes.aStyles}>
                            Media
                        </a>
                    </div>
                    <div className={classes.links} style={{ marginLeft:matches1?0: 100 }}>
                        <h2 style={{ marginBottom: 15 }}>NEED HELP</h2>
                        <a href="#" className={classes.aStyles}>
                            FAQs
                        </a>
                        <a href="#" className={classes.aStyles}>
                            Email Us
                        </a>
                        <a href="#" className={classes.aStyles}>
                            Return, Refund and Cancellation Policy
                        </a>
                        <a href="#" className={classes.aStyles}>
                            Track Order
                        </a>
                        <a href="#" className={classes.aStyles}>
                            Carrer
                        </a>
                        <a href="#" className={classes.aStyles}>
                            Site Map
                        </a>
                    </div>
                    <div className={classes.links} style={{ marginLeft:matches1?0: 100 }}>
                        <h2 style={{ marginBottom: 15 }}>LOCATION</h2>
                        13, behind Jhawar Estate Gulabchand Ki
                        <br /> Bagichi, Nehru Colony, Mayur Nagar,
                        <br /> Thatipur, Gwalior, Madhya Pradesh
                        <br /> 474011
                        <br />
                        <div>
                            {" "}
                            <a href="#" className={classes.aStyles}>
                                {" "}
                                hemu@gmail.com
                            </a>
                        </div>
                    </div>
                </div>
                <div className={classes.linksIcon}>
                    <h2>Join us on</h2>
                    <div className={classes.links2}>
                        <a href="#" className={classes.iconStyles}>
                            {" "}
                            <img src={faceBook} width="40" />
                        </a>
                        <a href="#" className={classes.iconStyles}>
                            <img src={Instagram} width="40" />
                        </a>
                        <a href="#" className={classes.iconStyles}>
                            {" "}
                            <img src={LinkedIn} width="40" />
                        </a>
                        <a href="#" className={classes.iconStyles}>
                            {" "}
                            <img src={WhatsApp} width="40" />
                        </a>
                    </div>
                </div>
                {/* <h5 className={classes.bottom}>Anywhere Fitness, a TT44 Company</h5> */}
            </div>
        </div>
    );
}

const useStyles = makeStyles((theme)=>({

    footerContainer: {
      width: '100%',
      color: '#7d0a0a',
      paddingTop:50,
      paddingBottom:5
    },
  
  
    linkContainer: {
      display: 'flex',
      width: '100%',
      flexWrap: 'wrap'
    },
  
  
    links: {
      display: 'flex',
      flexDirection: 'column',
      padding: '5%',
      paddingTop: '1%'
    },
  
    linksIcon: {
      display: 'flex',
      flexDirection: 'row',
      padding: '5%',
      paddingTop: '1%',
      [theme.breakpoints.down(900)]: {
        flexDirection:"column"
      },
    },
  
    links2: {
      display: 'flex',
      marginLeft:100,
      [theme.breakpoints.down(900)]: {
        marginLeft:-10,
        marginTop:16
      },
    },
  
    aStyles: {
      color: '#7d0a0a',
      fontWeight:"bold",
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
        color: '#565656'
      },
      lineHeight: '180%'
    },
  
  
    iconStyles: {
      color: 'white',
      textDecoration: 'none',
      marginLeft:10,
    },
  
    
    bottom: {
      textAlign: 'center',
      padding: '1%'
    },
  })  )
import React from 'react';
import { makeStyles } from '@material-ui/core'
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export const useStyles = makeStyles({

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
    paddingTop: '1%'
  },

  links2: {
    display: 'flex',
    marginLeft:100
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
    marginLeft:10
  },

  
  bottom: {
    textAlign: 'center',
    padding: '1%'
  },
})  
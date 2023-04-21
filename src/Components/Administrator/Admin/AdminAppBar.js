import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function AdminAppBar(props){
    return(
        <div>
             <Box sx={{ flexGrow: 1 }}>
             <AppBar position="static" color="primary">
             <Toolbar>
             <IconButton
             size="large"
             edge="start"
             color="inherit"
             aria-label="menu"
             sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           Chandan Jewellers
        </Typography>
        </Toolbar>
      </AppBar>
    </Box>
        </div>
    )
}
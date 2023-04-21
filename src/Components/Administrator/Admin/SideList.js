import * as React from "react";

import List from "@mui/material/List";
import Divider, { dividerClasses } from "@mui/material/Divider";
import { Link } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";

export default function SideList(props) {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{}}>
        <Divider />
        <List component="nav">
          <React.Fragment>
          <Link style={{textDecoration:'none',color:'black'}} to ='/dashboard' >
            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
            </Link>
            <Link style={{textDecoration:'none',color:'black'}} to ='/dashboard/category' >
              <ListItemButton> 
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Category" />
              </ListItemButton>
              </Link>

              <Link style={{textDecoration:'none',color:"black"}} to ='/dashboard/subcategory' >
            <ListItemButton>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Subcategory" />
            </ListItemButton>
             </Link>

             <Link style={{textDecoration:'none',color:'black'}} to ='/dashboard/product' >
            <ListItemButton>
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary="Product" />
            </ListItemButton>
            </Link>

            <Link style={{textDecoration:'none',color:'black'}} to ='/dashboard/size' >
            <ListItemButton>
            <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary="Size" />
            </ListItemButton>
            </Link>
            <Link style={{textDecoration:'none',color:'black'}} to ='/dashboard/color' >
            <ListItemButton>
            <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary="Color" />
            </ListItemButton>
            </Link>
            <Link style={{textDecoration:'none',color:'black'}} to ='/dashboard/bannerimage' >
            <ListItemButton>
            <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary="BannerImages" />
            </ListItemButton>
            </Link>
          </React.Fragment>
          <Divider sx={{ my: 1 }} />
          <React.Fragment>
            <ListSubheader component="div" inset>
              Saved reports
            </ListSubheader>
            <ListItemButton>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Current month" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Last quarter" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Year-end sale" />
            </ListItemButton>
          </React.Fragment>
        </List>
      </div>
    </div>
  );
}

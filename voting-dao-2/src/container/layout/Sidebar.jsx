import React from "react";
import Paper from '@mui/material/Paper';
import {
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
function Sidebar() {

  const { pathname } =  useLocation();
  const navigate = useNavigate();

  return (
      <Paper elevation={2} className="sidebar">
        <div style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}>
          <div className="d-flex flex-column align-items-start">
            <div className="p-4">
          <div className="side-menu-img">
            <img style={{ width: "100%", height: "80px", position: "relative", borderRadius: '20px', overflow: 'hidden' }} 
            src={require("../../asset/logo.svg").default}/>
          </div>
          </div>
            <div className="side">
              <List component="nav" aria-labelledby="nested-list-subheader">
                    <ListItemButton onClick={()=> navigate('/proposals')}  className={pathname == "/proposals" ? "active" : ""}>
                      <ListItemText>
                          Proposals
                      </ListItemText>
                    </ListItemButton>
                   {<ListItemButton onClick={()=> navigate('/createproposal')} className={pathname == "/createproposal" ? "active" : ""}>
                      <ListItemText>
                          Create Proposal
                      </ListItemText>
                    </ListItemButton>}
                    <ListItemButton onClick={()=> navigate('/about')} className={pathname == "/about" ? "active" : ""}>
                      <ListItemText>
                          About
                      </ListItemText>
                    </ListItemButton >
              </List>
            </div>
          </div>
        </div>  
      </Paper> 
  );
}

export default Sidebar;
import { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { walletStatus } from "../../redux/counter/counterSlice";
// import image from '../../../public/logo.svg';
function Sidebar(props) {

  const { pathname } =  useLocation();
  const navigate = useNavigate();
  const isWalletConnected = useSelector(walletStatus);
  const [open, setOpen] = useState(true);

  useEffect(() => {
  // console.log('Sidebar-usePathname', pathname);
  }, [])
  

  const handleClick = () => {
    setOpen(!open);
  };

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
                    {/* <span className="v-line" ></span> */}
                      {/* <ListItemIcon>
                        <Link to="/proposals">
                            <AiFillHome/>
                        </Link>
                      </ListItemIcon> */}
                      <ListItemText>
                        {/* <Link to="/proposals"> */}
                          Proposals
                        {/* </Link> */}
                      </ListItemText>
                    </ListItemButton>
                   {<ListItemButton onClick={()=> navigate('/createproposal')} className={pathname == "/createproposal" ? "active" : ""}>
                      {/* <span className="v-line" ></span> */}
                      {/* <ListItemIcon>
                        <Link to="/createproposal">
                            <FaTruckMoving/>
                        </Link>
                      </ListItemIcon> */}
                      <ListItemText>
                        {/* <Link to="/createproposal"> */}
                          Create Proposal
                        {/* </Link> */}
                      </ListItemText>
                    </ListItemButton>}
                    <ListItemButton onClick={()=> navigate('/about')} className={pathname == "/about" ? "active" : ""}>
                    {/* <span className="v-line" ></span> */}
                      {/* <ListItemIcon>
                        <Link to="/about">
                            <FaTicketAlt/>
                        </Link>
                      </ListItemIcon> */}
                      <ListItemText>
                        {/* <Link to="/about"> */}
                          About
                          {/* </Link> */}
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
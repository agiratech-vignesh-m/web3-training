import Navigationbar from "./navigationbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import {  useLocation } from 'react-router-dom';
import './layout.scss';
import { walletStatus } from "../../redux/counter/counterSlice";
import { useSelector } from "react-redux";

const Layout = () => {
  const location = useLocation();
  const isWalletConnected = useSelector(walletStatus);

  return (
    <div className="layout-flex">
      <aside className="h-screen sticky top-0">
          <Sidebar />
      </aside>
      <main className='main-container'>
        <div className="main-div">
          <Navigationbar /> 
          <Outlet />
          {/* <div className="container" 
          style={{ margin:  location.pathname ==='/proposals'? "1rem" : !isWalletConnected? "1rem 15rem": "1rem" }}
          >
          <Box className='user-box'
                          sx={{
                            width: '96%',
                            height: (location.pathname ==='/proposaldetail' || !isWalletConnected)? "auto" : '80vh',
                            overflow: 'overlay',
                      }}
                    >   
                    </Box>
          </div> */}
        </div>
      </main>
    </div>
  );
}

export default Layout;
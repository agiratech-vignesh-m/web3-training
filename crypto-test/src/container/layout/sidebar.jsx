import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const drawerWidth = 300;

function Sidebar() {

  const navigate = useNavigate();
  const {pathname} = useLocation();
  
  return (
    <Box sx={{ display: 'flex'}} className="sidebar">
      {/* <AppBar position="static">
      <Toolbar>
        <Typography variant="h4">
          Navbar
        </Typography>
          <div >
            <Button>
              Connect Wallet
            </Button>
          </div>
      </Toolbar>
      <CssBaseline />
      </AppBar> */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: 'rgb(110, 212, 253)'
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {/* <Toolbar /> */}
        {/* <Divider /> */}
        <div style={{ textAlign: 'center' }}>
          <img src={require('../../asset/edited.png') }  width={'180px'} />
        </div>
        <List component="nav" aria-labelledby="nested-list-subheader" style={{ backgroundColor: "#6ED4FD", padding: "20px", marginTop: '5%'}}>
                    <ListItemButton onClick={()=> navigate('/dashboard')}  className={pathname == "/dashboard" ? "active" : "" }>
                      <ListItemText
                          disableTypography
                          primary={<Typography variant="body5" style={{ fontWeight: 700}}> Dashboard </Typography>}>
                      </ListItemText>
                    </ListItemButton>
                   {<ListItemButton onClick={()=> navigate('/student_upload_1')} className={pathname == "/student_upload_1" ? "active" : ""}>
                      <ListItemText
                          disableTypography
                          primary={<Typography variant="body5" style={{ fontWeight: 700}}> Student upload to L1 </Typography>}>
                      </ListItemText>
                    </ListItemButton>}
                    <ListItemButton onClick={()=> navigate('/student_upload_2')} className={pathname == "/student_upload_2" ? "active" : ""}>
                      <ListItemText
                        disableTypography
                        primary={<Typography variant="body5" style={{ fontWeight: 700}}> Student upload to L2 </Typography>}>
                      </ListItemText>
                    </ListItemButton >
                    <ListItemButton onClick={()=> navigate('/reward_docs_upload')}  className={pathname == "/reward_docs_upload" ? "active" : ""}>
                      <ListItemText
                        disableTypography
                        primary={<Typography variant="body5" style={{ fontWeight: 700}}> Reward Document upload </Typography>}>
                          Reward Document upload
                      </ListItemText>
                    </ListItemButton>
                    <ListItemButton onClick={()=> navigate('/load_info')}  className={pathname == "/load_info" ? "active" : ""}>
                      <ListItemText
                        disableTypography
                        primary={<Typography variant="body5" style={{ fontWeight: 700}}> Loan Information </Typography>}>
                      </ListItemText>
                    </ListItemButton>
              </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}

export default Sidebar;
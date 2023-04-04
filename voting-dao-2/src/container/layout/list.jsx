import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { ListItemButton, ListItemIcon } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';

export function AlignItemsList() {
  const navigate = useNavigate();

  return (
    <List className='menu-popup' sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper'}}>
      <ListItem alignItems="flex-start" className='menu-list-item' onClick={() => navigate('/proposals')}>
        <ListItemText
          primary="Proposals List"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
              <span className="pp">List all proposal with status of proposal.</span>
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      {/* <Divider component="li" /> */}
      <ListItem alignItems="flex-start" className='menu-list-item'  onClick={() => navigate('/createproposal')}>
        <ListItemText
          primary="Create Proposal"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
              <span className="pp">Create a proposal with the required information.</span>
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}

export const XSMenuList = ({ closeDrawer, closeDrawerCreate }) => {
  const navigate = useNavigate();
  return (
    <List className='menu-popup' sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper'}}>
      <ListItem alignItems="flex-start" className='menu-list-item' onClick={closeDrawer}>
        <ListItemText
          primary="Proposals List"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
              <span className="m-p">List all proposal with status of proposal.</span>
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider component="li" />
      <ListItem alignItems="flex-start" className='menu-list-item'  onClick={closeDrawerCreate}>
        <ListItemText
          primary="Create Proposal"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
              <span className="m-p">Create a proposal with the required information.</span>
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
};
import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import logo from '../../asset/token_new.png';

export default function ErrorPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
        backgroundColor: ''
      }}
    >
      <Typography variant="h2" sx={{ color: '#ff0000', mb: 4 }}>
        Loan application rejected by L1 approver...!  
      </Typography>
    </Box>
  );
}

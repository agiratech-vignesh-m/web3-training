import { Card, Typography, CardContent, Button   } from '@mui/material';
import TimelineDot from '@mui/lab/TimelineDot';
import React from 'react';
import './cards.scss';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ListCard = ({ listItems, index }) => {
    const { title, description, start_date, end_date, proposalId, isActive } = listItems;
    // console.log("listItems", listItems);
    // console.log("proposalId", proposalId);
    const location = useNavigate();

    function dateFormat(date) {
        const newDate = new Date(date);
        const UsFormatter = new Intl.DateTimeFormat('en-US');
        return UsFormatter.format(newDate);
    }

    return (
        <Card className='list-card' onClick={()=> location('/proposaldetail', {state: { title, description, start_date, end_date, proposalId, isActive }})} >
            <CardContent style={{ textAlign: 'center' }}>
                <Typography className="card-title" gutterBottom>
                    <span > {title} </span>
                    <span>{isActive? <Button disableRipple className='card-btn card-btn-active' > Active </Button> : <Button className='card-btn card-btn-closed' > Closed </Button>}</span>
                </Typography>
                <Typography className='card-desc'>
                    {description}
                </Typography>
                <Typography variant="body2" className='card-date'>
                    <span> <span className='card-date-label'>Start Date: </span> {dateFormat(start_date)}</span> 
                    <span> <span className='card-date-label'>End Date: </span>{dateFormat(end_date)}</span>
                </Typography>
            </CardContent>
        </Card>
    )
}

export default ListCard
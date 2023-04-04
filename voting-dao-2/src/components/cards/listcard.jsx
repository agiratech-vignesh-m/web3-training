import { Card, Typography, CardContent, Button } from '@mui/material';
import React from 'react';
import './cards.scss';
import { useNavigate } from 'react-router-dom';
import { ProposalStatus } from '../../constant/helpText';

const ListCard = ({ listItems }) => {
    const { title, description, start_date, end_date, proposalId, isActive } = listItems;
    const location = useNavigate();
    function dateFormat(date) {
        const newDate = new Date(date);
        const UsFormatter = new Intl.DateTimeFormat('en-US');
        return UsFormatter.format(newDate);
    }

    return (
        <Card className='list-card' onClick={() => location('/proposaldetail', { state: { title, description, start_date, end_date, proposalId, isActive } })} >
            <CardContent style={{ textAlign: 'center' }} className="list-card-cont" >
                <Typography className="card-title" gutterBottom>
                    <span className="card-title-text" > {title} </span>
                    <span><Button disableRipple className='card-btn card-title-status' style={{ backgroundColor: ProposalStatus[isActive].bg }} > {ProposalStatus[isActive].status} </Button> </span>
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
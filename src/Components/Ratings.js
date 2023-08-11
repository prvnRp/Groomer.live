// StarRating.js
import React from 'react';
import { Rating } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const StarRating = ({ rating }) => {
    return (
        <div>
            {rating} <Rating name="rating" value={rating} precision={0.5} readOnly
                sx={{ '& .MuiRating-iconFilled': { color: '#fff' } }}
                emptyIcon={<StarBorderIcon style={{ color: 'white' }} />} />
        </div>
    );
};

export default StarRating;

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
} from '@mui/material';

import { Link } from 'react-router-dom';

interface propType {
  id: string;
  name: string;
  categories: string[];
  description: string;
  image?: string;
}

function BusinessCard(props: propType) {
  return (
    <Box sx={{ minWidth: 250, maxWidth: 350 }}>
      <Card sx={{ border: '2px solid black' }}>
        <CardMedia
          component="img"
          alt="business logo"
          height="200"
          image={props.image}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent>
          <Typography variant="h5" component="p" sx={{ fontWeight: 700 }}>
            {props.name}
          </Typography>
          <Typography
            component="p"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {props.description}
          </Typography>
          <Typography component="p">{props.categories}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" component={Link} to={`/business/${props.id}`}>
            View Business
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default BusinessCard;

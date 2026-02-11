import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Icon,
} from '@mui/material';

import { Link } from 'react-router-dom';

interface propType {
  id: string;
  name: string;
  categories: string[];
  description: string;
  address: string;
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
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, py: 1 }}>
            {props.categories.map((category) => (
              <Typography
                key={category}
                component="p"
                sx={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  border: '1px solid',
                  px: 1,
                  borderColor: 'primary.main',
                }}
              >
                {category}
              </Typography>
            ))}
          </Box>
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
          <Box sx={{ display: 'flex', pt: 2 }}>
            <Typography
              component="p"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                fontStyle: 'italic',
              }}
            >
              {props.address}
            </Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="contained"
            disableElevation
            component={Link}
            to={`/business/${props.id}`}
          >
            View Business
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default BusinessCard;

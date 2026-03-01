import { useTheme } from '@mui/material/styles';
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

import defaultPhoto from '/images/default-photo.png';

interface propType {
  id: string;
  name: string;
  categories: string[];
  description: string;
  address: string;
  image?: string;
  searchTerm?: string;
}

function BusinessCard(props: propType) {
  const theme = useTheme();
  //highlight search terms in the business cards
  function highlight(text: string, term: string) {
    if (!term) return text; //if no searchterm, just return the text as is
    //escape special characters in the search term for regex
    const regex = new RegExp(
      `(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
      'gi'
    );
    //loop through the parts of the text
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        //wrap search term matches in a higlight
        <span
          key={i}
          style={{ backgroundColor: theme.palette.secondary.light }}
        >
          {part}
        </span>
      ) : (
        //non-matching text is returned as is
        part
      )
    );
  }

  return (
    <Box sx={{ minWidth: 250, maxWidth: 350 }}>
      <Card sx={{ border: '2px solid black', borderRadius: 2 }}>
        <CardMedia
          component="img"
          alt="business logo"
          height="200"
          image={props.image || defaultPhoto}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent>
          <Typography
            variant="h5"
            component="p"
            sx={{ fontWeight: 700, color: 'primary.main' }}
          >
            {highlight(props.name, props.searchTerm || '')}
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
            {highlight(props.description, props.searchTerm || '')}
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
              {highlight(props.address, props.searchTerm || '')}
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

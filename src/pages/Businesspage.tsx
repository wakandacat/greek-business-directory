import { useParams, Link } from 'react-router-dom';
import businessData from '../data/businesses-en.json';
import type { Business } from '../types/Business';
import { Container, Typography, Box, Toolbar } from '@mui/material';

function Businesspage() {
  //grab the current business' id from the url path on page load
  const { id } = useParams<{ id: string }>();
  const currentBusiness = businessData.find(
    (param: Business) => param.id === id
  );

  //check if the business value is undefined
  if (!currentBusiness) {
    return (
      <Container sx={{ py: 15 }}>
        <Typography variant="h1" component="h1">
          Business does not exist. Return to home.
        </Typography>
      </Container>
    );
  }

  //otherwise, return the business data
  return (
    <Container sx={{ py: 15 }}>
      <Box>
        <Toolbar component={Link} to={'/'}>
          <Typography variant="h4" component="p" sx={{ px: 2 }}>
            Return to Home
          </Typography>
        </Toolbar>
      </Box>
      <Typography variant="h1" component="h1">
        {currentBusiness.name}
      </Typography>
      <img src={currentBusiness.image} />
      <Typography component="p">{currentBusiness.description}</Typography>
      <Typography component="p">{currentBusiness.categories}</Typography>
      <Typography component="p">{currentBusiness.address}</Typography>
      <Typography component="p">{currentBusiness.phone}</Typography>
      <Typography component="p">{currentBusiness.email}</Typography>
      <Typography component="p">{currentBusiness.hours.friday}</Typography>
      <Typography component="p">{`${currentBusiness.coordinates.lat} , ${currentBusiness.coordinates.lng}`}</Typography>
    </Container>
  );
}

export default Businesspage;

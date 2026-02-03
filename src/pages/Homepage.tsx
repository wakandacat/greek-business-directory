import { Container, Typography } from '@mui/material';

function HomePage() {
  return (
    <Container sx={{ display: 'flex', flexDirection: 'flex-col', py: 10 }}>
      <Typography variant="h1" component="h1">
        Homepage
      </Typography>
    </Container>
  );
}

export default HomePage;

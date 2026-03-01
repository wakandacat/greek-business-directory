import { AppBar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar color="secondary" sx={{ display: 'relative' }}>
      {/* <Box
        sx={{
          justifyContent: 'space-between',
          display: 'flex',
          flexDirection: 'row',
        }}
      > */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          px: 1,
          py: 1,
          gap: 2,
          justifyContent: { xs: 'space-between', md: 'start' },
        }}
      >
        {/* <Box
            sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}
          > */}
        <Button
          disableElevation
          variant="contained"
          color="secondary"
          component={Link}
          to={'/'}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: 'secondary.dark',
            '&:hover': {
              backgroundColor: 'secondary.light',
              color: 'black',
            },
          }}
        >
          <Box
            sx={{
              pr: 1,
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
            }}
          >
            <img
              src="/ogbd-logo.png"
              alt="site logo"
              loading="lazy"
              height="40"
            />
          </Box>
          <Typography
            variant="h6"
            component="p"
            sx={{ display: { xs: 'none', md: 'block' } }}
          >
            Ottawa Greek Business Directory
          </Typography>
          <Typography
            variant="h6"
            component="p"
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            Home
          </Typography>
        </Button>
        {/* </Box> */}

        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to={'/contact'}
          disableElevation
          sx={{
            backgroundColor: 'secondary.dark',
            '&:hover': {
              backgroundColor: 'secondary.light',
              color: 'black',
            },
          }}
        >
          <Typography variant="h6" component="p">
            Contact
          </Typography>
        </Button>
      </Box>
      {/* <Button variant="contained" color="secondary" disableElevation>
          <Typography variant="h6" component="p">
            Language
          </Typography>
        </Button> */}
      {/* </Box> */}
    </AppBar>
  );
}

export default Navbar;

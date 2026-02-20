import { AppBar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar color="secondary" sx={{ display: 'relative' }}>
      <Box
        sx={{
          justifyContent: 'space-between',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
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
            sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}
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
                height="50"
              />
            </Box>
            <Typography variant="h6" component="p">
              Ottawa Greek Business Directory
            </Typography>
          </Button>
          {/* </Box> */}

          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to={'/contact'}
            disableElevation
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
      </Box>
    </AppBar>
  );
}

export default Navbar;

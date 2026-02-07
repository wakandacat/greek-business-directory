import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar color="secondary">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Toolbar>
          <Toolbar>
            <Box sx={{ p: 1 }}>
              <img
                src="/tempIcon.png"
                alt="site logo"
                loading="lazy"
                height="50"
              />
            </Box>

            <Button
              disableElevation
              variant="contained"
              color="secondary"
              component={Link}
              to={'/'}
            >
              <Typography variant="h6" component="p">
                Ottawa Greek Business Directory
              </Typography>
            </Button>
          </Toolbar>

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
        </Toolbar>
        <Button variant="contained" color="secondary" disableElevation>
          <Typography variant="h6" component="p">
            Language
          </Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

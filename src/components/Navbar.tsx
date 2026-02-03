import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar color="primary">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Toolbar>
          <Toolbar component={Link} to={'/'}>
            <img src="/tempIcon.png" alt="site logo" loading="lazy" />
            <Typography variant="h4" component="p" sx={{ px: 2 }}>
              Ottawa Greek Business Directory
            </Typography>
          </Toolbar>
          <Box component={Link} to={'/contact'}>
            <Typography variant="h4" component="p" sx={{ px: 2 }}>
              Contact
            </Typography>
          </Box>
        </Toolbar>
        <Button variant="text" color="secondary">
          <Typography variant="h4" component="p" sx={{ px: 2 }}>
            Language
          </Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

import { Box, Typography, Stack, Link as MuiLink } from '@mui/material';

function Footer() {
  const currYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'secondary.main',
        color: 'text.secondary',
        p: 2,
      }}
    >
      <Stack spacing={2} textAlign={'center'}>
        <Typography variant="h6" component="h6">
          Ottawa Greek Business Directory
        </Typography>

        <Typography variant="body1" component="p">
          Built to support the{' '}
          <MuiLink
            href="https://helleniccommunity.com"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'primary.light',
            }}
          >
            Hellenic Community of Ottawa.
          </MuiLink>{' '}
          Not affiliated with any of the businesses listed.
        </Typography>

        <Typography variant="body1" component="p">
          Contact{' '}
          <MuiLink
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'primary.light',
            }}
            href="mailto:ellena.tzavelas@gmail.com"
          >
            ellena.tzavelas@gmail.com
          </MuiLink>{' '}
          for any questions and concerns.
        </Typography>

        <Typography variant="body2" component="p" sx={{ opacity: 0.6 }}>
          © {currYear} Ottawa Greek Business Directory. All rights reserved.
          Built by{' '}
          <MuiLink
            href="https://wakandacat.github.io/ellena-tzavelas/"
            rel="noopener noreferrer"
            target="_blank"
            sx={{
              color: 'primary.light',
            }}
          >
            Ellena Tzavelas
          </MuiLink>
        </Typography>
      </Stack>
    </Box>
  );
}

export default Footer;

import { Box, Typography, Stack } from '@mui/material';

function Footer() {
  const currYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'secondary.main',
      }}
    >
      <Stack spacing={2} textAlign={'center'}>
        <Typography>Ottawa Greek Business Directory</Typography>
        <Typography>Built for the Hellenic Community of Ottawa</Typography>
        <Typography>
          Contact ellena.tzavelas@gmail.com for questions and concerns
        </Typography>
        <Typography>© {currYear}</Typography>
      </Stack>
    </Box>
  );
}

export default Footer;

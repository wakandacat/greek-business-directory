import { Container, Typography, Link as MuiLink, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import ContactForm from '../components/ContactForm';

function Contact() {
  return (
    <>
      {/* return to home button */}
      <Toolbar
        sx={{
          backgroundColor: 'secondary.light',
          width: '100%',
          position: 'relative',
          top: 65,
        }}
      >
        <Link to={'/'} style={{ color: 'black', textDecoration: 'none' }}>
          <Typography variant="h6" component="p">
            ← Return to Home
          </Typography>
        </Link>
      </Toolbar>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          pb: 5,
          pt: 10,
        }}
      >
        <Typography variant="h3" component="h1" sx={{ py: 3 }}>
          About the Ottawa Greek Business Directory
        </Typography>
        <Typography component="p">
          This directory was created to help the Greek community in Ottawa
          discover and support local Greek-owned businesses. <br />
          <br />
          This project was created by{' '}
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
          , a member of the{' '}
          <MuiLink
            href="https://helleniccommunity.com"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'primary.light',
            }}
          >
            Hellenic Community of Ottawa (HCO)
          </MuiLink>{' '}
          as a passion project. Growing up within the HCO, but lacking knowledge
          about the various businesses within the community, prompted the
          creation of this resource. <br />
          <br />
          This directory is not affiliated with any of the organizations listed
          here, nor with the HCO. If you have any questions or concerns about
          the content on this site, please contact{' '}
          <MuiLink
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'primary.light',
            }}
            href="mailto:ellena.tzavelas@gmail.com"
          >
            ellena.tzavelas@gmail.com
          </MuiLink>
          .
        </Typography>
        <Typography variant="h4" component="h1" sx={{ py: 3 }}>
          Want your business on this site?
        </Typography>
        <Typography component="p">
          Fill out the form with your business information to add it to the
          system. Fields marked with an asterisk (*) are required.
        </Typography>
        <ContactForm />
      </Container>
    </>
  );
}

export default Contact;

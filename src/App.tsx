import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Homepage from './pages/Homepage';
import Businesspage from './pages/Businesspage';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Footer from './components/Footer';
import { Box } from '@mui/material';

//custom site theme
const theme = createTheme({
  palette: {
    primary: {
      //main detail colour for buttons and other standout elements
      main: '#0D5EAF',
      light: '#5595d4',
      dark: '#093a6b',
      contrastText: '#ffffff',
    },
    secondary: {
      //for navbar, footer
      main: '#1E2A3A',
      light: '#475466',
      dark: '#0f151d',
      contrastText: '#ffffff',
    },
    background: {
      paper: '#ffffff',
      default: '#F7F8FA',
    },
    text: {
      primary: '#2C2C2C',
      secondary: '#ffffff',
    },
  },
  typography: {
    button: {
      textTransform: 'none', // no uppercase
      fontWeight: 500,
      textDecoration: 'none', //no underline for links
    },
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          {/* root element */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
              overflowX: 'hidden',
              scrollBehavior: 'smooth',
            }}
          >
            <Navbar />
            <Box sx={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/business/:id" element={<Businesspage />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </Box>
            <Footer />
          </Box>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;

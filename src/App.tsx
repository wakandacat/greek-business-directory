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
      main: '#1e11d4',
      light: '#1e11d4',
      dark: '#1e11d4',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#abcbff',
      light: '#abcbff',
      dark: '#abcbff',
      contrastText: '#000000',
    },
  },
  typography: {
    button: {
      textTransform: 'none', // no uppercase
      fontWeight: 500,
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

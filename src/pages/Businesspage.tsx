import { useParams, Link } from 'react-router-dom';
import businessData from '../data/businesses-en.json';
import type { Business, DayOfWeek } from '../types/Business';
import defaultPhoto from '/images/default-photo.jpg';
import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Toolbar,
  Link as MuiLink,
  Button,
} from '@mui/material';

function Businesspage() {
  //grab the current business' id from the url path on page load
  const { id } = useParams<{ id: string }>();
  const currentBusiness = businessData.find(
    (param: Business) => param.id === id
  );

  const [isOpen, setIsOpen] = useState(false);

  const weekday: DayOfWeek[] = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];

  //grab the current day of the week
  const currDate: DayOfWeek = weekday[new Date().getDay()]; //monday

  useEffect(() => {
    //check on mount once
    setIsOpen(currentlyOpen());

    // check every minute
    const interval = setInterval(() => {
      setIsOpen(currentlyOpen());
    }, 60000);

    //cleanup on unmount
    return () => clearInterval(interval);
  }, [currentBusiness]);

  //ensure we are at the top of the page
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

  //assume opening hours will be given in hour:minute AM/PM format
  //reference: https://stackoverflow.com/questions/49655310/check-if-time-is-between-two-values-with-hours-and-minutes-in-javascript
  const currentlyOpen = () => {
    //grab the businesses open hours for the current day of the week
    let todayHours = currentBusiness?.hours[currDate]; //"10:00 AM - 6:00 PM" or "Closed"

    if (!todayHours || todayHours === 'Closed') {
      return false; // closed or no hours available
    }

    //split the open hours into start and end time
    const [openTime, closeTime] = todayHours.split(' - '); //"10:00 AM", "6:00 PM"
    let startTime;
    let endTime;

    //split the open and close time into hours and minutes, and convert to 24-hour format
    const [startHour, startMinute] = openTime.split(' ')[0].split(':');
    if (openTime.includes('PM')) {
      startTime =
        ((parseInt(startHour) % 12) + 12) * 60 + parseInt(startMinute); // convert to 24-hour format
    } else {
      startTime = (parseInt(startHour) % 12) * 60 + parseInt(startMinute); // convert to 24-hour format
    }

    const [endHour, endMinute] = closeTime.split(' ')[0].split(':');
    if (closeTime.includes('PM')) {
      endTime = ((parseInt(endHour) % 12) + 12) * 60 + parseInt(endMinute); // convert to 24-hour format
    } else {
      endTime = (parseInt(endHour) % 12) * 60 + parseInt(endMinute); // convert to 24-hour format
    }

    let today = new Date();
    let currTime = today.getHours() * 60 + today.getMinutes();

    if (currTime >= startTime && currTime <= endTime) {
      return true;
    } else {
      return false;
    }
  };

  //check if the business value is undefined
  if (!currentBusiness) {
    return (
      <>
        {/* return to home button */}
        <Toolbar
          sx={{
            backgroundColor: 'secondary.light',
            width: '100%',
            position: 'relative',
            top: { xs: 160, md: 70 },
          }}
        >
          <Button component={Link} to={'/'} variant="text" disableElevation>
            <Typography variant="h6" component="p">
              ← Return to Home
            </Typography>
          </Button>
        </Toolbar>
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            pb: 5,
            pt: { xs: 22, md: 10 },
          }}
        >
          <Typography variant="h1" component="h1">
            Business info unavailable. Return to home.
          </Typography>
        </Container>
      </>
    );
  }

  //otherwise, return the business data
  return (
    <>
      {/* return to home button */}
      <Toolbar
        sx={{
          backgroundColor: 'secondary.light',
          width: '100%',
          position: 'relative',
          top: { xs: 160, md: 70 },
        }}
      >
        <Button component={Link} to={'/'} variant="text" disableElevation>
          <Typography variant="h6" component="p">
            ← Return to Home
          </Typography>
        </Button>
      </Toolbar>

      {/* main content */}
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          pb: 5,
          pt: { xs: 22, md: 10 },
        }}
      >
        <Typography variant="h1" component="h1">
          {currentBusiness.name}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, py: 1 }}>
          {currentBusiness.categories.map((category) => (
            <Typography
              key={category}
              component="p"
              sx={{
                fontSize: '0.8rem',
                fontWeight: 700,
                border: '1px solid',
                px: 1,
                borderColor: 'primary.main',
              }}
            >
              {category}
            </Typography>
          ))}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            pb: 2,
          }}
        >
          <img
            src={currentBusiness.image || defaultPhoto}
            style={{
              height: 300,
              objectFit: 'cover',
            }}
          />
          <Typography variant="h5" component="p">
            {currentBusiness.description}
          </Typography>
        </Box>

        {/* info and map */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row-reverse' },
            gap: 1,
            justifyContent: 'space-between',
          }}
        >
          {/* info */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', justifyItems: 'center' }}>
              <Typography component="pre" sx={{ fontWeight: 900 }}>
                Address:{' '}
              </Typography>
              <Typography component="p">{currentBusiness.address}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyItems: 'center' }}>
              <Typography component="pre" sx={{ fontWeight: 900 }}>
                Phone:{' '}
              </Typography>
              <Typography component="p">{currentBusiness.phone}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyItems: 'center' }}>
              <Typography component="pre" sx={{ fontWeight: 900 }}>
                Email:{' '}
              </Typography>
              <Typography component="p">
                {currentBusiness.email || 'No email available'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyItems: 'center' }}>
              <Typography component="pre" sx={{ fontWeight: 900 }}>
                Website:{' '}
              </Typography>
              <MuiLink
                href={currentBusiness.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {currentBusiness.website || 'No website available'}
              </MuiLink>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyItems: 'center',
              }}
            >
              <Typography component="p" sx={{ fontWeight: 900 }}>
                Hours:{' '}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {weekday.map((day) => (
                  <Typography key={day} component="p">
                    {`${day.charAt(0).toUpperCase() + day.slice(1)}: ${currentBusiness.hours[day]}`}
                    {day === currDate && (
                      <Typography
                        component="span"
                        sx={{
                          fontWeight: 700,
                          color: isOpen ? 'green' : 'red',
                          ml: 1,
                        }}
                      >
                        {isOpen ? 'Currently Open' : 'Currently Closed'}
                      </Typography>
                    )}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Box>

          {/* map */}
          <Box
            sx={{
              height: 400,
              width: 400,
              borderRadius: 2,
              overflow: 'hidden',
              mb: 2,
              border: '1px solid',
              borderColor: 'primary.main',
            }}
          >
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              src={`https://maps.google.com/maps?q=${currentBusiness.coordinates.lat},${currentBusiness.coordinates.lng}&output=embed`}
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Businesspage;

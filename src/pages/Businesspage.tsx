import { useParams, Link } from 'react-router-dom';
import businessData from '../data/businesses-en.json';
import type { Business } from '../types/Business';
import type { WeekDay } from '../data/constants';
import { WEEKDAY } from '../data/constants';
import defaultPhoto from '/images/default-photo.png';
import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Toolbar,
  Link as MuiLink,
  Button,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import ReactGA from 'react-ga4';

function Businesspage() {
  //grab the current business' id from the url path on page load
  const { id } = useParams<{ id: string }>();
  const currentBusiness: Business | undefined = businessData.find(
    (param: Business) => param.id === id
  );

  const [isOpen, setIsOpen] = useState(false);

  //grab the current day of the week
  const currDate: WeekDay = WEEKDAY[new Date().getDay()]; //monday

  useEffect(() => {
    //check on mount once
    setIsOpen(currentlyOpen());

    //track this page view in Google Analytics
    if (currentBusiness) {
      //ensure currentbusiness is defined
      ReactGA.gtag('event', 'business_view', {
        business_name: currentBusiness.name,
        business_id: currentBusiness.id,
      });
    }

    // check every minute
    const interval = setInterval(() => {
      setIsOpen(currentlyOpen());
    }, 60000);

    //cleanup on unmount
    return () => clearInterval(interval);
  }, [currentBusiness]);

  //track business page clicks in google analytics
  function trackClick(action: string) {
    if (currentBusiness) {
      ReactGA.gtag('event', 'engagement_click', {
        engagement_action: action,
        business_name: currentBusiness.name,
        business_id: currentBusiness.id,
      });
    }
  }

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
            top: { xs: 160, md: 60 },
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
          top: { xs: 160, md: 60 },
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
        {/* name header and industries */}
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{ color: 'primary.main', fontWeight: 700 }}
          >
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
        </Box>

        {/* grid info container */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
            gap: 4,
          }}
        >
          {/* image container */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              height: '100%',
            }}
          >
            <Card
              sx={{
                borderRadius: 2,
                overflow: 'hidden',
                mb: 2,
                border: '1px solid',
                borderColor: 'primary.main',
              }}
            >
              <CardContent>
                <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                  Description
                </Typography>
                <img
                  src={currentBusiness.image || defaultPhoto}
                  style={{
                    width: '100%',
                    height: 300,
                    objectFit: 'cover',
                  }}
                />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                  }}
                >
                  <Typography variant="h5" component="p">
                    {currentBusiness.description}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
          {/* location container */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              height: '100%',
            }}
          >
            <Card
              sx={{
                borderRadius: 2,
                overflow: 'hidden',
                mb: 2,
                border: '1px solid',
                borderColor: 'primary.main',
              }}
            >
              <CardContent>
                <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                  Location
                </Typography>
                <Box
                  sx={{
                    width: '100%',
                    height: 300,
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
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(currentBusiness.address)}&output=embed`}
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    onClick={() => trackClick('Map Click')}
                  />
                </Box>

                <Box sx={{ display: 'flex', justifyItems: 'center' }}>
                  <Typography component="pre" sx={{ fontWeight: 900 }}>
                    Address:{' '}
                  </Typography>
                  <Typography component="p">
                    {currentBusiness.address}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* contact info */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              height: '100%',
            }}
          >
            <Card
              sx={{
                borderRadius: 2,
                overflow: 'hidden',
                mb: 2,
                border: '1px solid',
                borderColor: 'primary.main',
              }}
            >
              <CardContent>
                <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                  Contact
                </Typography>
                <Box sx={{ display: 'flex', justifyItems: 'center' }}>
                  <Typography component="pre" sx={{ fontWeight: 900 }}>
                    Contact:{' '}
                  </Typography>
                  <Typography component="p">
                    {currentBusiness.contact}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyItems: 'center' }}>
                  <Typography component="pre" sx={{ fontWeight: 900 }}>
                    Phone:{' '}
                  </Typography>
                  {currentBusiness.phone ? (
                    <MuiLink
                      href={`tel:${currentBusiness.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackClick('Phone Click')}
                    >
                      {currentBusiness.phone}
                    </MuiLink>
                  ) : (
                    <Typography component="p">
                      No phone number available
                    </Typography>
                  )}
                </Box>
                <Box sx={{ display: 'flex', justifyItems: 'center' }}>
                  <Typography component="pre" sx={{ fontWeight: 900 }}>
                    Email:{' '}
                  </Typography>
                  {currentBusiness.email ? (
                    <MuiLink
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`mailto:${currentBusiness.email}`}
                      onClick={() => trackClick('Email Click')}
                    >
                      {currentBusiness.email}
                    </MuiLink>
                  ) : (
                    <Typography component="p">No email available</Typography>
                  )}
                </Box>
                <Box sx={{ display: 'flex', justifyItems: 'center' }}>
                  <Typography component="pre" sx={{ fontWeight: 900 }}>
                    Website:{' '}
                  </Typography>
                  {currentBusiness.website ? (
                    <MuiLink
                      href={currentBusiness.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackClick('Website Click')}
                    >
                      {currentBusiness.website}
                    </MuiLink>
                  ) : (
                    <Typography component="p">No website available</Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* hours info */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              height: '100%',
            }}
          >
            <Card
              sx={{
                borderRadius: 2,
                overflow: 'hidden',
                mb: 2,
                border: '1px solid',
                borderColor: 'primary.main',
              }}
            >
              <CardContent>
                <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                  Hours
                </Typography>

                <Box
                  sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}
                >
                  {WEEKDAY.map((day) => (
                    <Box
                      key={day}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        ...(day === currDate && {
                          backgroundColor: '#E3F2FD',
                          color: 'primary.main',
                        }),
                      }}
                    >
                      <Typography
                        component="p"
                        sx={{ fontWeight: day === currDate ? 700 : 'normal' }}
                      >
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
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Businesspage;

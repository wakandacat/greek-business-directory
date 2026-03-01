import {
  Typography,
  Box,
  TextField,
  Button,
  Select,
  InputLabel,
  FormControl,
  ListItemText,
  Checkbox,
  MenuItem,
  FormControlLabel,
} from '@mui/material';
import { CATEGORIES } from '../data/constants';
import { useState, type FormEvent } from 'react';
import type { SelectChangeEvent } from '@mui/material/Select';
import dayjs from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import type { HoursRecord, DayHours } from '../types/Business';
import ReactGA from 'react-ga4';

function ContactForm() {
  const [industryArr, setIndustryArr] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof industryArr>) => {
    const value = event.target.value;

    if (typeof value === 'string') {
      //split it by commas into an array
      setIndustryArr(value.split(','));
    }
    //if its already an array, use it as-is
    else {
      setIndustryArr(value);
    }
  };

  //default values for timepicker fields
  const defaultHours = (): DayHours => ({
    open: dayjs().hour(9).minute(0),
    close: dayjs().hour(17).minute(0),
    closed: false,
  });

  //business hours time picker values
  const [scheduleMode, setScheduleMode] = useState<string>('weekday-weekend');
  const [hours, setHours] = useState<HoursRecord>({
    'Monday-Friday': defaultHours(),
    'Saturday-Sunday': defaultHours(),
  });

  //toggle between  different hour schedules and show/hide the timepicker fields
  const handleScheduleChange = (event: SelectChangeEvent) => {
    const mode = event.target.value;
    setScheduleMode(mode);

    if (mode === 'everyday') {
      setHours({ 'Every-Day': defaultHours() });
    } else if (mode === 'weekday-weekend') {
      setHours({
        'Monday-Friday': defaultHours(),
        'Saturday-Sunday': defaultHours(),
      });
    } else if (mode === 'individual') {
      setHours({
        Monday: defaultHours(),
        Tuesday: defaultHours(),
        Wednesday: defaultHours(),
        Thursday: defaultHours(),
        Friday: defaultHours(),
        Saturday: defaultHours(),
        Sunday: defaultHours(),
      });
    }
  };

  //submit the form to netlify
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //google analytics form submission tracking
    ReactGA.gtag('event', 'form_submission', {
      form_type: 'contact',
    });

    //check form info
    const hasInvalidHours = Object.values(hours).some((times) => {
      if (times.closed) return false;
      return !times.open || !times.close;
    });

    if (hasInvalidHours) {
      alert('Please complete all business hours or mark days as closed.');
      return;
    }

    //check industry selection
    if (industryArr.length === 0) {
      alert('Please select at least one business industry.');
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/', {
        method: 'POST',
        body: formData, // send as FormData for file uploads
      });

      if (response.ok) {
        alert('Thank you! Your submission has been received.');
        form.reset();
        setIndustryArr([]);
        setHours({ 'Every-Day': defaultHours() });
        setScheduleMode('weekday-weekend');
      } else {
        const errorText = await response.text();
        console.error('Form submission error:', errorText);
        alert('Error submitting form. Please try again.');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Error: ' + error);
    }
  };

  return (
    /* contact form with netlify */
    /* https://www.netlify.com/blog/2017/07/20/how-to-integrate-netlifys-form-handling-in-a-react-app/ */
    <Box
      component="form"
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
        gap: 2,
        mt: 3,
      }}
    >
      {/* value here must match form name in index.html and form name above for netlify to work */}
      <input type="hidden" name="form-name" value="contact" />
      <input type="hidden" name="bot-field" />
      {/* erialize hours into hidden fields for Netlify since it only takes in name/value pairs */}
      {Object.entries(hours).map(([dayLabel, times]) => (
        <input
          key={dayLabel}
          type="hidden"
          name={`hours-${dayLabel}`}
          value={
            times.closed
              ? 'Closed'
              : `${times.open ? times.open.format('h:mm A') : ''} - ${times.close ? times.close.format('h:mm A') : ''}`
          }
        />
      ))}
      <Box>
        <InputLabel id="businessName" sx={{ color: 'text.primary' }}>
          Business Name *
        </InputLabel>
        <TextField
          type="text"
          id="business-name"
          name="businessname"
          placeholder="Business Name"
          required
          fullWidth
        />
      </Box>

      <Box>
        <InputLabel id="businessPhone" sx={{ color: 'text.primary' }}>
          Business Phone
        </InputLabel>
        <TextField
          id="business-phone"
          name="businessphone"
          placeholder="613 456 7890"
          fullWidth
          type="tel"
          inputProps={{
            minLength: 10,
            maxLength: 20,
          }}
        />
      </Box>

      <Box>
        <InputLabel id="businessEmail" sx={{ color: 'text.primary' }}>
          Business Email *
        </InputLabel>
        <TextField
          id="business-email"
          name="businessemail"
          placeholder="business@gmail.com"
          type="email"
          required
          fullWidth
        />
      </Box>

      <Box>
        <InputLabel id="businessAddress" sx={{ color: 'text.primary' }}>
          Business Address *
        </InputLabel>
        <TextField
          type="text"
          id="business-address"
          name="businessaddress"
          placeholder="1234 Main St, Ottawa, ON"
          required
          fullWidth
        />
      </Box>

      <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 2' } }}>
        <InputLabel sx={{ color: 'text.primary' }}>Business Hours *</InputLabel>

        {/* schedule mode selector */}
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <Select value={scheduleMode} onChange={handleScheduleChange}>
            <MenuItem value="everyday">Same hours every day</MenuItem>
            <MenuItem value="weekday-weekend">Weekday / Weekend</MenuItem>
            <MenuItem value="individual">Different hours each day</MenuItem>
          </Select>
        </FormControl>

        {/* open and close TimePickers for each group */}
        {Object.keys(hours).map((dayLabel) => (
          <Box
            key={dayLabel}
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
              gap: 2,
              mb: 2,
              flexWrap: 'wrap',
              backgroundColor: '#e2e2e2',
              pl: 2,
            }}
          >
            <Typography sx={{ color: 'primary.main' }}>
              {dayLabel + ':'}
            </Typography>

            <FormControlLabel
              control={
                <Checkbox
                  checked={hours[dayLabel].closed}
                  sx={{ color: 'secondary.main' }}
                  color="secondary"
                  onChange={(e) =>
                    setHours((prev) => ({
                      ...prev,
                      [dayLabel]: {
                        ...prev[dayLabel],
                        closed: e.target.checked,
                      },
                    }))
                  }
                />
              }
              label="Closed"
            />
            {!hours[dayLabel].closed && (
              <>
                <TimePicker
                  label="Open"
                  value={hours[dayLabel].open}
                  slotProps={{
                    textField: {
                      required: true,
                      sx: {
                        '& .MuiInputLabel-root': {
                          color: 'text.primary', // change the label colour
                        },
                      },
                    },
                  }}
                  onChange={(newVal) =>
                    setHours((prev) => ({
                      ...prev,
                      [dayLabel]: { ...prev[dayLabel], open: newVal },
                    }))
                  }
                />
                <TimePicker
                  label="Close"
                  value={hours[dayLabel].close}
                  slotProps={{
                    textField: {
                      required: true,
                      sx: {
                        '& .MuiInputLabel-root': {
                          color: 'text.primary', // change the label colour
                        },
                      },
                    },
                  }}
                  onChange={(newVal) =>
                    setHours((prev) => ({
                      ...prev,
                      [dayLabel]: { ...prev[dayLabel], close: newVal },
                    }))
                  }
                />
              </>
            )}
          </Box>
        ))}
      </Box>

      <Box>
        <InputLabel id="businessIndustries" sx={{ color: 'text.primary' }}>
          Business Industries *
        </InputLabel>
        <FormControl fullWidth required>
          <Select
            id="industry-select"
            multiple
            type="text"
            name="businessindustries"
            aria-placeholder="Business Industries"
            value={industryArr}
            onChange={handleChange}
            renderValue={(selected) => selected.join(', ')}
          >
            {CATEGORIES.map((category) => (
              <MenuItem key={category} value={category}>
                <Checkbox
                  checked={industryArr.includes(category)}
                  sx={{ color: 'secondary.main' }}
                  color="secondary"
                />
                <ListItemText primary={category} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box>
        <InputLabel id="businessWebsite" sx={{ color: 'text.primary' }}>
          Business Website
        </InputLabel>
        <TextField
          type="text"
          id="business-website"
          name="businesswebsite"
          placeholder="website.com"
          fullWidth
        />
      </Box>

      {/* <Box>
        <InputLabel id="businessImage" sx={{ color: 'text.primary' }}>
          Business Image or Logo
        </InputLabel>
        <TextField
          id="business-image"
          type="file"
          name="businessimage"
          placeholder="Business Image or Logo"
          fullWidth
        />
      </Box> */}

      <Box>
        <InputLabel id="businessDesc" sx={{ color: 'text.primary' }}>
          Business Description *
        </InputLabel>
        <TextField
          type="text"
          id="business-description"
          name="businessdescription"
          placeholder="Tell us about your business"
          multiline
          rows={4}
          required
          fullWidth
        />
      </Box>

      <Box>
        <InputLabel id="contactName" sx={{ color: 'text.primary' }}>
          Contact Person Name *
        </InputLabel>
        <TextField
          id="contact-name"
          name="contactname"
          placeholder="John Doe"
          required
          fullWidth
          type="text"
        />
      </Box>

      <Box>
        <InputLabel id="contactEmail" sx={{ color: 'text.primary' }}>
          Contact Person Email *
        </InputLabel>
        <TextField
          id="contact-email"
          name="contactemail"
          placeholder="john.doe@gmail.com"
          type="email"
          required
          fullWidth
        />
      </Box>

      <Button
        id="submit-button"
        type="submit"
        variant="contained"
        size="large"
        sx={{
          mx: { xs: 0, md: 45 },
          gridColumn: { xs: 'span 1', md: 'span 2' },
        }}
      >
        Submit
      </Button>
    </Box>
  );
}

export default ContactForm;

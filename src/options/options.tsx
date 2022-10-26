import React, { useState, Fragment } from 'react';
import ReactDOM from 'react-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import DateRangePicker from '@mui/lab/DateRangePicker';

import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import './options.css';

const App: React.FC<{}> = () => {
  const [formData, setFormData] = useState({
    resume: null,
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
    address: {
      street: '',
      postalCode: '',
      province: '',
    },
    links: [],
    education: {
      name: '',
      degree: '',
      field: '',
      gpa: '',
      dateRange: [],
    },
    experience: [{ dateRange: [null, null] }],
    projects: [],
    skills: [],
  });

  return (
    <div className='container'>
      <div className='section'>
        <div>Upload Resume</div>
        <div>
          <input type='file' />
        </div>
      </div>

      <div className='section'>
        <div>
          <div>Personal Information</div>
          <div>
            <TextField
              id='outlined-basic'
              label='First Name'
              variant='outlined'
            />
            <TextField
              id='outlined-basic'
              label='Last Name'
              variant='outlined'
            />
          </div>

          <div>
            <TextField
              id='outlined-basic'
              label='Email Address'
              variant='outlined'
            />
            <TextField
              id='outlined-basic'
              label='Phone Number'
              variant='outlined'
            />
          </div>
        </div>

        <div>
          <div>Address</div>
          <div>
            <TextField
              id='outlined-basic'
              label='Street Address'
              variant='outlined'
            />
          </div>

          <div>
            <TextField
              id='outlined-basic'
              label='Postal Code'
              variant='outlined'
            />
            <TextField
              id='outlined-basic'
              label='Province'
              variant='outlined'
            />
          </div>
        </div>

        <div className='section'>
          <div>
            <div>Links</div>
            <div>
              <TextField
                id='outlined-basic'
                label='LinkedIn URL'
                variant='outlined'
              />
              <TextField
                id='outlined-basic'
                label='GitHub URL'
                variant='outlined'
              />
            </div>

            <div>
              <TextField
                id='outlined-basic'
                label='Porfolio URL'
                variant='outlined'
              />
              <TextField
                id='outlined-basic'
                label='Other URL'
                variant='outlined'
              />
            </div>

            <button>Add link</button>
          </div>
        </div>

        <div className='section'>
          <div>
            <div>Education</div>
            <div>
              <TextField
                id='outlined-basic'
                label='University Name'
                variant='outlined'
              />
            </div>

            <div>
              <Select label='Degree'>
                <MenuItem>Vocational</MenuItem>
                <MenuItem>Associates</MenuItem>
                <MenuItem>Bachelors</MenuItem>
                <MenuItem>Masters</MenuItem>
                <MenuItem>PhD</MenuItem>
                <MenuItem>Other</MenuItem>
              </Select>
              <TextField
                id='outlined-basic'
                label='Field of Study'
                variant='outlined'
              />
            </div>
          </div>
        </div>

        <div className='section'>
          <div>
            <div>Experience</div>
            {formData.experience.map((exp) => {
              return (
                <Fragment>
                  <div>
                    <TextField
                      id='outlined-basic'
                      label='Job Title'
                      variant='outlined'
                    />

                    <TextField
                      id='outlined-basic'
                      label='Company'
                      variant='outlined'
                    />
                  </div>
                  <div>
                    <TextField
                      id='outlined-basic'
                      label='Location'
                      variant='outlined'
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      control={<Checkbox />}
                      label='Currently work here'
                    />
                  </div>

                  <DateRangePicker
                    startText='Start Date'
                    endText='End Date'
                    value={exp.dateRange}
                    onChange={(newValue) => {}}
                    renderInput={(startProps, endProps) => (
                      <React.Fragment>
                        <TextField {...startProps} />
                        <Box sx={{ mx: 2 }}> to </Box>
                        <TextField {...endProps} />
                      </React.Fragment>
                    )}
                  />

                  <div>
                    <TextField
                      placeholder='Description'
                      multiline
                      rows={4}
                      maxRows={6}
                    />
                  </div>
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(
  <LocalizationProvider dateAdapter={DateAdapter}>
    <App />
  </LocalizationProvider>,
  root
);

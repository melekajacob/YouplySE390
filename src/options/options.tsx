import React, { useState, Fragment } from 'react';
import ReactDOM from 'react-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import DateRangePicker from '@mui/lab/DateRangePicker';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import InputLabel from '@mui/material/InputLabel';
import DeleteIcon from '@mui/icons-material/Delete';

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
    skills: ['C++', 'C++', 'C', 'Python', 'C++', 'C', 'Python'],
  });

  const skillList = ['C++', 'C', 'Python'];

  return (
    <div className='container'>
      <div className='section'>
        <div className='section__title'>Upload Resume</div>
        <div>
          <input type='file' id='resumeUpload' className='hidden' />
          <label className='btn--outline' htmlFor='resumeUpload'>
            Upload
          </label>
        </div>
      </div>
      <div className='section'>
        <div className='section__sep'>
          <div className='section__title--mb'>Personal Information</div>
          <Box
            sx={{
              '& .MuiTextField-root': { m: 1, width: '45%' },
              display: 'flex',
              justifyContent: 'center',
            }}
          >
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
          </Box>

          <Box
            sx={{
              '& .MuiTextField-root': { m: 1, width: '45%' },
              display: 'flex',
              justifyContent: 'center',
            }}
          >
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
          </Box>
        </div>

        <div className='section__sep'>
          <div className='section__title--mb'>Address</div>
          <Box
            sx={{
              '& .MuiTextField-root': { m: 1, width: '93%' },
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <TextField
              id='outlined-basic'
              label='Street Address'
              variant='outlined'
            />
          </Box>

          <Box
            sx={{
              '& .MuiTextField-root': { m: 1, width: '45%' },
              display: 'flex',
              justifyContent: 'center',
            }}
          >
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
          </Box>
        </div>
      </div>
      {/* TODO: Fix links to allow for other links  */}
      <div className='section'>
        <div className='section__sep'>
          <div className='section__title--mb'>Links</div>
          <Box
            sx={{
              '& .MuiTextField-root': { m: 1, width: '45%' },
              display: 'flex',
              justifyContent: 'center',
            }}
          >
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
          </Box>

          <Box
            sx={{
              '& .MuiTextField-root': { m: 1, width: '45%' },
              display: 'flex',
              justifyContent: 'center',
            }}
          >
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
          </Box>
        </div>
      </div>

      {/* TODO: Expand education section to allow for more degree types */}
      <div className='section'>
        <div className='section__sep'>
          <div className='section__title--mb'>Education</div>
          <Box
            sx={{
              '& .MuiTextField-root': { m: 1, width: '93%' },
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <TextField
              id='outlined-basic'
              label='Institution Name'
              variant='outlined'
            />
          </Box>

          <Box
            sx={{
              '& .MuiTextField-root': { m: 1, width: '45%' },
              '& .MuiFormControl-root': { m: 1, width: '45%' },
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FormControl>
              <InputLabel id='degree'>Age</InputLabel>
              <Select id='degree' label='Degree'>
                <MenuItem>Vocational</MenuItem>
                <MenuItem>Associates</MenuItem>
                <MenuItem>Bachelors</MenuItem>
                <MenuItem>Masters</MenuItem>
                <MenuItem>PhD</MenuItem>
                <MenuItem>Other</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id='outlined-basic'
              label='Field of Study'
              variant='outlined'
            />
          </Box>
        </div>
      </div>
      <div className='section'>
        <div className='section__sep'>
          <div className='section__title--mb'>Experience</div>
          {formData.experience.map((exp) => {
            return (
              <Fragment>
                <Box
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '45%' },
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
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
                </Box>
                <Box
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '93%' },
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <TextField
                    id='outlined-basic'
                    label='Location'
                    variant='outlined'
                  />
                </Box>

                <div className='section__checkbox'>
                  <FormControlLabel
                    control={<Checkbox />}
                    label='Currently work here'
                  />
                </div>
                <Box
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '42%' },
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <DateRangePicker
                    startText='Start Date'
                    endText='End Date'
                    value={exp.dateRange}
                    onChange={(newValue) => {}}
                    renderInput={(startProps, endProps) => (
                      <React.Fragment>
                        <TextField {...startProps} />
                        <Box
                          sx={{ mx: 2, fontSize: '16px', fontWeight: 'bold' }}
                        >
                          {' '}
                          to{' '}
                        </Box>
                        <TextField {...endProps} />
                      </React.Fragment>
                    )}
                  />
                </Box>

                <Box
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '93%' },
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <TextField
                    placeholder='Description'
                    multiline
                    rows={4}
                    maxRows={6}
                  />
                </Box>
              </Fragment>
            );
          })}

          <div className='btn__group'>
            <div className='btn--action remove'>-</div>
            <div className='btn--action add'>+</div>
          </div>
        </div>
      </div>
      <div className='section'>
        <div className='section__sep'>
          <div className='section__title--mb'>Skills</div>
          <Box
            sx={{
              '& .MuiTextField-root': { m: 1, width: '93%' },
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <TextField select margin='normal' label='Skill' size='medium'>
              {skillList.map((skill) => (
                <MenuItem key={skill} value={skill}>
                  {skill}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <div className='skillsGroup'>
            {formData.skills.map((skill) => {
              return (
                <div className='skill'>
                  {skill}

                  <div className='removeSkill'>
                    <DeleteIcon />
                  </div>
                </div>
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

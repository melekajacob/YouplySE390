import React, { useState, Fragment, ChangeEvent } from 'react';
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
import ReactNotification from 'react-notifications-component';
import { notify } from './utils/Toast';
import { useStateObject } from './hooks/useStateObject';
import { v4 as uuidv4 } from 'uuid';
import 'react-notifications-component/dist/theme.css';
import './options.css';
import { PersonalInfo, Address, Link, Education, Experience } from './types';
import { VALUE_TYPE } from './constants';

const App: React.FC<{}> = () => {
  const [resume, setResume] = useState<File | null>(null);
  const [personalInfo, setPersonalInfoField] = useStateObject<PersonalInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [address, setAddressField] = useStateObject<Address>({
    street: '',
    postalCode: '',
    province: '',
  });
  const [links, setLinks] = useState<Link[]>([]);
  const [education, setEducationField] = useStateObject<Education>({
    name: '',
    degree: '',
    field: '',
    gpa: '',
    dateRange: [],
  });

  const [experience, setExperience] = useState<Experience[]>([]);
  const [skills, setSkills] = useState([]);

  const skillList = ['C++', 'C', 'Python'];

  // TODO: Integrate with Affinda
  const handleResumeUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];

    if (!file) return;

    setResume(file);
    notify('Success!', `Uploaded Resume ${file.name}`, 'success');
  };

  const onChangeHandler =
    <T,>(field: keyof T, fieldUpdater: (key: keyof T, value: any) => void) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      fieldUpdater(field, e.target.value);
    };

  const handleAddLink =
    (type: string) => (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      setLinks((links) => {
        const idx = links.findIndex((link) => link.type === type);

        if (idx == -1) {
          return [...links, { type, url: value }];
        } else {
          const newLinks = [...links];
          newLinks[idx] = { type, url: value };
          return newLinks;
        }
      });
    };

  const handleAddExperience = (idx: number) => () => {
    setExperience((oldExperience) => {
      const newExperience = [...oldExperience];
      newExperience.splice(idx, 0, {
        title: '',
        company: '',
        location: '',
        isCurrentlyWorking: false,
        dateRange: [null, null],
        description: '',
        id: uuidv4(),
      });
      return newExperience;
    });
  };

  const handleRemoveExperience = (idx: number) => () => {
    setExperience((oldExperience) => {
      const newExperience = [...oldExperience];
      newExperience.splice(idx, 1);
      console.log('NEW EXPERIENCE', newExperience);
      return newExperience;
    });
  };

  const getValueFromEvent = (e, valueType) => {
    if (valueType === VALUE_TYPE.domEvent) {
      return e.target.value;
    } else if (valueType === VALUE_TYPE.value) {
      return e;
    }
  };

  const updateExperienceField =
    (
      idx: number,
      fieldName: keyof Experience,
      valueType: VALUE_TYPE = VALUE_TYPE.domEvent
    ) =>
    (e) => {
      const value = getValueFromEvent(e, valueType);

      setExperience((experience) => {
        const newExperience = [...experience];
        newExperience[idx] = {
          ...experience[idx],
          [fieldName]:
            valueType !== VALUE_TYPE.checkbox
              ? value
              : !experience[idx].isCurrentlyWorking,
        };
        return newExperience;
      });
    };

  const handleAddSkill = (e) => {
    const value = e.target.value;

    setSkills((oldSkills) => {
      const idx = oldSkills.findIndex((skill) => skill === value);

      if (idx !== -1) return oldSkills;

      return [...oldSkills, value];
    });
  };

  const handleRemoveSkill = (skill: string) => () => {
    setSkills((oldSkills) => {
      const newSkills = [...oldSkills];
      const idx = newSkills.findIndex((candSkill) => candSkill === skill);
      newSkills.splice(idx, 1);
      return newSkills;
    });
  };

  console.log(personalInfo);
  console.log(address);
  console.log(links);
  console.log(education);
  console.log(experience);
  console.log(skills);

  return (
    <div className='container'>
      <div className='section'>
        <div className='section__title'>Upload Resume</div>
        <div>
          <label className='btn--outline' htmlFor='resumeUpload'>
            Upload
          </label>
          <input
            onChange={handleResumeUpload}
            type='file'
            id='resumeUpload'
            className='hidden'
            accept='.pdf'
          />
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
              onChange={onChangeHandler<PersonalInfo>(
                'firstName',
                setPersonalInfoField
              )}
            />
            <TextField
              id='outlined-basic'
              label='Last Name'
              variant='outlined'
              onChange={onChangeHandler<PersonalInfo>(
                'lastName',
                setPersonalInfoField
              )}
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
              onChange={onChangeHandler<PersonalInfo>(
                'email',
                setPersonalInfoField
              )}
            />
            <TextField
              id='outlined-basic'
              label='Phone Number'
              variant='outlined'
              onChange={onChangeHandler<PersonalInfo>(
                'phone',
                setPersonalInfoField
              )}
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
              onChange={onChangeHandler<Address>('street', setAddressField)}
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
              onChange={onChangeHandler<Address>('postalCode', setAddressField)}
            />
            <TextField
              id='outlined-basic'
              label='Province'
              variant='outlined'
              onChange={onChangeHandler<Address>('province', setAddressField)}
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
              onChange={handleAddLink('linkedIn')}
            />
            <TextField
              id='outlined-basic'
              label='GitHub URL'
              variant='outlined'
              onChange={handleAddLink('github')}
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
              onChange={handleAddLink('portfolio')}
            />
            <TextField
              id='outlined-basic'
              label='Other URL'
              variant='outlined'
              onChange={handleAddLink('other')}
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
              onChange={onChangeHandler<Education>('name', setEducationField)}
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
              <InputLabel id='degree'>Degree</InputLabel>
              <Select
                id='degree'
                label='Degree'
                onChange={onChangeHandler<Education>(
                  'degree',
                  setEducationField
                )}
                value={education.degree}
              >
                <MenuItem value='vocational'>Vocational</MenuItem>
                <MenuItem value='associates'>Associates</MenuItem>
                <MenuItem value='bachelors'>Bachelors</MenuItem>
                <MenuItem value='masters'>Masters</MenuItem>
                <MenuItem value='phd'>PhD</MenuItem>
                <MenuItem value='other'>Other</MenuItem>
              </Select>
            </FormControl>

            <TextField
              id='outlined-basic'
              label='Field of Study'
              variant='outlined'
              onChange={onChangeHandler<Education>('field', setEducationField)}
            />
          </Box>
        </div>
      </div>
      <div className='section'>
        <div className='section__sep'>
          <div className='section__title--mb'>Experience</div>
          {experience.map((exp, idx) => {
            return (
              <Fragment key={exp.id}>
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
                    value={exp.title}
                    onChange={updateExperienceField(idx, 'title')}
                  />

                  <TextField
                    id='outlined-basic'
                    label='Company'
                    variant='outlined'
                    value={exp.company}
                    onChange={updateExperienceField(idx, 'company')}
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
                    value={exp.location}
                    onChange={updateExperienceField(idx, 'location')}
                  />
                </Box>

                <div className='section__checkbox'>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={exp.isCurrentlyWorking}
                        onChange={updateExperienceField(
                          idx,
                          'isCurrentlyWorking',
                          VALUE_TYPE.checkbox
                        )}
                      />
                    }
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
                    onChange={updateExperienceField(
                      idx,
                      'dateRange',
                      VALUE_TYPE.value
                    )}
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
                    value={exp.description}
                    onChange={updateExperienceField(idx, 'description')}
                  />
                </Box>

                <div className='btn__group'>
                  <div
                    onClick={handleRemoveExperience(idx)}
                    className='btn--action remove'
                  >
                    -
                  </div>
                  <div
                    onClick={handleAddExperience(idx + 1)}
                    className='btn--action add'
                  >
                    +
                  </div>
                </div>

                {idx !== experience.length - 1 && <hr className='divider' />}
              </Fragment>
            );
          })}

          {experience.length === 0 && (
            <div className='btn__group'>
              {/* <div className='btn--action remove'>-</div> */}
              <div className='btn--action add' onClick={handleAddExperience(0)}>
                +
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='section'>
        <div className='section__sep'>
          <div className='section__title--mb'>Skills</div>
          <Box
            sx={{
              '& .MuiFormControl-root': { m: 1, width: '93%' },
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <FormControl>
              <InputLabel id='skill'>Select Skill</InputLabel>
              <Select id='skill' label='Select Skill' onChange={handleAddSkill}>
                {skillList.map((skill) => (
                  <MenuItem key={skill} value={skill}>
                    {skill}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <div className='skillsGroup'>
            {skills.map((skill) => {
              return (
                <div className='skill'>
                  {skill}

                  <div
                    onClick={handleRemoveSkill(skill)}
                    className='removeSkill'
                  >
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
    <ReactNotification />
    <App />
  </LocalizationProvider>,
  root
);

import React, { useState, useEffect, Fragment, ChangeEvent } from 'react';
import ReactDOM from 'react-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import DeleteIcon from '@mui/icons-material/Delete';
import ReactNotification from 'react-notifications-component';
import { notify } from './utils/Toast';
import { useStateObject } from './hooks/useStateObject';
import { v4 as uuidv4 } from 'uuid';
import 'react-notifications-component/dist/theme.css';
import './options.css';
import {
  PersonalInfo,
  Address,
  Link,
  Education,
  Experience,
  FormData,
} from '../types';
import { DEFAULT_FORM_DATA, DEFAULT_LINKS, VALUE_TYPE } from '../constants';
import { getFormData, setFormData } from '../utils/storage';
import { getFormattedDate } from '../utils/utils';

const App: React.FC<{}> = () => {
  const [resume, setResume] = useState<File | null>(DEFAULT_FORM_DATA.resume);
  const [personalInfo, setPersonalInfo, setPersonalInfoField] =
    useStateObject<PersonalInfo>(DEFAULT_FORM_DATA.personalInfo);
  const [address, setAddress, setAddressField] = useStateObject<Address>(
    DEFAULT_FORM_DATA.address
  );
  const [links, setLinks] = useState<Link[]>(DEFAULT_FORM_DATA.links);
  const [education, setEducation, setEducationField] =
    useStateObject<Education>(DEFAULT_FORM_DATA.education);

  const [experience, setExperience] = useState<Experience[]>(
    DEFAULT_FORM_DATA.experience
  );
  const [skills, setSkills] = useState<string[]>(DEFAULT_FORM_DATA.skills);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getFormData().then((data: FormData) => {
      setResume(data.resume);
      setPersonalInfo(data.personalInfo);
      setAddress(data.address);
      setLinks(data.links);
      setEducation(data.education);
      setExperience(data.experience);
      setSkills(data.skills);

      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (isLoading) return;
    const formData: FormData = {
      resume,
      personalInfo,
      address,
      links,
      education,
      experience,
      skills,
    };

    setFormData(formData);
  }, [
    resume,
    JSON.stringify(personalInfo),
    JSON.stringify(address),
    JSON.stringify(links),
    JSON.stringify(education),
    JSON.stringify(experience),
    JSON.stringify(skills),
  ]);

  const skillList = ['C++', 'C', 'Python'];

  // TODO: Integrate with Affinda
  const handleResumeUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];

    if (!file) return;

    setResume(file);
    notify('Success!', `Uploaded Resume ${file.name}`, 'success');
  };

  const onChangeHandler =
    <T,>(
      field: keyof T,
      fieldUpdater: (key: keyof T, value: any) => void,
      valueType: VALUE_TYPE = VALUE_TYPE.domEvent
    ) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = valueType === VALUE_TYPE.domEvent ? e.target.value : e;

      fieldUpdater(field, value);
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
        startDate: null,
        endDate: null,
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
      return newExperience;
    });
  };

  const getValueFromEvent = (e, valueType) => {
    if (valueType === VALUE_TYPE.domEvent) {
      return e.target.value;
    } else if (valueType === VALUE_TYPE.value) {
      return e;
    } else if (valueType === VALUE_TYPE.date) {
      return getFormattedDate(e);
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

  // TODO: Have loading screen
  if (isLoading) return null;

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
              value={personalInfo.firstName}
            />
            <TextField
              id='outlined-basic'
              label='Last Name'
              variant='outlined'
              onChange={onChangeHandler<PersonalInfo>(
                'lastName',
                setPersonalInfoField
              )}
              value={personalInfo.lastName}
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
              value={personalInfo.email}
            />
            <TextField
              id='outlined-basic'
              label='Phone Number'
              variant='outlined'
              onChange={onChangeHandler<PersonalInfo>(
                'phone',
                setPersonalInfoField
              )}
              value={personalInfo.phone}
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
              value={address.street}
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
              label='City'
              variant='outlined'
              onChange={onChangeHandler<Address>('city', setAddressField)}
              value={address.city}
            />

            <TextField
              id='outlined-basic'
              label='Postal Code'
              variant='outlined'
              onChange={onChangeHandler<Address>('postalCode', setAddressField)}
              value={address.postalCode}
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
              label='Province'
              variant='outlined'
              onChange={onChangeHandler<Address>('province', setAddressField)}
              value={address.province}
            />

            <TextField
              id='outlined-basic'
              label='Country'
              variant='outlined'
              onChange={onChangeHandler<Address>('country', setAddressField)}
              value={address.country}
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
              onChange={handleAddLink(DEFAULT_LINKS.linkedIn)}
              value={
                links.find((link) => link.type === DEFAULT_LINKS.linkedIn).url
              }
            />
            <TextField
              id='outlined-basic'
              label='GitHub URL'
              variant='outlined'
              onChange={handleAddLink(DEFAULT_LINKS.github)}
              value={
                links.find((link) => link.type === DEFAULT_LINKS.github).url
              }
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
              onChange={handleAddLink(DEFAULT_LINKS.portfolio)}
              value={
                links.find((link) => link.type === DEFAULT_LINKS.portfolio).url
              }
            />
            <TextField
              id='outlined-basic'
              label='Other URL'
              variant='outlined'
              onChange={handleAddLink(DEFAULT_LINKS.other)}
              value={
                links.find((link) => link.type === DEFAULT_LINKS.other).url
              }
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
              value={education.name}
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
              value={education.field}
            />
          </Box>

          <Box
            sx={{
              '& .MuiTextField-root': {
                m: 1,
                width: '45%',
              },
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <DatePicker
              label='Start Date'
              views={['year', 'month', 'day']}
              value={education.startDate}
              onChange={onChangeHandler<Education>(
                'startDate',
                setEducationField,
                VALUE_TYPE.value
              )}
              renderInput={(params) => <TextField {...params} />}
            />

            <DatePicker
              label='End Date (or Expected)'
              views={['year', 'month', 'day']}
              value={education.endDate}
              onChange={onChangeHandler<Education>(
                'endDate',
                setEducationField,
                VALUE_TYPE.value
              )}
              renderInput={(params) => <TextField {...params} />}
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
                    '& .MuiTextField-root': {
                      m: 1,
                      width: exp.isCurrentlyWorking ? '93%' : '45%',
                    },
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <DatePicker
                    label='Start Date'
                    views={['year', 'month', 'day']}
                    value={exp.startDate}
                    onChange={updateExperienceField(
                      idx,
                      'startDate',
                      VALUE_TYPE.date
                    )}
                    renderInput={(params) => <TextField {...params} />}
                  />

                  {!exp.isCurrentlyWorking && (
                    <DatePicker
                      label='End Date'
                      views={['year', 'month', 'day']}
                      value={exp.endDate}
                      onChange={updateExperienceField(
                        idx,
                        'endDate',
                        VALUE_TYPE.date
                      )}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  )}
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
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <ReactNotification />
    <App />
  </LocalizationProvider>,
  root
);

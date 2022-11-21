import {
  RESUME_FIELD_TYPES,
  RESUME_TYPES_OF_INPUT,
  RESUME_INPUT_NAME,
} from './../constants';
import { getDOMElements } from './../utils/utils';
import {
  getIsJobFormMap,
  addURLToJobFormMap,
  getFormData,
} from './../utils/storage';
import { isPageAJobForm } from './classification';

(async () => {
  const isJobFormMap = await getIsJobFormMap();

  const URL = window.location.href;
  const seenPrefixOfURLBefore = Object.keys(isJobFormMap).some((prevURL) => {
    return URL.indexOf(prevURL) === 0;
  });

  if (seenPrefixOfURLBefore) {
    // TODO: should do nothing here, but for now we will start filling form out
    autofillForm();
  } else {
    const isJobForm = isPageAJobForm();
    console.log(isJobForm);

    addURLToJobFormMap(URL, isJobForm);
    autofillForm();
  }
})();

const INPUT_TYPES = {
  firstName: {
    names: ['firstName', 'first_name', 'FirstName', 'first'],
    tags: ['input', 'div'],
    attributes: ['id', 'class'],
  },
  lastName: {
    names: ['lastName', 'last_name', 'LastName', 'last'],
    tags: ['input', 'div'],
    attributes: ['id', 'class'],
  },
  email: {
    names: ['email', 'Email', 'e-mail'],
    tags: ['input', 'div'],
    attributes: ['id', 'class'],
  },
  phone: {
    names: ['phone', 'Phone', 'PhoneNumber', 'phone_number'],
    tags: ['input', 'div'],
    attributes: ['id', 'class'],
  },
  location: {
    names: ['location', 'Location'],
    tags: ['input', 'div', 'select'],
    attributes: ['id', 'class'],
  },
};

const fillInput = (inputInfo, data) => {
  const input = getDOMElements(
    inputInfo.tags,
    inputInfo.attributes,
    inputInfo.names
  )[0] as HTMLInputElement;

  console.log(input);

  input.value = data;
};

const autofillForm = async () => {
  // Look for resume uploading
  const formData = await getFormData();
  console.log(formData);

  // TODO: Check if resume has been uploaded
  // TODO: Handle full name instead of first and last

  fillInput(INPUT_TYPES.firstName, formData.personalInfo.firstName);
  fillInput(INPUT_TYPES.lastName, formData.personalInfo.lastName);
  fillInput(INPUT_TYPES.email, formData.personalInfo.email);
  fillInput(INPUT_TYPES.phone, formData.personalInfo.phone);

  fillInput(
    INPUT_TYPES.location,
    `${formData.address.city}, ${formData.address.province}`
  );
};

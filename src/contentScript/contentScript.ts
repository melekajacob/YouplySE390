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

// TODO: Move to some sort of similarity check
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
  schoolName: {
    names: [
      'school-name',
      'education',
      'school',
      'schoolName',
      'Education',
      'EducationName',
      'university',
      'select2-choice',
      's2id_autogen9_search',
    ],
    tags: ['input', 'div', 'a'],
    attributes: ['id', 'class', 'describedby'],
  },
};

const fillTextInput = (inputInfo, data, shouldClear = true) => {
  // We won't clear any inputs just b/c we don't have data inputted prev
  if (!data || data === '') return;

  const inputs = getDOMElements(
    inputInfo.tags,
    inputInfo.attributes,
    inputInfo.names
  );

  console.log(inputs);

  inputs
    .filter((input) => input.tagName === 'INPUT')
    .forEach((input: HTMLInputElement) => {
      input.value = shouldClear ? data : input.value + data;
    });
};

const timer = async (delay) => new Promise((res) => setTimeout(res, delay));

const clickAllChildren = async (el: HTMLElement) => {
  console.log('MOUSEDOWN', el);

  const event = new MouseEvent('mousedown');
  el.dispatchEvent(event);

  await timer(1000);

  for (const child of el.children) {
    await clickAllChildren(child as HTMLElement);
  }
};

const clickEnter = (el: HTMLElement) => {
  el.dispatchEvent(
    new KeyboardEvent('keydown', {
      code: 'Enter',
      key: 'Enter',
      charCode: 13,
      keyCode: 13,
      view: window,
      bubbles: true,
    })
  );
};

const autofillForm = async () => {
  // Look for resume uploading
  const formData = await getFormData();
  console.log(formData);

  // TODO: Check if resume has been uploaded
  // TODO: Handle full name instead of first and last

  fillTextInput(INPUT_TYPES.firstName, formData.personalInfo.firstName);
  fillTextInput(INPUT_TYPES.lastName, formData.personalInfo.lastName);
  fillTextInput(INPUT_TYPES.email, formData.personalInfo.email);
  fillTextInput(INPUT_TYPES.phone, formData.personalInfo.phone);

  // TODO: Look into selecting from dropdown
  // TODO: If failed try, putting in location individually
  fillTextInput(
    INPUT_TYPES.location,
    formData.address.city && formData.address.province
      ? `${formData.address.city}, ${formData.address.province}`
      : ''
  );

  // fillInput(INPUT_TYPES.schoolName, formData.education.name);

  const dropdowns = getDOMElements(
    INPUT_TYPES.schoolName.tags,
    INPUT_TYPES.schoolName.attributes,
    INPUT_TYPES.schoolName.names
  );

  console.log(dropdowns);

  dropdowns.forEach((el) => {
    const event = new MouseEvent('mousedown');
    el.dispatchEvent(event);
  });

  setTimeout(async () => {
    console.log('FILLING');

    const name = 'Waterloo';

    for (const letter of name) {
      fillTextInput(INPUT_TYPES.schoolName, letter, false);
      await timer(500);
    }

    clickEnter(document.querySelector('#s2id_autogen9_search'));
  }, 1000);
};

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

const FIRST_NAME_LABEL_NAME = ['firstName', 'first_name', 'FirstName', 'first'];
const FIRST_NAME_TYPES = ['input', 'div'];
const FIRST_NAME_FIELD_TYPES = ['id', 'class'];

const autofillForm = async () => {
  // Look for resume uploading
  const formData = await getFormData();
  console.log(formData);

  // TODO: Check if resume has been uploaded
  // TODO: Handle full name instead of first and last

  const firstNameInput = getDOMElements(
    FIRST_NAME_TYPES,
    FIRST_NAME_FIELD_TYPES,
    FIRST_NAME_LABEL_NAME
  )[0];
  console.log(firstNameInput);
  (firstNameInput as HTMLInputElement).value = formData.personalInfo.firstName;
};

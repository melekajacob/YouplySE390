import {
  RESUME_FIELD_TYPES,
  RESUME_TYPES_OF_INPUT,
  RESUME_INPUT_NAME,
} from './../constants';
import { getDOMElement } from './../utils/utils';
import { getIsJobFormMap, addURLToJobFormMap } from './../utils/storage';
import { isPageAJobForm } from './classification';

getIsJobFormMap().then((data) => {
  const URL = window.location.href;
  const seenPrefixOfURLBefore = Object.keys(data).some((prevURL) => {
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
});

const FIRST_NAME_LABEL_NAME = ['firstName', 'first_name', 'FirstName', 'first'];
const FIRST_NAME_TYPES = ['label'];

const autofillForm = () => {
  // Look for resume uploading
  const resumeInput = getDOMElement(
    RESUME_TYPES_OF_INPUT,
    RESUME_FIELD_TYPES,
    RESUME_INPUT_NAME
  );

  console.log(resumeInput);

  // Fill out first name and last name (consider full name input)
  // Try first to find the input from the 'for' attribute of the label
  // getDOMElement(['label'], )
  // If that doesn't work, try to find the input directly
};

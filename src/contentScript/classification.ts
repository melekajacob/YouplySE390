import { JOB_SITES_SUBSTRINGS } from './../constants';
import { getURL } from '../utils/utils';
const RESUME_INPUT_NAME = [
  'resumeInput',
  'resume-input',
  'resume',
  'fileUpload',
];
const RESUME_TYPES_OF_INPUT = ['input', 'div'];
const RESUME_FIELD_TYPES = ['class', 'id', 'aria-labelledby'];

export const isPageAJobForm = () => {
  // Try URLs
  const url = getURL();

  const includesSubstring = JOB_SITES_SUBSTRINGS.some((site) => {
    return url.includes(site);
  });

  if (includesSubstring) return true;

  // Look for resume uploading
  const resumeInput = getDOMElement(
    RESUME_TYPES_OF_INPUT,
    RESUME_FIELD_TYPES,
    RESUME_INPUT_NAME
  );

  if (resumeInput) return true;

  return false;
};

export const getDOMElement = (
  tagNames: string[],
  attributes: string[],
  values: string[]
) => {
  for (const tagName of tagNames) {
    for (const attribute of attributes) {
      for (const value of values) {
        const el = document.querySelector(`${tagName}[${attribute}*=${value}]`);

        if (el) {
          return el;
        }
      }
    }
  }

  return null;
};

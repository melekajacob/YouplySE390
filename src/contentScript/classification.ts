import { JOB_SITES_SUBSTRINGS } from './../constants';
import { getURL } from '../utils/utils';
const RESUME_INPUT_NAME = ['resumeInput', 'resume-input', 'resume'];
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

  return false;
};

export const getDOMElement = (
  tagNames: string[],
  attributes: string[],
  values: string[]
) => {
  tagNames.forEach((tagName) => {
    attributes.forEach((attribute) => {
      values.forEach((value) => {
        const el = document.querySelector(`${tagName}[${attribute}*=${value}]`);
        if (el) return el;
      });
    });
  });

  return null;
};

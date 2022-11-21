import {
  JOB_SITES_SUBSTRINGS,
  RESUME_FIELD_TYPES,
  RESUME_TYPES_OF_INPUT,
  RESUME_INPUT_NAME,
} from './../constants';
import { getURL, getDOMElements } from '../utils/utils';

export const isPageAJobForm = () => {
  // Try URLs
  const url = getURL();

  const includesSubstring = JOB_SITES_SUBSTRINGS.some((site) => {
    return url.includes(site);
  });

  if (includesSubstring) return true;

  // Look for resume uploading
  const resumeInput = getDOMElements(
    RESUME_TYPES_OF_INPUT,
    RESUME_FIELD_TYPES,
    RESUME_INPUT_NAME
  );

  return resumeInput.length > 0;
};

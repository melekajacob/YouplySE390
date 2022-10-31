import { JOB_SITES_SUBSTRINGS } from './../constants';
import { getURL } from '../utils/utils';

export const isPageAJobForm = () => {
  // Try URLs
  const url = getURL();

  const includesSubstring = JOB_SITES_SUBSTRINGS.some((site) => {
    return url.includes(site);
  });

  if (includesSubstring) return true;

  // Look for resume uploading

  return false;
};

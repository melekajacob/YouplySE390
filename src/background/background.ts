import { DEFAULT_LINKS } from './../constants';
import { setFormData } from './../utils/storage';
// TODO: background script
chrome.runtime.onInstalled.addListener(() => {
  // TODO: on installed function
  setFormData({
    resume: null,
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
    address: {
      street: '',
      postalCode: '',
      province: '',
    },
    links: [
      { type: DEFAULT_LINKS.linkedIn, url: '' },
      { type: DEFAULT_LINKS.github, url: '' },
      { type: DEFAULT_LINKS.portfolio, url: '' },
      { type: DEFAULT_LINKS.other, url: '' },
    ],
    education: {
      name: '',
      degree: '',
      field: '',
      gpa: '',
      dateRange: [null, null],
    },
    experience: [],
    skills: [],
  });
});

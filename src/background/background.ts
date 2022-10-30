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
    links: [],
    education: {
      name: '',
      degree: '',
      field: '',
      gpa: '',
      dateRange: [],
    },
    experience: [],
    skills: [],
  });
});

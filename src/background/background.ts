import { DEFAULT_FORM_DATA, DEFAULT_LINKS } from './../constants';
import { setFormData } from './../utils/storage';
chrome.runtime.onInstalled.addListener(() => {
  setFormData(DEFAULT_FORM_DATA);
});

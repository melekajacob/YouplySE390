import { getIsJobFormMap, addURLToJobFormMap } from './../utils/storage';
// Classify
import { isPageAJobForm } from './classification';

getIsJobFormMap().then((data) => {
  const URL = window.location.href;
  const seenPrefixOfURLBefore = Object.keys(data).some((prevURL) => {
    return URL.indexOf(prevURL) === 0;
  });

  if (seenPrefixOfURLBefore) {
    // TODO: should do nothing here, but for now we will start filling form out
    // autofillForm();
  } else {
    const isJobForm = isPageAJobForm();
    console.log(isJobForm);

    // addURLToJobFormMap(URL, isJobForm);
  }
});

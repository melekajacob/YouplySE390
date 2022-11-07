export const getFormattedDate = (date: Date) => {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');

  return month + '/' + day + '/' + year;
};

export const getURL = () => {
  return window.location.href;
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

export const getFormattedDate = (date: Date) => {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');

  return month + '/' + day + '/' + year;
};

export const getURL = () => {
  return window.location.href;
};

const doesNodeExist = (nodes: HTMLElement[], newNode: HTMLElement) => {
  return nodes.some((node) => node.isSameNode(newNode));
};

export const getDOMElements = (
  tagNames: string[],
  attributes: string[],
  values: string[]
): HTMLElement[] => {
  const DOMElementMatches = [];

  for (const tagName of tagNames) {
    for (const attribute of attributes) {
      for (const value of values) {
        const el = document.querySelector(
          `${tagName}[${attribute}*=${value}]`
        ) as HTMLElement;

        if (el && !doesNodeExist(DOMElementMatches, el)) {
          DOMElementMatches.push(el);
        }
      }
    }
  }

  return DOMElementMatches;
};

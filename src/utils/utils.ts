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

// sleep time expects milliseconds
export const sleep = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export const sleepUntil = async (f: CallableFunction, timeoutMs: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    const startTime = new Date().getTime();
    const wait = setInterval(function() {
      if (f()) {
        console.log("RESOLVED AFTER:", (new Date().getTime() - startTime), "ms");
        clearInterval(wait);
        resolve();
      } else if ((new Date().getTime() - startTime) > timeoutMs) { // Timeout
        console.log("REJECTED AFTER:", (new Date().getTime() - startTime), "ms");
        clearInterval(wait);
        reject();
      }
    }, 20);
  });
}

export const fileToBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    if (!file) {
      resolve(null);
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const base64ToFile = (dataurl: string | null, filename: string) => {
  if(!dataurl) {
    return null;
  }
  
  var arr = dataurl.split(','),
  mime = arr[0].match(/:(.*?);/)[1],
  bstr = atob(arr[1]), 
  n = bstr.length, 
  u8arr = new Uint8Array(n);
  
  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, {type:mime});
}


import { FormData, JobFormMap } from '../types';
import { base64ToFile, fileToBase64 } from './utils';

export interface LocalStorage {
  formData?: FormData;
  isJobFormMap?: JobFormMap;
}

export type LocalStorageKeys = keyof LocalStorage;

/* TODO: Notice that we are using local instead of sync storage
  because there is too stringent max byte limits to store uploaded 
  resumes. Need to refactor this to allow either smaller chunks so everything
  can be synced locally, or just have the resume in local storage and the
  rest in sync
*/

export const getFormData = (): Promise<FormData> => {
  const keys: LocalStorageKeys[] = ['formData'];

  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: any) => {
      res.formData = {...res.formData, resume: base64ToFile(res.formData.resume, "test.pdf")}
      resolve(res.formData);
    });
  });
};

export const setFormData = async (formData: FormData): Promise<void> => {
  const data = {
    formData: {...formData, resume: await fileToBase64(formData.resume)}
  };
  
  return new Promise((resolve) => {
    
    chrome.storage.local.set(data, () => {
      resolve();
    });
  });
};

export const getIsJobFormMap = (): Promise<JobFormMap> => {
  const keys: LocalStorageKeys[] = ['isJobFormMap'];

  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.isJobFormMap);
    });
  });
};

export const setIsJobFormMap = (jobFormMap: JobFormMap): Promise<void> => {
  const data: LocalStorage = {
    isJobFormMap: jobFormMap,
  };

  return new Promise((resolve) => {
    chrome.storage.local.set(data, () => {
      resolve();
    });
  });
};

export const addURLToJobFormMap = async (
  url: string,
  isForm: boolean
): Promise<void> => {
  // TODO: Check that prefix doesn't already exist
  const isJobFormMap = await getIsJobFormMap();
  const data = {
    isJobFormMap: {
      ...isJobFormMap,
      [url]: isForm,
    },
  };

  return new Promise((resolve) => {
    chrome.storage.local.set(data, () => {
      resolve();
    });
  });
};

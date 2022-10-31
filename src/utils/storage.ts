import { FormData, JobFormMap } from '../types';

export interface LocalStorage {
  formData?: FormData;
  isJobFormMap?: JobFormMap;
}

export type LocalStorageKeys = keyof LocalStorage;

export const getFormData = (): Promise<FormData> => {
  const keys: LocalStorageKeys[] = ['formData'];

  return new Promise((resolve) => {
    chrome.storage.sync.get(keys, (res: LocalStorage) => {
      resolve(res.formData);
    });
  });
};

export const setFormData = (formData: FormData): Promise<void> => {
  const data: LocalStorage = {
    formData,
  };

  return new Promise((resolve) => {
    chrome.storage.sync.set(data, () => {
      resolve();
    });
  });
};

export const getIsJobFormMap = (): Promise<JobFormMap> => {
  const keys: LocalStorageKeys[] = ['isJobFormMap'];

  return new Promise((resolve) => {
    chrome.storage.sync.get(keys, (res: LocalStorage) => {
      resolve(res.isJobFormMap);
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
    chrome.storage.sync.set(data, () => {
      resolve();
    });
  });
};

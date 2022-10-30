import { FormData } from '../types';

export interface LocalStorage {
  formData?: FormData;
  isJobForm?: {
    [key in string]: boolean;
  };
}

export type LocalStorageKeys = keyof LocalStorage;

export const getFormData = () => {
  const keys: LocalStorageKeys[] = ['formData'];

  return new Promise((resolve) => {
    chrome.storage.sync.get(keys, (res: LocalStorage) => {
      resolve(res.formData ?? {});
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

import { useState } from 'react';

export interface GenericObject {
  [key: string]: any;
}

export const useStateObject = <T>(
  initialState: T
): [T, (a: keyof T, b: any) => void] => {
  const [state, setState] = useState(initialState);

  const setField = (fieldName: keyof T, value: any) => {
    setState((prevState) => {
      return {
        ...prevState,
        [fieldName]: value,
      };
    });
  };

  return [state, setField];
};

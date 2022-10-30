import { RangeInput } from '@mui/lab/DateRangePicker/RangeTypes';

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface Address {
  street: string;
  postalCode: string;
  province: string;
}

export interface Link {
  type: string;
  url: string;
}

export interface Education {
  name: string;
  degree: string;
  field: string;
  gpa: string;
  dateRange: any[];
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  isCurrentlyWorking: boolean;
  description: string;
  // Since if they are currently working there, there is no start date
  dateRange?: RangeInput<any>;
  startDate?: string;
  id: string;
}

export interface FormData {
  resume: File | null;
  personalInfo: PersonalInfo;
  address: Address;
  links: Link[];
  education: Education;
  experience: Experience[];
  skills: string[];
}

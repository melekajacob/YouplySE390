import { FormData } from "./types";

export enum VALUE_TYPE {
  domEvent,
  checkbox,
  value,
  date,
}

export const DEFAULT_LINKS = {
  linkedIn: "linkedIn",
  github: "github",
  portfolio: "portfolio",
  other: "other",
};

export const DEFAULT_FORM_DATA: FormData = {
  resume: null,
  personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  },
  address: {
    street: "",
    postalCode: "",
    province: "",
    city: "",
    country: "",
  },
  links: [
    { type: DEFAULT_LINKS.linkedIn, url: "" },
    { type: DEFAULT_LINKS.github, url: "" },
    { type: DEFAULT_LINKS.portfolio, url: "" },
    { type: DEFAULT_LINKS.other, url: "" },
  ],
  education: {
    name: "",
    degree: "",
    field: "",
    gpa: "",
    startDate: null,
    endDate: null,
  },
  experience: [],
  skills: [],
};

// TODO: Bulk up this list
export const JOB_SITES_SUBSTRINGS = ["boards.greenhouse.io"];

export const RESUME_INPUT_NAME = [
  "resumeInput",
  "resume-input",
  "resume",
  "fileUpload",
];

export const RESUME_TYPES_OF_INPUT = ["input", "div", "a"];
export const RESUME_FIELD_TYPES = ["class", "id", "aria-labelledby"];

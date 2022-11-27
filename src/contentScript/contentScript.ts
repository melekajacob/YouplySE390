import {
  RESUME_FIELD_TYPES,
  RESUME_TYPES_OF_INPUT,
  RESUME_INPUT_NAME,
} from "./../constants";
import { getDOMElements, sleep, sleepUntil } from "./../utils/utils";
import {
  getIsJobFormMap,
  addURLToJobFormMap,
  getFormData,
} from "./../utils/storage";
import { isPageAJobForm } from "./classification";
import { SingleEntryPlugin } from "webpack";
import SelectInput from "@mui/material/Select/SelectInput";

(async () => {
  const isJobFormMap = await getIsJobFormMap();

  const URL = window.location.href;
  const seenPrefixOfURLBefore = Object.keys(isJobFormMap).some((prevURL) => {
    return URL.indexOf(prevURL) === 0;
  });

  if (seenPrefixOfURLBefore) {
    // TODO: should do nothing here, but for now we will start filling form out
    autofillGreenhouse();
  } else {
    const isJobForm = isPageAJobForm();

    addURLToJobFormMap(URL, isJobForm);
    autofillGreenhouse();
  }
})();

// TODO: Move to some sort of similarity check
const INPUT_TYPES = {
  resume: {
    names: ["resume"],
    tags: ["div", "input"],
    attributes: ["data-field", "name", "id", "class"],
  },
  firstName: {
    names: ["firstName", "first_name", "FirstName", "first"],
    tags: ["input", "div"],
    attributes: ["id", "class"],
  },
  lastName: {
    names: ["lastName", "last_name", "LastName", "last"],
    tags: ["input", "div"],
    attributes: ["id", "class"],
  },
  email: {
    names: ["email", "Email", "e-mail"],
    tags: ["input", "div"],
    attributes: ["id", "class"],
  },
  phone: {
    names: ["phone", "Phone", "PhoneNumber", "phone_number"],
    tags: ["input", "div"],
    attributes: ["id", "class"],
  },
  location: {
    names: ["location", "Location", "loc"],
    tags: ["auto-complete", "input", "div", "select"],
    attributes: ["id", "class"],
  },
  schoolName: {
    names: [
      "school-name",
      "education",
      "school",
      "schoolName",
      "Education",
      "EducationName",
      "university",
      "select2-choice",
      "s2id_autogen9_search",
    ],
    tags: ["input", "div", "a"],
    attributes: ["id", "class", "describedby"],
  },
};

const fillTextInput = (inputInfo, data, shouldClear = true) => {
  // We won't clear any inputs just b/c we don't have data inputted prev
  if (!data || data === "") return;

  const inputs = getDOMElements(
    inputInfo.tags,
    inputInfo.attributes,
    inputInfo.names
  );

  console.log(inputs);

  inputs
    // .filter((input) => input.tagName === 'INPUT')
    .forEach((input: HTMLInputElement) => {
      input.setAttribute("value", shouldClear ? data : input.value + data);
      // input.innerText = shouldClear ? data : input.value + data;
    });
};

const timer = async (delay) => new Promise((res) => setTimeout(res, delay));

const clickAllChildren = async (el: HTMLElement) => {
  console.log("MOUSEDOWN", el);

  const event = new MouseEvent("mousedown");
  el.dispatchEvent(event);

  await timer(1000);

  for (const child of el.children) {
    await clickAllChildren(child as HTMLElement);
  }
};

const clickEnter = (el: HTMLElement) => {
  el.dispatchEvent(
    new KeyboardEvent("keydown", {
      code: "Enter",
      key: "Enter",
      charCode: 13,
      keyCode: 13,
      view: window,
      bubbles: true,
    })
  );
};

const selectFirstFromDropdown = (dropdownSelector: string) => {
  const dropdownElement = document.querySelector(
    dropdownSelector
  ) as HTMLUListElement;

  sleepUntil(() => {
    if (dropdownElement.children.length == 0) {
      return false;
    } else {
      (dropdownElement.children[0] as HTMLLIElement).click();
      return true;
    }
  }, 10000);
};

const fileUpload = (resume: File, inputElement: HTMLInputElement) => {
  const datatransfer = new DataTransfer();
  datatransfer.items.add(resume);
  inputElement.files = datatransfer.files;
  inputElement.dispatchEvent(new Event("change", { bubbles: true }));
};

const resumeUpload = (resume: File) => {
  // const elements = getDOMElements(INPUT_TYPES.resume.tags, INPUT_TYPES.resume.attributes, INPUT_TYPES.resume.names);
  // console.log("Resume elements", elements)
  let fieldName = "resume";
  if (
    !document
      .querySelector(`.attach-or-paste[data-field=${fieldName}]`)
      .getAttribute("data-allow-s3")
  ) {
    let t = document.querySelector(
      `a[data-source=attach][aria-labelledby=${fieldName}]`
    );
    t || (t = document.querySelector("button[data-source=attach]")),
      (t as HTMLButtonElement).click();
    const fileInput = document.querySelector(
      `input[id=${fieldName}_file][type=file]`
    ) as HTMLInputElement;

    fileUpload(resume, fileInput);
  } else {
    const fileInput = document.querySelector(
      `#s3_upload_for_${fieldName} > input[type=file]`
    ) as HTMLInputElement;

    fileUpload(resume, fileInput);
  }
};

const autofillGreenhouse = async () => {
  console.log("Autofilling form");
  const formData = await getFormData();
  console.log(formData);

  resumeUpload(formData.resume);

  // TODO: Check if resume has been uploaded
  // TODO: Handle full name instead of first and last
  fillTextInput(INPUT_TYPES.firstName, formData.personalInfo.firstName);
  fillTextInput(INPUT_TYPES.lastName, formData.personalInfo.lastName);
  fillTextInput(INPUT_TYPES.email, formData.personalInfo.email);
  fillTextInput(INPUT_TYPES.phone, formData.personalInfo.phone);

  fillTextInput(
    INPUT_TYPES.location,
    formData.address.city && formData.address.province
      ? `${formData.address.city}, ${formData.address.province}`
      : ""
  );

  // TODO:
  // if(formData.address.city && formData.address.province) {
  //   (document.querySelector("auto-complete#job_application_location") as HTMLDivElement).setAttribute("open", "true");
  //   selectFirstFromDropdown("ul#location_autocomplete-items-popup")
  // }

  // while(true) {
  //   const popupElement = document.querySelector("ul#location_autocomplete-items-popup") as HTMLUListElement
  //   if(popupElement.children.length == 0) {
  //     console.log("not changed");
  //     sleep(100);
  //   } else {
  //     (popupElement.children[0] as HTMLLIElement).click();
  //     break;
  //   }
  // }

  // Now select the first element from the dropdown

  // // TODO: Look into selecting from dropdown
  // // TODO: If failed try, putting in location individually

  // // fillInput(INPUT_TYPES.schoolName, formData.education.name);
};

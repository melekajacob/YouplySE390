import {
  RESUME_FIELD_TYPES,
  RESUME_TYPES_OF_INPUT,
  RESUME_INPUT_NAME,
} from "../constants";
import { getDOMElements, sleep, sleepUntil } from "../utils/utils";
import {
  getIsJobFormMap,
  addURLToJobFormMap,
  getFormData,
} from "../utils/storage";
import { isPageAJobForm } from "./classification";

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

const fileUpload = (resume: File, inputElement: HTMLInputElement) => {
  const datatransfer = new DataTransfer();
  datatransfer.items.add(resume);
  inputElement.files = datatransfer.files;
  inputElement.dispatchEvent(new Event("change", { bubbles: true }));
};

const resumeUpload = (resume: File) => {
  if (!resume) return;

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
};

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Modal from "../components/Modal";

import "./contentScript.css";

const AutofillPopup: React.FC<{}> = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleAutofill = async () => {
    await autofillGreenhouse();

    setIsActive(false);
  };

  useEffect(() => {
    setIsActive(isPageAJobForm());
  }, []);

  return (
    <>
      {isActive && (
        <Modal setIsActive={setIsActive} handleAutofill={handleAutofill} />
      )}
    </>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<AutofillPopup />, root);

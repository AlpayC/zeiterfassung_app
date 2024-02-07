import { useState, useEffect } from "react";
import { capitalizeString } from "../utils/capitalizeString";

const checkFormData = (inputValues) => {
  const schema = {
    name: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
    lastname: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  };
  for (const key in inputValues) {
    if (Object.prototype.hasOwnProperty.call(inputValues, key)) {
      if (!schema[key].test(inputValues[key])) {
        return generateErrorMessage(key, inputValues[key]);
      }
    }
  }

  return null;
};

const generateErrorMessage = (field, value) => {
  const errorMessageMap = {
    name:
      value.length < 2
        ? "Der Name muss mindestens zwei Zeichen enthalten."
        : null,
    lastname:
      value.length < 2
        ? "Der Nachname muss mindestens zwei Zeichen enthalten."
        : null,
    email: !value.includes("@")
      ? "Es muss eine gültige Emailadresse mit einem @ eingegeben werden."
      : !/\.[^\s@]+$/.test(value)
      ? "Bitte gebe eine gültige Emailadresse mit einer Domain ein."
      : null,
    password:
      value.length < 8
        ? "Bitte gebe ein gültiges Passwort ein (mindestens 8 Zeichen)."
        : !/(?=.*[A-Za-z])(?=.*\d)/.test(value)
        ? "Das Passwort muss mindestens einen Buchstaben und eine Ziffer enthalten."
        : null,
  };

  return (
    errorMessageMap[field] ||
    `${capitalizeString(field)} entspricht nicht dem erwarteten Schema.`
  );
};

export default function useFormValidation(inputValues) {
  const [error, setError] = useState(null);

  useEffect(() => {
    const validation = () => {
      const validationResult = checkFormData(inputValues);
      setError(validationResult);
    };

    validation();
  }, [inputValues]);

  return { error, setError };
}

import { EMAIL_PATTERN, PASS_PATTERN } from "./Constants";

export default function FormValidation(errors, values) {
  const checkEmail = new RegExp(EMAIL_PATTERN).test(values.email);
  const checkPassword = PASS_PATTERN.test(values.password);


  if (!values.email) errors.email = "Please enter your email Address.";
  else if (!checkEmail) errors.email = "Please enter a valid email address.";
  else if (checkEmail) errors.email = "";

  if (!values.password) errors.password = "Please enter your password.";
  else if(!checkPassword) errors.password = "Please include at least 6 characters (1 uppercase, 1 lowercase, and 1 number).";
  else if(checkPassword) errors.password = "";

  if (!values.name) errors.name = "Please enter your name.";
  else if(values.name.length < 4) errors.name = "Name needs to be of 4 characters at least.";
  else if(values.name.length >= 4) errors.name = "";
}
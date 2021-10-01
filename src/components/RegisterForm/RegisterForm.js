import  React from 'react';
// import { useHistory } from 'react-router-dom';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

import './RegisterForm.css';

function RegisterForm(props) {
  // const errorMessage = props.duplicateUser ? 'Email is already taken' : 'Email or Password Invalid!';


  return (
    <PopupWithForm
      id="register"
      name="register"
      title="Sign up"
      isOpen={props.isOpen}
      isValid={props.isValid}
      onClose={props.onClose}
      onSubmit={props.handleRegister}
      onSwitch={props.onSwitch}
    >
      <label className="form__label">Email</label>
      <input
        id="email-register"
        type="email"
        name="email"
        className="form__input form__input_type_email"
        placeholder="Enter Email"
        value={props.values.email}
        onChange={props.handleFormChange}
        required
      />
      <span id="email-error" className="form__field form__field_error">{props.errors['email']?.substring(0, 50)}</span>

      <label className="form__label">Password</label>
      <input
        id="password-register"
        type="password"
        pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$" //at least 1 uppercase, 1 lowercase, 1 number
        title="Please include at least 1 uppercase character, 1 lowercase character, and 1 number."
        name="password"
        placeholder="Enter Password"
        className="form__input form__input_type_password"
        value={props.values.password}
        onChange={props.handleFormChange}
        minLength={6}
        required
      />
      <span id="password-error" className="form__field form__field_error">{props.errors['password']?.substring(0, 50)}</span>

      <label className="form__label">Username</label>
      <input
        id="username"
        type="text"
        name="username"
        placeholder="Enter your username"
        className="form__input form__input_type_username"
        value={props.values.username}
        onChange={props.handleFormChange}
        minLength={4}
        required
      />
      <span id="username-error" className="form__field form__field_error">{props.errors['username']?.substring(0, 50)}</span>

      <span id="register-error" className="register__form_error">{props.duplicateUser && 'Email is already taken'}</span>
    </PopupWithForm>
  )
}

export default RegisterForm;

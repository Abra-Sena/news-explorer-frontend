import  React from 'react';
// import { useHistory } from 'react-router-dom';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

import './RegisterForm.css';

function RegisterForm(props) {
  return (
    <PopupWithForm
      id="register"
      name="register"
      title="Sign up"
      errors={props.errors}
      fetching={props.fetching}
      isOpen={props.isOpen}
      isValid={props.isValid}
      onClose={props.onClose}
      onSubmit={props.handleRegister}
      onSwitch={props.onSwitch}
      closeAllPopups={props.closeAllPopups}
    >
      <label className="form__label">Email</label>
      <input
        id="email-register"
        type="email"
        name="email"
        className="form__input form__input_type_email"
        placeholder="Enter Email"
        disabled={props.fetching}
        value={props.values.email}
        onChange={props.handleFormChange}
        required
      />
      <span
        id="email-error"
        className={`form__error ${props.errors.email ? "form__error_active" : ""}`}
      >
        {props.errors.email}
      </span>

      <label className="form__label">Password</label>
      <input
        id="password-register"
        type="password"
        name="password"
        placeholder="Enter Password"
        className="form__input form__input_type_password"
        disabled={props.fetching}
        value={props.values.password}
        onChange={props.handleFormChange}
        minLength={6}
        required
      />
      <span
        id="password-error"
        className={`form__error ${props.errors.password ? "form__error_active" : ""}`}
      >
        {props.errors.password}
      </span>

      <label className="form__label">Username</label>
      <input
        id="username"
        type="text"
        name="name"
        placeholder="Enter your username"
        className="form__input form__input_type_username"
        disabled={props.fetching}
        value={props.values.name}
        onChange={props.handleFormChange}
        minLength={4}
        required
      />
      <span
        id="username-error"
        className={`form__error ${props.errors.name ? "form__error_active" : ""}`}
      >
        {props.errors.name}
      </span>

      <span id="register-error" className={`form__error form__error_server ${props.errors ? "form__error_active" : ""}`}>
        {props.duplicateUser && "This Email is already taken!"}
      </span>
    </PopupWithForm>
  )
}

export default RegisterForm;

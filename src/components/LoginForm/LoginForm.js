import  React from 'react';
// import { useHistory} from 'react-router-dom';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

import './LoginForm.css';

function LoginForm(props) {
  return (
    <PopupWithForm
      id="login"
      name="login"
      title="Sign in"
      errors={props.errors}
      fetching={props.fetching}
      isOpen={props.isOpen}
      isValid={props.isValid}
      onSubmit={props.handleLogin}
      onClose={props.onClose}
      onSwitch={props.onSwitch}
      closeAllPopups={props.closeAllPopups}
    >
      <label className="form__label">Email</label>
      <input
        id="email-login"
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
        id="password-login"
        type="password"
        name="password"
        className="form__input form__input_type_password"
        placeholder="Enter Password"
        disabled={props.fetching}
        value={props.values.password}
        onChange={props.handleFormChange}
        required
      />
      <span
        id="password-error"
        className={`form__error ${props.errors.password ? "form__error_active" : ""}`}
      >
        {props.errors.password}
      </span>

      <span id="login-error" className={`form__error form__error_server ${props.errors ? "form__error_active" : ""}`}>
        {props.wrongInputs && 'Email or Password Invalid!'}
      </span>
    </PopupWithForm>
  )
}

export default LoginForm;

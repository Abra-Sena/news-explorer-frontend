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
      isOpen={props.isOpen}
      isValid={props.isValid}
      onSubmit={props.handleLogin}
      onClose={props.onClose}
      onSwitch={props.onSwitch}
    >
      <label className="form__label">Email</label>
      <input
        id="email-login"
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
        id="password-login"
        type="password"
        pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"//at least 1 uppercase, 1 lowercase, 1 number
        title="Please include at least 1 uppercase character, 1 lowercase character, and 1 number."
        name="password"
        className="form__input form__input_type_password"
        placeholder="Enter Password"
        value={props.values.password}
        onChange={props.handleFormChange}
        required
      />
      <span id="password-error" className="form__field form__field_error">{props.errors['password']?.substring(0, 50)}</span>

      <span id="login-error" className="login__form_error">
        {props.wrongInputs && 'Email or Password Invalid!'}
      </span>
    </PopupWithForm>
  )
}

export default LoginForm;

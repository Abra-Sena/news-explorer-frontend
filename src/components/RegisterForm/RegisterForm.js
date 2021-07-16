import  React from 'react';
// import { useHistory } from 'react-router-dom';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

import './RegisterForm.css';

function RegisterForm(props) {
  const [ email, setEmail ] = React.useState('');
  const [ password, setPassword ] = React.useState('');
  const [ username, setUsername ] = React.useState('');

  // const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();

    // props.handleRegister(email, password);
    // if(localStorage.getItem('jwt')) {
    //   history.push('/');
    // }
  }

  return (
    <PopupWithForm
      id="register"
      name="register"
      title="up"
      isOpen={props.isRegisterPopupOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      closeAllPopups={props.closeAllPopups}
      switch={props.switch}
    >
      <label className="form__label">Email</label>
      <input
        id="email-register"
        type="email"
        name="email"
        className="form__input form__input_type_email"
        placeholder="Enter Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <span id="email-error" className="form__field form__field_error"></span>

      <label className="form__label">Password</label>
      <input
        id="password-register"
        type="password"
        name="password"
        className="form__input form__input_type_password"
        placeholder="Enter Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <span id="password-error" className="form__field form__field_error"></span>

      <label className="form__label">Username</label>
      <input
        id="username"
        type="text"
        name="username"
        placeholder="Enter your username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        className="form__input form__input_type_username"
        required
      />
      <span id="username-error" className="form__field form__field_error"></span>

      <span id="register-error" className="register__form_error">
        {props.wrongInputs && 'Email or Password Invalid!'}
      </span>
    </PopupWithForm>
  )
}

export default RegisterForm;

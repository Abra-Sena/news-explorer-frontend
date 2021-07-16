import  React from 'react';
// import { useHistory} from 'react-router-dom';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

import './LoginForm.css';

function LoginForm(props) {
  const [ email, setEmail ] = React.useState('');
  const [ password, setPassword ] = React.useState('');

  // const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();

    // console.log("username: " + email, "password: " + password);
    // props.handleLogin(email, password);
    // if(localStorage.getItem('jwt')) {
    //   history.push('/');
    // }
  }


  return (
    <PopupWithForm
      id="login"
      name="login"
      title="in"
      isOpen={props.isLoginPopupOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      closeAllPopups={props.closeAllPopups}
      switch={props.switch}
    >
      <span id="login-error" className=" login__form_error">
        {props.wrongInputs && 'Email or Password Invalid!'}
      </span>

      <label className="form__label">Email</label>
      <input
        id="email-login"
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
        id="password-login"
        type="password"
        name="password"
        className="form__input form__input_type_password"
        placeholder="Enter Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <span id="password-error" className="form__field form__field_error"></span>

    </PopupWithForm>
  )
}

export default LoginForm;

import  React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import './InfoPopup.css';

function InfoPopup(props) {
  return (
    <PopupWithForm
      id="success"
      name="success"
      title="Registration successfully completed!"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSwitch={props.onSwitch}
    >
      <button className="form__link form__link-success" onClick={props.onSwitch}>Sign in</button>
    </PopupWithForm>
  )
}

export default InfoPopup;
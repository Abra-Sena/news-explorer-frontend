import  React from 'react';

import './InfoPopup.css';

function InfoPopup(props) {
  // const switchForm = () => {
  //   console.log('click should swicth form from registration success to login');
  //   props.setRegisterPopupOpen(true);
  // }


  return (
    <div
      className={`popup popup_type_success ${props.isSuccess ? "popup_open" : ""}`} onClick={props.onClose}
    >
      <div className="popup__container">
        <form
          action="#"
          noValidate
          id="success"
          name="success"
          onClose={props.onClose} //behavior not properly functionnal, to be coded in next stage
          className={`form popup__form form_success`}
        >
          <h3 className="form__title">Registration successfully completed!</h3>

          <button className="form__link form__link-success" onClick={props.switch}>Sign in</button>

          <button type="button" aria-label="close" className="form__close" onClick={props.onClose}></button>
        </form>
      </div>
    </div>
  )
}

export default InfoPopup;
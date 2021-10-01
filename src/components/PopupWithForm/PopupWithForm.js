// responsible for the modal window
import React from 'react';

import './PopupWithForm.css';

function PopupWithForm(props) {
  const linkText = props.title === "Sign in" ? " Sign up" : " Sign in";

  function handleEscKey(evt) {
    if(evt.which === 27) props.onClose();
  }


  React.useEffect(() => {
    document.addEventListener('keydown', handleEscKey);

    return () => document.removeEventListener('keydown', handleEscKey);
  });

  return (
    <div
      className={`popup popup_type_${props.name} ${props.isOpen ? "popup_open" : ""}`}
      onClick={props.onClose}
    >
      <div className="popup__container">
        <form
          action="#"
          noValidate
          id={props.id}
          name={props.name}
          onChange={props.handleFormChange}
          onClose={props.onClose}
          onReset={props.handleFormReset}
          onSubmit={props.onSubmit}
          className={`form popup__form`}
        >
          <h3 className="form__title">{props.title}</h3>

          <fieldset className="form__field">
            { props.children }
          </fieldset>

          {
            ((props.id === 'login') || (props.id === 'register')) &&
            (
              <>
                <button
                  type="submit"
                  aria-label="auth"
                  onClick={props.onSubmit}
                  className={props.isValid ? 'form__submit' : 'form__submit form__submit_disabled'}
                >
                  {props.title}
                </button>
                <button className="form__link" onClick={props.onSwitch}> or
                  <span className="form__link form__link_active">{linkText}</span>
                </button>
              </>
            )
          }

          <button type="button" aria-label="close" className="form__close" onClick={props.onClose}></button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
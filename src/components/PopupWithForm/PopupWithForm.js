// responsible for the modal window
import React from 'react';
import './PopupWithForm.css';

function PopupWithForm(props) {
  const linkText = props.title === "in" ? " Sign up" : " Sign in";

  function handleEscKey(evt) {
    if(evt.which === 27) props.closeAllPopups();
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleEscKey);

    return () => document.removeEventListener('keydown', handleEscKey);
  });

  return (
    <div
      className={`popup popup_type_${props.name} ${props.isOpen ? "popup_open" : ""}`} onClick={props.onClose}
    >
      <div className="popup__container">
        <form
          action="#"
          noValidate
          id={props.id}
          name={props.name}
          onClose={props.handlePopupClose}
          onReset={props.handleFormReset}
          onSubmit={props.onSubmit}
          switch={props.handlePopupSwitch}
          className={`form popup__form form_${props.name}`}
        >
          <h3 className="form__title">{"Sign " + props.title}</h3>

          <fieldset className="form__field">
            { props.children }
          </fieldset>

          <button
            type="submit"
            aria-label="auth"
            disabled={!props.isSuccess}
            // onClick={buttonClick}
            className="form__submit " /*className={props.isSuccess ? 'form__submit' : 'form__submit_disabled'}*/
          >
            {"Sign " + props.title}
          </button>
          <button className="form__link" onClick={props.switch}> or
            <span className="form__link_active">{linkText}</span>
          </button>
          <button type="button" aria-label="close" className="form__close" onClick={props.onClose}></button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
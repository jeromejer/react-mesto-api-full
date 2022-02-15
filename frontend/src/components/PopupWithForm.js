import React from "react";

function PopupWithForm(props) {

    

    return (
        <div className={`popup popup_type_${props.name}  ${props.isOpen ? 'popup_open' : ''}`}>
            <div className="popup__container">
                <button type="button" className="popup__close" onClick={props.onClose}></button>
                <form className="form" onSubmit={props.handleSubmit}>
                    <h2 className="form__title">{props.title}</h2>
                    {props.children}
                    <button type="submit" className="form__submit">{props.buttonText}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;
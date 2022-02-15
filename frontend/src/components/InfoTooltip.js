import React from "react";

function InfoTooltip({onClose, messagePopup, isOpen}) {

    

    return (
        <div className={`popup  ${isOpen ? 'popup_open' : ''}`}>
            <div className="popup__container">
                <button type="button" className="popup__close" onClick={onClose}></button>
                <div className="popup__tooltip">
                    <img src={messagePopup.icon} className="popup__icon" alt="Подтверждение регистрации"/>
                    <p className="popup__text">{messagePopup.text}</p>
                </div>
            </div>
        </div>
    )
}

export default InfoTooltip;
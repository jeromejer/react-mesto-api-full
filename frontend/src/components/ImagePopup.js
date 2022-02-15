import React from "react";

function ImagePopup(props) {
    return (
        <div className={`popup popup-img popup_type_${props.name}  ${props.card.isOpen ? 'popup-img_open' : ''}`}>
            <div className="popup-img__container">
                <div className="popup-img__content">
                    <button type="button" className="popup__close" onClick={props.onClose}>
                    </button>
                    <figure className="popup-img__figure">

                        <img className="popup-img__img" src={props.card.link} alt={props.card.name} />
                        <figcaption>
                            <p className="popup-img__title">{props.card.name}</p>
                        </figcaption>
                    </figure>
                </div>
            </div>
        </div>
    )
}

export default ImagePopup;
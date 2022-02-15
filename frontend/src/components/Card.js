import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card(props) {

    const currentUser = React.useContext(CurrentUserContext);

   const isOwn = props.card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
      `element__dlt ${isOwn ? 'element__dlt_active' : ''}`
     ); 

      const isLiked = props.card.likes.some(i => i._id === currentUser._id);

      // Создаём переменную, которую после зададим в `className` для кнопки лайка
      const cardLikeButtonClassName = (
        `element__like ${isLiked ? 'element__like_active' : ''}`
      ); 


    function handleClick() {
        props.onCardClick(props.card)
    }

    function handleLikeClick() {
        props.onCardLike(props.card)
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card)
    }

    return (
            <article className="element">
                <img className="element__img" alt={props.name} src={props.link} onClick={handleClick} />
                <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}>
                </button>
                <div className="element__group">
                    <h2 className="element__title">{props.name}</h2>
                    <div className="element__group-like">
                        <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}>
                        </button>
                        <p className="element__number-likes">{props.likes.length}</p>
                    </div>
                </div>
            </article>
    )
}

export default Card;
import React from "react";
import Card from './Card';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main(props) {
    const { onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete } = props;
    const currentUser = React.useContext(CurrentUserContext);


    return (
        <main>
            <section className="profile">
                <picture className="profile__avatar" onClick={onEditAvatar}>
                    <div className="profile__avatar-img" style={{ backgroundImage: `url(${currentUser.avatar})` }}></div>
                </picture>
                <div className="profile__info">
                    <div className="profile__description">
                        <div className="profile__line">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <button type="button" className="profile__edit" aria-label="Кнопка редактирования профиля" onClick={onEditProfile}>
                            </button>
                        </div>
                        <p className="profile__job">{currentUser.about}</p>
                    </div>
                    <button type="button" className="profile__add-button" onClick={onAddPlace}>
                    </button>
                </div>
            </section>
            <section className="elements">
                {cards.map((card) => {
                    return (
                        <Card 
                            name={card.name} 
                            link={card.link} 
                            likes={card.likes} 
                            key={card._id} 
                            onCardClick={onCardClick} 
                            card={card} 
                            onCardLike={onCardLike} 
                            onCardDelete={onCardDelete}/>
                    )
                })}
            </section>

        </main>
    )
}

export default Main;
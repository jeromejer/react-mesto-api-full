import React from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function PopupUpdateAvatar({ isOpen, onClose, buttonText, onUpdateUser}) {
    const currentUser = React.useContext(CurrentUserContext);
    const avatarRef = React.useRef('');

    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateUser({
          avatar: avatarRef.current.value
        });
      } 
   
    
      React.useEffect(() => {
        avatarRef.current.value = currentUser.avatar;
    }, [currentUser])

    

    return (
        <PopupWithForm isOpen={isOpen} onClose={onClose} buttonText={buttonText} handleSubmit={handleSubmit} title="Обновить аватар" name="update_avatar">
            <input type="url" className="form__text" name="url_avatar" placeholder="Ссылка на аватар" ref={avatarRef} required/>
            <span className="form__error" id="url_avatar-error"></span>
        </PopupWithForm>
    )
}

export default PopupUpdateAvatar;
import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function PopupEditProfile({ isOpen, onClose, buttonText, onUpdateUser }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleAboutChange(e) {
    setDescription(e.target.value);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      buttonText={buttonText}
      handleSubmit={handleSubmit}
      title="Редактировать профиль"
      name="edit_profile"
    >
      <input
        type="text"
        className="form__text"
        name="text_name"
        placeholder="Введите имя"
        value={name || ""}
        onChange={handleNameChange}
        required
      />
      <span className="form__error" id="text_name-error"></span>
      <input
        type="text"
        className="form__text"
        name="text_job"
        placeholder="Введите профессию"
        value={description || ""}
        onChange={handleAboutChange}
        required
      />
      <span className="form__error" id="text_job-error"></span>
    </PopupWithForm>
  );
}

export default PopupEditProfile;

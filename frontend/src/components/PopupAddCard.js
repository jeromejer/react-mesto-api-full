import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupAddCard({ isOpen, onClose, buttonText, onAddPlace }) {
  const [link, setLink] = React.useState("");
  const [name, setName] = React.useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      link: link,
      name: name,
    });
  }

  React.useEffect(() => {
    setLink("");
    setName("");
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      buttonText={buttonText}
      handleSubmit={handleSubmit}
      title="Новое место"
      name="add_card"
    >
      <input
        type="text"
        className="form__text"
        name="card_title"
        placeholder="Название"
        onChange={handleChangeName}
        value={name}
        maxLength={30}
        required
      />
      <span className="form__error" id="card_title-error"></span>
      <input
        type="url"
        className="form__text"
        name="card_link"
        value={link}
        placeholder="Ссылка на картинку"
        onChange={handleChangeLink}
        required
      />
      <span className="form__error" id="card_link-error"></span>
    </PopupWithForm>
  );
}

export default PopupAddCard;

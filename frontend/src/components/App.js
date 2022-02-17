import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupUpdateAvatar from "./PopupUpdateAvatar";
import PopupEditProfile from "./PopupEditProfile";
import PopupAddCard from "./PopupAddCard";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import Login from "./Login";
import Register from "./Register";
import * as auth from "../utils/auth";
import InfoTooltip from "./InfoTooltip";
import iconAppruve from "../images/iconAppruve.svg";
import iconErr from "../images/iconErr.svg";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isInfoTooltipOpen, setIsTooltipOpen] = React.useState(false);

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [messagePopup, setMessagePopup] = React.useState({
    icon: "",
    text: "",
  });
  const jwt = localStorage.getItem("jwt");
  const nav = useNavigate();

  //описание авторизации
  function onLogin({ password, email }) {
    return auth
      .signin({ password, email })
      .then((data) => {
        //если получили токен и авторизация прошла успешно
        //то открывается окно подтверждения и переадресовывает на главную страницу
        console.log(data)
        if (data.token) {
          handleInfoTooltipOpen({
            icon: iconAppruve,
            text: "Вы успешно авторизовались!",
          });
          handleIsTooltipOpen();
          setEmail(email);
          setLoggedIn(true);
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("email", email);
          nav("/");
        } else {
          handleInfoTooltipOpen({
            icon: iconErr,
            text: "Что-то пошло не так! Попробуйте ещё раз.",
          });
          handleIsTooltipOpen();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //описание регистрации
  function onRegister({ password, email }) {
    return auth
      .signup({ password, email })
      .then((data) => {
        if (data.data._id) {
          handleInfoTooltipOpen({
            icon: iconAppruve,
            text: "Вы успешно зарегистрировались!",
          });
          handleIsTooltipOpen();
          nav("/sign-in");
        }
      })
      .catch((err) => {
        handleInfoTooltipOpen({
          icon: iconErr,
          text: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        handleIsTooltipOpen();
        console.log(err);
      });
  }

  //состояние данных подтверждения регистрации
  function handleInfoTooltipOpen({ icon, text }) {
    setMessagePopup({ icon, text });
  }

  //выход
  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    localStorage.removeItem("email");
    setEmail("");
    nav("/sign-in");
  }

  React.useEffect(() => {
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((data) => {
          if (data && data.email) {
            setEmail(data.email);
            setLoggedIn(true);
            nav("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      api
        .getUserData()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      api
        .getCardsData()
        .then((data) => {
          setCards(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.indexOf(currentUser._id) > -1;
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        const newCard = cards.filter((c) => c !== card);
        setCards(newCard);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ isOpen: false });
    setIsTooltipOpen(false);
  }

  function handleIsTooltipOpen() {
    setIsTooltipOpen(true);
  }

  function handleCardClick(card) {
    card.isOpen = !card.isOpen;
    setSelectedCard(card);
  }

  function handleUpdateUser({ name, about }) {
    api
      .updateUserData({ name, about })
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .updateAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .addCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          loggedIn={loggedIn}
          email={email}
          handleSignOut={handleSignOut}
        />
        <Routes>
          <Route
            path="/sign-up"
            element={<Register onRegister={onRegister} />}
          />
          <Route path="/sign-in" element={<Login onLogin={onLogin} />} />
          <Route
            exact
            path="/"
            element={
              !loggedIn ? <Navigate to="/sign-in" /> : <Navigate to="/main" />
            }
          />
          <Route
            path="/main"
            element={
              <RequireAuth loggedIn={loggedIn}>
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              </RequireAuth>
            }
          />
        </Routes>
        <PopupUpdateAvatar
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateAvatar}
          buttonText="Сохранить"
        />
        <PopupEditProfile
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          buttonText="Сохранить"
        />
        <PopupAddCard
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          buttonText="Сохранить"
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isInfoTooltipOpen}
          messagePopup={messagePopup}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

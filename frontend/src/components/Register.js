import React from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");



  function handleSubmit(e) {
    e.preventDefault();

    onRegister({ password, email })

  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  return (
    <section className="register">
      <form className="register__form" onSubmit={handleSubmit}>
        <p className="register__title">Регистрация</p>
        <input type="email" placeholder="Email" className="register__input" value={email} onChange={handleChangeEmail} />
        <input type="password" placeholder="Пароль" className="register__input" value={password} onChange={handleChangePassword} />
        <button className="register__btn" >Зарегистрироваться</button>
        <Link className="register__enter" to="/sign-in">Уже зарегистрировались? Войти</Link>
      </form>
    </section>
  )
}

export default Register;
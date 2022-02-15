import React from "react";

function Login({ onLogin }) {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");


    function handleSubmit(e) {
        e.preventDefault();

        onLogin({ password, email })

    }

    function handleChangeEmail(evt) {
        setEmail(evt.target.value);
    }

    function handleChangePassword(evt) {
        setPassword(evt.target.value);
    }

    return (
        <section className="login">
            <form className="login__form" onSubmit={handleSubmit}>
                <p className="login__title">Вход</p>
                <input type="email" placeholder="Email" className="login__input" value={email} onChange={handleChangeEmail} />
                <input type="password" placeholder="Пароль" className="login__input" value={password} onChange={handleChangePassword} />
                <button className="login__btn" >Войти</button>
            </form>
        </section>
    )
}

export default Login;
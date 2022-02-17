class Api {
    constructor({endpoint, headers}) {
        this._endpoint = endpoint
        this._headers = headers
    }

    _resStatus(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    headers(){
        return {
            ...this._headers,
            'authorization': 'Bearer ' + localStorage.getItem('jwt'),
        }
    }
    

    getUserData() {
        return fetch(`${this._endpoint}/users/me`, {
            headers: this.headers()
        })
        .then(this._resStatus);
    }

    getCardsData() {
        return fetch(`${this._endpoint}/cards`, {
            headers: this.headers(),
        })
        .then(this._resStatus);
    }

    updateUserData({name, about}) {
        return fetch(`${this._endpoint}/users/me`, {
            method: 'PATCH',
            headers: this.headers(), 
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
        .then(this._resStatus)
    }

    addCard({name, link}) {
        return fetch(`${this._endpoint}/cards`, {
            method: 'POST',
            headers: this.headers(), 
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
        .then(this._resStatus)
    }

    deleteCard(cardId) {
        return fetch(`${this._endpoint}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.headers(), 
        })
        .then(this._resStatus)
    }

    setLike(cardId) {
        return fetch(`${this._endpoint}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this.headers(), 
        })
        .then(this._resStatus)
    }

    deleteLike(cardId) {
        return fetch(`${this._endpoint}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this.headers(), 
        })
        .then(this._resStatus)
    }

    changeLikeCardStatus(cardId, isLiked) {
        if (isLiked) {
            return this.deleteLike(cardId)
        } else {
            return this.setLike(cardId)
        }
      }

    updateAvatar(url) {
        return fetch(`${this._endpoint}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers(), 
            body: JSON.stringify({
                avatar: url
            })
        })
        .then(this._resStatus)
    }

}

const api = new Api({
    endpoint: 'https://api.jeromejer.nomoredomains.xyz',
    headers: {
        //'authorization': 'Bearer ' + localStorage.getItem('jwt'),
        'Content-type': 'application/json'
    }
  })

export default  api;
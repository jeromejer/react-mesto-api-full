class Api {
    constructor({endpoint, headers}){
        this._endpoint = endpoint
        this._headers = headers
    }

    _resStatus(res) {
        if (res.ok) {
            return res.json();
        } 
          return Promise.reject(`Ошибка: ${res.status}`);
        }
    

    getUserData() {
        return fetch(`${this._endpoint}/users/me`, {
            headers: this._headers
        })
        .then(this._resStatus);
    }

    getCardsData() {
        return fetch(`${this._endpoint}/cards`, {
            headers: this._headers
        })
        .then(this._resStatus);
    }

    updateUserData({name, about}) {
        return fetch(`${this._endpoint}/users/me`, {
            method: 'PATCH',
            headers: this._headers, 
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
            headers: this._headers, 
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
            headers: this._headers, 
        })
        .then(this._resStatus)
    }

    setLike(cardId) {
        return fetch(`${this._endpoint}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this._headers, 
        })
        .then(this._resStatus)
    }

    deleteLike(cardId) {
        return fetch(`${this._endpoint}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this._headers, 
        })
        .then(this._resStatus)
    }

    changeLikeCardStatus(cardId, isLiked) {
        if (isLiked) {
          return this.setLike(cardId) 
        } else {
          return this.deleteLike(cardId)
        }
      }

    updateAvatar(url) {
        return fetch(`${this._endpoint}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers, 
            body: JSON.stringify({
                avatar: url
            })
        })
        .then(this._resStatus)
    }

}

const api = new Api({
    endpoint: 'https://mesto.nomoreparties.co/v1/cohort-29',
    headers: {
      authorization: '78fb05fc-0800-40e0-9053-b1d17c19d9a5',
      'Content-type': 'application/json'
    }
  })

export default  api;
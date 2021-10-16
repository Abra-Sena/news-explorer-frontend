// description to request to  my API
import { BASE_URL, token } from "./Constants";


class MainApi {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers
    })
    .then((res) => res.ok ? res.json() : Promise.reject(`Error! ${res.statusText}`))
    .then((results) => results.data)
  }

  getArticles() {
    return fetch(`${this._baseUrl}/articles`, {
      method: "GET",
      headers: this._headers
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Error! ${res.statusText}`))
  }

  saveArticle(article) {
    return fetch(`${this._baseUrl}/articles`, {
      method: "POST",
      headers: this._headers,
      // body: JSON.stringify(article)
      body: JSON.stringify(article)
    })
    .then((res) => res.ok ? res.json() : Promise.reject(`Error! ${res.statusText}`))
  }

  deleteArticle(articleId) {
    return fetch(`${this._baseUrl}/articles/${articleId}`, {
      method: "DELETE",
      headers: this._headers
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Error! ${res.statusText}`))
  }
}

export const mainApi = new MainApi({
  baseUrl: BASE_URL,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`
  }
});

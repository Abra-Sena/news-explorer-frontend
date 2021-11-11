// description to request to  my API
import { BASE_URL, checkResult } from "./Constants";

class MainApi {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _setHeaders(token) {
    if(token !== '') {
      return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      }
    }

    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._setHeaders(token)
    })
    .then(res => checkResult(res))
    .then((results) => results.data)
  }

  getArticles(token) {
    return fetch(`${this._baseUrl}/articles`, {
      method: "GET",
      headers: this._setHeaders(token)
    })
    .then(res => checkResult(res))
  }

  saveArticle(token, article) {
    return fetch(`${this._baseUrl}/articles`, {
      method: "POST",
      headers: this._setHeaders(token),
      body: JSON.stringify(article)
    })
    .then(res => checkResult(res))
  }

  deleteArticle(token, articleId) {
    return fetch(`${this._baseUrl}/articles/${articleId}`, {
      method: "DELETE",
      headers: this._setHeaders(token)
    })
    .then(res => checkResult(res))
  }
}

const mainApi = new MainApi({ baseUrl: BASE_URL });


export default mainApi;

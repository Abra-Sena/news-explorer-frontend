// description to request to  my API
import { BASE_URL } from "./Constants";

const checkResult = (res) => {
  return (res.ok ? res.json() : Promise.reject(`Error! ${res.statusText}`));
}

export const register = (email, password, name) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password, name })
  })
}

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password })
  })
}

export const getUserInfo = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
  .then((res) => checkResult(res))
  .then((results) => results.data)
}

export const getArticles = (token) => {
  return fetch(`${BASE_URL}/articles`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    }
  })
  .then(res => checkResult(res))
}

export const saveArticle = ({title, description, url, urlToImage, publishedAt, keyword, source}, token) => {
  return fetch(`${BASE_URL}/articles`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      title, description, url, urlToImage, publishedAt, keyword, source
    })
  })
  .then((res) => checkResult(res))
}

export const deleteArticle = (articleId, token) => {
  return fetch(`${BASE_URL}/articles/${articleId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    }
  })
  .then(res => checkResult(res))
}


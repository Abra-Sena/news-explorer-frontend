// description of the requests to newsapi.org
import { apiKey } from "./Constants";

const from = 7 * 24 * 60 * 60 * 1000;
const today = new Date().toISOString();
// returns the date 7 days prior to the current date
const aWeek = new Date(Date.now() - from).toISOString();

export default class NewsApi {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._apiKey = apiKey;
  }

  searchArticles(query) {
    return fetch(
      `${this._baseUrl}q=${query}
        &from=${aWeek}&to=${today}
        &sortBy=relevancy
        &pageSize=100
        &apiKey=${this._apiKey}
      `
    )
      .then((res) => res.ok ? res.json() : Promise.reject(`Error! ${res.status}`))
      .then((res) => res.articles);
  }
}

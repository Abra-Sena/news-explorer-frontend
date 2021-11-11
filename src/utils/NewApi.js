// description of the requests to newsapi.org
import { API_KEY, BASE_NEWS_URL, checkResult } from "./Constants";

const from = 7 * 24 * 60 * 60 * 1000;
const today = new Date().toISOString();
// returns the date 7 days prior to the current date
const aWeek = new Date(Date.now() - from).toISOString();

class NewsApi {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._apiKey = API_KEY;
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
      .then((res) => checkResult(res))
      .then((res) => res.articles);
  }
}

const newsApi = new NewsApi({
  baseUrl: BASE_NEWS_URL,
  headers: {
    "Content-Type": "application/json",
  }
});


export default newsApi;
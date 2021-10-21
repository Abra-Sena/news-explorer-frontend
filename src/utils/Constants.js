export const BASE_URL = "http://localhost:3000";
// export const BASE_URL = "https://api.abra-news.students.nomoreparties.site";
export const BASE_NEWS_URL = "https://newsapi.org/v2/everything?";
export const API_KEY = '4c6c3ed9dc3243fb8b94bdc1226d391c';

export const COUNTER = 3;
export const EMAIL_PATTERN = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;
// At least 6 characters, min 1 Uppercase 1 Lowercase 1 Number and only contains symbols from the alphabet and numbers
export const PASS_PATTERN = /(?=[A-Za-z0-9]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,}).*$/g;

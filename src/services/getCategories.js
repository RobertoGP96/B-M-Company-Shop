import { URL_STORE_GET_CATEGORIES } from "../settings";

export function getCategories() {
  return fetch(URL_STORE_GET_CATEGORIES)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

import { URL_GET_PRODUCTS_PROMOTION } from "../../settings"

export function getProductsOfert(id) {
  return fetch(`${URL_GET_PRODUCTS_PROMOTION}${id}`).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error("Not Found");
    }
  });
}
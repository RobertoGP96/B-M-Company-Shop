import { URL_MANAGE_PRODUCTS } from "../../settings";

export function getProductsToManage(filters = "") {
  return fetch(`${URL_MANAGE_PRODUCTS}list/?${filters}`).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error("Not Found");
    }
  });
}

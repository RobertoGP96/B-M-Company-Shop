import { URL_MANAGE_PROMOTIONS } from "../../settings"

export function getPromotions(filters='') {
  return fetch(`${URL_MANAGE_PROMOTIONS}?${filters}`).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error("Not Found");
    }
  });
}

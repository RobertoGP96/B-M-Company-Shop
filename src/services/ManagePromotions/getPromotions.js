import { URL_MANAGE_PROMOTIONS } from "../../settings"

export function getPromotions() {
    return fetch(URL_MANAGE_PROMOTIONS).then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Not Found");
        }
      });
}
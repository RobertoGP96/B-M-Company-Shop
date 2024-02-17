import { URL_MAGNAMENT_USERS } from "../../settings"

export function getUsers(filters='') {
  return fetch(`${URL_MAGNAMENT_USERS}?${filters}`).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error("Not Found");
    }
  });
}

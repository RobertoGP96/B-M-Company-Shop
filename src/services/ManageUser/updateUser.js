import { URL_MAGNAMENT_USERS } from "../../settings";

export function updateUser({id,info,token
}) {
  return fetch(`${URL_MAGNAMENT_USERS}${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(info),
  }).then((response) => {
    if (response.status === 201) {
      return response.json();
    } else {
      return response.json()
      .then((responseData) => {
        console.log(responseData);
      throw new Error("error: " + responseData);
      });

    }
  });
}

import { URL_MAGNAMENT_USERS } from "../../settings";

export function updateUser({info,token
}) {
  return fetch(URL_MAGNAMENT_USERS, {
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
      console.log(response)
      throw new Error("Error al crear la usuario");
    }
  });
}
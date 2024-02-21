import { URL_MAGNAMENT_USERS } from "../../settings";

export function addUsers({info,token
}) {
  return fetch(URL_MAGNAMENT_USERS, {
    method: "POST",
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

              console.log(responseData)
              console.log(username,
                email,
                password,
                name,
                last_name,
                is_staff,
                is_active,
                phone,
                country,
                state,
                address,
                zip_code,
                token,)
      throw new Error("Error al crear la usuario");
      });

    }
  });
}

import { URL_MAGNAMENT_USERS } from "../../settings";

export function addUsers({
  username="roberto",
  email="jkskjs@gmail.com",
  password="kasndkl",
  name="asldm",
  last_name="la;smd;l",
  is_staff=true,
  is_active=true,
  phone="541635463",
  country="sadasd",
  state="asdasdasdxca",
  address="sadasdasd",
  zip_code="2131213",
  token,
}) {
  let formData = new FormData();
  formData.append("name", name);
  formData.append("username", username);
  formData.append("last_name", last_name);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("is_active", is_active);
  formData.append("is_staff", is_staff);
  formData.append("country", country);
  formData.append("state", state);
  formData.append("address", address);
  formData.append("phone", phone);
  formData.append("zip_code", zip_code);
  
  return fetch(URL_MAGNAMENT_USERS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(formData)
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

import { URL_MAGNAMENT_USERS } from "../../settings";

export function addUsers({
  username="",
  email="",
  password="",
  name= "",
  last_name= "",
  is_staff= false,
  is_active= false,
  phone="",
  country="",
  state="",
  address="",
  zip_code="",
  token
}) {
  let formData = new FormData();
  formData.append('name', name);
  formData.append('username', username);
  formData.append('last_name', last_name);
  formData.append('email', email);
  formData.append('password',password);
  formData.append('is_active', is_active);
  formData.append('is_staff', is_staff);
  formData.append('country', country);
  formData.append('state', state);
  formData.append('address', address);
  formData.append('phone', phone);
  formData.append('zip_code', zip_code);
  return fetch(URL_MAGNAMENT_USERS, {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
    },
    body: formData,
  }).then((response) => {
    if (response.status === 201) {
      return response.json();
    } else {
      console.log(response);
      throw new Error("Error al crear la usuario");
      
    }
  });
}

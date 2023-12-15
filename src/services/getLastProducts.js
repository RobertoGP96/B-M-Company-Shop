import {URL_GET_PRODUCTS} from "../settings"

export default function getLastProducts(){
  return fetch(`${URL_GET_PRODUCTS}?ordering=created_at`)
  .then(res => res.json())
  .then(data => {return data})
}

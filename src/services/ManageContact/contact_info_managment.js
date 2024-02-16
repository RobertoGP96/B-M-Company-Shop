import {CONTACT_INFO_URL} from '../../settings.js'

export function getContactInfo(){
    return fetch(CONTACT_INFO_URL, {
        method: "GET",
        headers: {
            'Content-Type': "application/json",
        }
    })
    .then(response => {
        if(response.status == 200){
            return response.json()
            .then(data => {return data.results[0]})
        }else{
            throw new Error('Error al obtener la info de contacto')
        }
    })
    
}

export function editContactInfo(info){
    return fetch(`${CONTACT_INFO_URL}1/`, {
        method: "PUT",
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(info)
    })
    .then(response => response.json())
    .then(response => {return response})
    .catch(error => console.error('Error:', error));
}
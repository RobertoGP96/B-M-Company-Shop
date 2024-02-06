const CONTACT_INFO_URL = "https://bmcompanybackend.pythonanywhere.com/contact_info/"

export default function getContactInfo(){
    return fetch(CONTACT_INFO_URL, {
        method: "GET",
        headers: {

        }
    })
    .then(response => response.json())
    .then(data => {return data})
}

export function editContactInfo({info}){
    return fetch(`${CONTACT_INFO_URL}/1/`, {
        method: "PUT",
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(info)

    })
    .then(response => response.json())
    .then(data => {return data})
}

//Ejemplo de como usar el edit
//editContactInfo({
//    info:{
//        "phone1": "546546546asdasee",
//        "phone2": "324234234",
//        "email1": "rtd84d74Q@gmail.com",
//        "email2": "rtd84d74Q@gmail.com",
//        "location": "asdasdasd",
//        "facebook": "https://facebook.com",
//        "whatsapp": "https://whatsapp.com",
//        "telegram": "https://telegram.org"
//    }
//})
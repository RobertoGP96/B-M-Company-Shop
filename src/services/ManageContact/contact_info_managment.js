const CONTACT_INFO_URL = "https://bmcompanybackend.pythonanywhere.com/contact_info/"

export function getContactInfo(){
    return fetch(CONTACT_INFO_URL, {
        method: "GET",
        headers: {
            'Content-Type': "application/json",
        }
    })
    .then(response => response.json())
    .then(data => {return data.results[0]})
}

export function editContactInfo(info/*,token*/){
    return fetch(`${CONTACT_INFO_URL}/1/`, {
        method: "PUT",
        headers: {
            'Content-Type': "application/json",
        },
        /*'Authorization': `Token ${token}`,*/
        body: JSON.stringify(info)
    })
    .then(response => response.json())
    .then(response => {return response})
    .catch(error => console.error('Error:', error));
}
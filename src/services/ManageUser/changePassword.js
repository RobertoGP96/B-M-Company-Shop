import {URL_MANAGEMENT_USERS} from '../../settings.js'

export function changePassword({newPassword,user_id, token}){
    return fetch(`${URL_MANAGEMENT_USERS}${user_id}/change_password/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Authorization":`Token ${token}`
        },
        body: JSON.stringify({new_password: newPassword})
    })
    .then(data => {
        if(data.statusText == "New password has been saved."){
            return "Password change successfuly"
        }
        else{
            if(data.statusText == "Bad Request"){
                return "Password Error"
            }
        }
    })
    
}
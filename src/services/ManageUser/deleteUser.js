import {URL_MAGNAMENT_USERS} from "../../settings"

export function deleteUser({users, token}){
    return(
        fetch(`${URL_MAGNAMENT_USERS}`,{
            method: 'DELETE',
            headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({users_to_delete:users})
        })
        .then(response => {
            if(response.status == 200){
                return response
            }
            else{
                throw new Error("Error al eliminar el usuario")
            }
        })
    )
}
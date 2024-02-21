import {URL_MAGNAMENT_USERS} from "../../settings"

export function deleteUser({id, token}){
    return(
        fetch(`${URL_MAGNAMENT_USERS}/${id}`,{
            method: 'DELETE',
            headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
            }
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
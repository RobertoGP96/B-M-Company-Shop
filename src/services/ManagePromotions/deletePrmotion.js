import {URL_MANAGE_PROMOTIONS} from "../../settings"

export function deletePromotions({promotions, token = ""}){
    return(
        fetch(URL_MANAGE_PROMOTIONS,{
            method: 'DELETE',
            headers: {
                //Authorization: `Token ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({oferts_to_delete:promotions})
        })
        .then(response => {
            if(response.status == 200){
                return response
            }
            else{
                console.log("error")
                throw new Error("Error al eliminar el promoción")
            }
        })
    )
}
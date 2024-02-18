import { useState, useEffect,useContext} from "react";
import { getUsers } from "../services/ManageUser/getUsers";
import AuthenticationContext from '../context/authenticationContext.jsx'

export function useGetUsers({searchParams,setUsers}) {
    const {auth} = useContext(AuthenticationContext)
    const [loading, setLoading] = useState(false);
    const [users, changeUsers] = useState([])
    //get promotions of store
    useEffect(() => {
        setLoading(true);
        getUsers(searchParams,auth.token)
        .then((data) => {
            setUsers(data.results);
            console.log(data.results);
            changeUsers(datadata.results);
            setLoading(false);
        })
        .catch(() => {
            setLoading(false); 
        });
    }, [searchParams]);

    return({users,loading,setLoading})

}
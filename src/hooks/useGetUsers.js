import { useState, useEffect } from "react";
import { getUsers } from "../services/ManageUser/getUsers";

export function useGetUsers({searchParams,setUsers}) {
    const [loading, setLoading] = useState(false);
    const [users, changeUsers] = useState([])
    //get promotions of store
    useEffect(() => {
        setLoading(true);
        getUsers(searchParams)
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
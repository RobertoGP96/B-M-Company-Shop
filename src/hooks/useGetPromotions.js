import { useState, useEffect } from "react";
import { getPromotions } from "../services/ManagePromotions/getPromotions";

export function useGetPromotions({searchParams, setNumOfPromotions,setPromotions}) {
    const [loading, setLoading] = useState(false);
    const [promotions, changePromotions] = useState([])
    //get promotions of store
    useEffect(() => {
        setLoading(true);
        getPromotions(searchParams)
        .then((data) => {
            setPromotions(data.results);
            console.log(data.results);
            changePromotions(data.results);
            setNumOfPromotions(data.count);
            setLoading(false);
        })
        .catch(() => {
            setLoading(false);
            setNumOfPromotions(0)
        });
    }, [searchParams]);

    return({promotions,loading,setLoading})

}



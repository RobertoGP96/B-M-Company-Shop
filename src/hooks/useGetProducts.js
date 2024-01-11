import { useState, useEffect } from "react";
import {getProducts} from '../services/getProducts'

export function useGetProducts({searchParams, setNumOfProducts}) {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false);
    //get products of store
    useEffect(() => {
        setLoading(true);
        getProducts(searchParams)
        .then((data) => {
            setProducts(data.results);
            setNumOfProducts(data.count)
            setLoading(false);
        })
        .catch(() => {
            setLoading(false);
            setNumOfProducts(0)
        });
    }, [searchParams]);

    return ( {products, loading} );
}


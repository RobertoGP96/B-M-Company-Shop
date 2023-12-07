import React, {useState} from 'react'

const QueryFiltersContext = React.createContext("")

export function QueryFiltersContextProvider({children}){
    const [queryFilters, setQueryFilters] = useState(new URLSearchParams(document.location.search).toString())

    function setFilter({name, value}){
        /*Recive a filter name and its value, and includes it in the query params of the url*/
        let params = new URLSearchParams(document.location.search)
        //if the given filter don't exist, it's added
        if(params.get(name) === null){
            params.append(name, value)
        }
        //if the given filter already exists, the value is changed
        else{
            params.set(name, value)
        }
        //if the given filter is not pagination and there is a current page active, reset the current page to 1
        if(name !== "page" && params.get("page") !== null){
            params.set("page", 1)
        }
        history.pushState(null, "", `?${params.toString()}`)
        setQueryFilters(params.toString())
    }

    function removeAllFilters(){
        /*Remove all query params from the url*/
        history.pushState(null, "", `?`)
        setQueryFilters("")
    }

    return (<QueryFiltersContext.Provider value = {{queryFilters, setQueryFilters, setFilter, removeAllFilters}}>
        {children}
        </QueryFiltersContext.Provider>)
}

export default QueryFiltersContext
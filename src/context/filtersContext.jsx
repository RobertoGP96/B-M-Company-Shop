import React, {useState} from 'react'

const QueryFiltersContext = React.createContext("")

export function QueryFiltersContextProvider({children}){
    const [queryFilters, setQueryFilters] = useState(new URLSearchParams(document.location.search).toString())

    function setFilter({name, value}){
        let params = new URLSearchParams(document.location.search)
        //if the given filter don't exist
        if(params.get(name) === null){
            params.append(name, value)
        }
        else{
            params.set(name, value)
        }
        history.pushState(null, "", `?${params.toString()}`)
        setQueryFilters(params.toString())
    }

    return (<QueryFiltersContext.Provider value = {{queryFilters, setQueryFilters, setFilter}}>
        {children}
        </QueryFiltersContext.Provider>)
}

export default QueryFiltersContext
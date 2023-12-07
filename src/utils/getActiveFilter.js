export function getActiveFilter(name){
    /*get the active value in the url query params of the filter given*/
    let params = new URLSearchParams(document.location.search)
    let filterValue = params.get(name)
    if(filterValue === null){
        return ""
    }
    return filterValue
}

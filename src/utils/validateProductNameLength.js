export function validateProductNameLength(name){
    if(name.length > 22){
        return `${name.substring(0, 20)}...`
    }
    return name
}
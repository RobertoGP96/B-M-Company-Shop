export function translateFilterName({name, value}){
    switch(name){
        case 'categoria': return "categoría"
        case 'ordering': return "ordenar"
        case 'promotion': return "promoción"
        case 'page': return `página ${value}`
    }
}
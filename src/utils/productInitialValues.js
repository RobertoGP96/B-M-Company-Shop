export function createProductInitialValues({product}){
  return {
    id:product.id,
    product_name: product.product_name,
    product_description: product.product_description,
    about: product.about,
    precio: product.precio,
    categoria: product.categoria,
    promotion: product.promotion,
    is_active: product.is_active,
    in_stock: product.in_stock,
    descuento: product.descuento,
    product_img1: product.product_img1,
    product_img2: product.product_img2,
    product_img3: product.product_img3,
  }
}

export function getInitialValues(){
    return {
        id:null,
        product_name: "",
        product_description: "",
        about: "",
        precio: 0,
        categoria: null,
        promotion:null,
        is_active: true,
        in_stock: 0,
        descuento: 0,
        product_img1: null,
        product_img2: null,
        product_img3: null,
      }
}
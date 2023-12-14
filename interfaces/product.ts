export default interface ProductData {
  id:string
  imageName:string
  name:string
  price:number
  date:Date
  inStock:boolean
  brand: string
  collection: string
  model: string
  material: string
  weight: string
  country: string
  quantity:number
}

export default interface OrderProductData{
  produtct:ProductData
  quantityInOrder:number
}
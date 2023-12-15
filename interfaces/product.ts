export default interface ProductData {
  id:number;
  category_id:number;
  imageName:string
  name:string
  price:string
  date:string
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
  products:ProductData[]
  quantityInOrder:number
}

type ProductOrder = {
  product:ProductData
  quantityInOrder:number
}

export default interface Order{
  product:ProductOrder[]
  date:string
  totalPrice:number
  user_id:number
  status:string
  reasonCancel:string
  id:number
}

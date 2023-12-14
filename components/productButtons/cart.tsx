'use client'

import ProductData from "@/interfaces/product"
import { addToCart } from "@/utils/product"

interface Prop{
    product:ProductData
}


export default function BuyButton ({product}:Prop) {
    return(
        <button onClick={()=> addToCart(product)}
          style={{
            padding: "1vw",
            background: "none",
            borderRadius: "100px",
            fontSize: "1.5vw",
            border: ".25vw solid black",
            cursor: "pointer",
          }}
        >
          В корзину
        </button>
    )
}
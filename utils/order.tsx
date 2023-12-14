import ProductData from "@/interfaces/product";
import OrderProductData from '@/interfaces/product'
import { UserData } from "@/interfaces/user";

const calculateTotalPrice = (products: ProductData[]) => {
    if (!products || products.length === 0) {
      return 0;
    }
  
    const totalPrice = products.reduce((acc, product) => {
      const price = parseFloat(product.price.toString());
  
      if (!isNaN(price)) {
        return acc + price;
      }
  
      return acc;
    }, 0);
  
    return totalPrice;
  };
  

export async function ConfirmOrder(products:OrderProductData[],user:UserData) {
    const res = await fetch('http://localhost:8000/order', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            products,
            totalPrice: calculateTotalPrice(products),
            user_id:user.id,
          }),
    })

}
import OrderProductData from '@/interfaces/product'
import Order from '@/interfaces/product'
import { UserData } from "@/interfaces/user";

const calculateTotalPrice = (products: OrderProductData[]): number => {
  if (!products || products.length === 0) {
    return 0;
  }
  const totalPrice = products.reduce((acc, orderProduct) => {
    const numericString = orderProduct.price.replace(/[^\d]/g, '');
    const price = parseInt(numericString, 10);
    const quantityInOrder = orderProduct.quantityInOrder;
    const piecePrice = price * quantityInOrder;

    
    if (!isNaN(price)) {
      return acc + piecePrice;
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
            status:'в процессе',
            date: new Date().toISOString()
          }),
    })

}

export const getOrders = async (id:number) => {
  try {
    const response = await fetch(`http://localhost:8000/order?user_id=${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }

    const orders = await response.json();

    orders.sort((a: { date: string | number | Date; }, b: { date: string | number | Date; }) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const deleteOrder = async (orderId: number, id: number) => {
  try {
    const getOrderResponse = await fetch(`http://localhost:8000/order/${orderId}`);
    
    if (!getOrderResponse.ok) {
      throw new Error(`Failed to fetch order with ID ${orderId}`);
    }

    const order:Order = await getOrderResponse.json();

    if (order.user_id != id) {
      throw new Error(`Order with ID ${orderId} does not belong to user with ID ${id}`);
    }
    const deleteResponse = await fetch(`http://localhost:8000/order/${orderId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!deleteResponse.ok) {
      throw new Error(`Failed to delete order with ID ${orderId}`);
    }

    const result = await deleteResponse.json();
    return result;
  } catch (error) {
    console.error(`Error deleting order with ID ${orderId}:`, error);
    throw error;
  }
};
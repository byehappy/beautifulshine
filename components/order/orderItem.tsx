import React from 'react';
import OrderProductData from'@/interfaces/product'

interface OrderItemProps {
  order: OrderProductData;
  onDelete: () => void;
}

const OrderItem: React.FC<OrderItemProps> = ({ order, onDelete }) => {
  return (
    <div style={{margin:'1vw',border:'.1vw solid black', borderRadius:'.5vw',padding:'1.5vw',display:'flex',gap:'1vw',flexDirection:'column'}}>
      <h3>Заказ #{order.id}</h3>
      <p>
        Товары: 
        <ul>
          {order.products.map((product, index) => (
            <li key={index} style={{margin:'0 2vw'}}>
              {product.name} - Количество: {product.quantityInOrder}
            </li>
          ))}
        </ul>
      </p>
      <p>Статус: {order.status} </p>
      <p>Сумма заказа: {order.totalPrice} р.</p>
      <button style={{width:'10vw',height:'1.5vw',color:'red',background:'none',cursor:'pointer'}} onClick={onDelete}>Delete Order</button>
    </div>
  );
};

export default OrderItem;

import React from 'react';
import OrderData from '@/interfaces/product'
import OrderItem from './orderItem';

interface OrderListProps {
  orders: OrderData[];
  onDeleteOrder: (orderId: number) => void;
}

const OrderList: React.FC<OrderListProps> = ({ orders, onDeleteOrder }) => {
  return (
    <div style={{margin:'1vw 5vw'}}>
      <h2>Заказы</h2>
      {orders.map((order) => (
        <OrderItem key={order.id} order={order} onDelete={() => onDeleteOrder(order.id)} />
      ))}
    </div>
  );
};

export default OrderList;

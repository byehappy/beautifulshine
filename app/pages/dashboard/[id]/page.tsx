'use client'

import React, { useEffect, useState } from 'react';
import { getOrders, deleteOrder } from '@/utils/order'; 
import OrderList from '@/components/order/orderList';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import Order from '@/interfaces/product'

export default function Dashboard ({params}:{params:{id:number}}) {
  const [orders, setOrders] = useState<Order[]>([]);
  let [traker,setTraker] = useState<number>(1);
  const route = useRouter();
  const {status} = useSession({
    required:true,
    onUnauthenticated() {
      route.push('/pages/auth/login')
    },
  });
  
  useEffect(() => {
    const fetchOrders = async () => {
      const ordersData = await getOrders(params.id); 
      setOrders(ordersData);
    };
    setTraker(traker++)

    fetchOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [traker,route]);

  const handleDeleteOrder = async (orderId: number) => {
    await deleteOrder(orderId,params.id); 
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
    setTraker(traker++)
  };
  if (status === "loading") {
    return "Загрузка авторизации"
  }
  return (
    <div>
      <h1 style={{margin:'1vw 5vw'}}>Личный кабинет</h1>
      <OrderList orders={orders} onDeleteOrder={handleDeleteOrder} />
    </div>
  );
};


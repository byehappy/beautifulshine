"use client";

import CartItem from "@/components/cartItem/cartItem";
import ProductData from "@/interfaces/product";
import OrderProductData from '@/interfaces/product'
import { getProductsByIds } from "@/utils/product";
import { FC, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ButtonOutline } from "@/components/catalog/catalogPage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ConfirmOrder } from "@/utils/order";

const OrderConfirmationModal: FC<{ onClose: () => void,products:OrderProductData[] }> = ({ onClose,products }) => {
  const router = useRouter();
  const [password, setPassword] = useState<string>("");
  const [errorPassword,setErrorPassword] = useState<string>();
  const session = useSession();
  if(session.data == null){
    return <div style={{color:"red",fontWeight:'650'}}>Что бы оформить заказ необходимо быть авторизованным пользователем</div>
  }
  
  const correctPassword =  session.data.user.password;
  
  const handleConfirmOrder = () => {
    if (password === correctPassword) {
      ConfirmOrder(products,session.data.user)
      Cookies.remove('cart')
      onClose();
      router.push('/');
    } else {
      setErrorPassword('Неправильный пароль')
    }
  };

  return (
    <div style={{display:"flex",flexDirection:"column",gap:'1vw',marginTop:'1vw'}}>
      <div>
      <h2>Потвердите свой заказ</h2>
      <label style={{display:"flex",gap:'.3vw',marginTop:'.5vw'}}>
        Пароль:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <div style={{display:"flex",gap:'2vw',marginTop:'.5vw'}}>
      <ButtonOutline onClick={handleConfirmOrder}>Сформировать заказ</ButtonOutline>
      <ButtonOutline style={{padding:"0 1vw"}} onClick={onClose}>Отмена</ButtonOutline>
      </div>
      </div>
      {errorPassword ? <>{errorPassword}</> : <></>}
    </div>
  );
};

const Cart: FC = () => {
  const [products, setProducts] = useState<ProductData[]>();
  const existingCart = JSON.parse(Cookies.get("cart") || "[]");
  const [removeTrigger, setRemoveTrigger] = useState<number>(0);
  const [isOrderConfirmationModalOpen, setIsOrderConfirmationModalOpen] =
    useState<boolean>(false);
  const handleRemove = (productId: number) => {
    const existingCart = JSON.parse(Cookies.get("cart") || "[]");

    const updatedCart = existingCart.filter(
      (item: number) => item !== productId
    );

    Cookies.set("cart", JSON.stringify(updatedCart));
    setRemoveTrigger((prev) => prev + 1);
  };
  const handleOpenOrderConfirmationModal = () => {
    setIsOrderConfirmationModalOpen(true);
  };

  const handleCloseOrderConfirmationModal = () => {
    setIsOrderConfirmationModalOpen(false);
  };
  useEffect(() => {
    const fetchProducts = async () => {
      const productData = await getProductsByIds(existingCart);
      setProducts(productData.map((product) => ({ ...product, quantityInOrder: 1 })));
    };
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removeTrigger]);

  if (products === undefined || products.length === 0) {
    return <div style={{ padding: "1vw 5vw",fontSize:'1.5vw',fontWeight:'800' }}>Ваша корзина пуста</div>;
  }

  return (
    <div style={{ margin: "3vw 5vw" }}>
      <h1>Shopping Cart</h1>
      <div style={{ display: "flex", gap: "2vw" }}>
        {products.map((productArray: ProductData) => (
          <CartItem
            key={productArray.id}
            product={productArray}
            onRemove={() => handleRemove(productArray.id)}
          />
        ))}
      </div>
      {!isOrderConfirmationModalOpen && (
        <ButtonOutline style={{margin:'2vw 0'}} onClick={handleOpenOrderConfirmationModal}>Оформить заказ</ButtonOutline>
      )}
      {isOrderConfirmationModalOpen && (
        <OrderConfirmationModal onClose={handleCloseOrderConfirmationModal} products={products}/>
      )}
    </div>
  );
};

export default Cart;

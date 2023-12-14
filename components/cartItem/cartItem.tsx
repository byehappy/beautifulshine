import { FC, useState } from 'react';
import { Picture } from '../productCard/Card';
import styled from 'styled-components';
import OrderProductData from '@/interfaces/product'
import { useEffect } from 'react';

interface CartItemProps {
  product: OrderProductData;
  onRemove: () => void;
}
const Container = styled.div`
  width: 15vw;
  display: flex;
  justify-content: flex-start;
  padding-top: 1vw;
  flex-direction: column;
  display:flex;
  justify-content:center;
  align-items:center;
  border-radius:1vw;
  border:.1vw solid lightblue;
  padding-bottom:1vw;
  margin-top:2vw;
`;

const QuantityButton = styled.button`
  width:1.5vw;
  height:1.5vw;
  background:none;
  border:.1vw solid gray;
  border-radius:1vw;
  display:flex;
  justify-content:center;
  align-items:center;
  cursor: pointer;
`

const CartItem: FC<CartItemProps> = ({ product, onRemove }) => {
  const [quantityInOrder, setQuantityInOrder] = useState<number>(product.quantityInOrder || 1);
  
  useEffect(() => {
    product.quantityInOrder = quantityInOrder;
  }, [product,quantityInOrder]);

  const handleIncrease = () => {
    if (quantityInOrder < product.quantity) {
      setQuantityInOrder((prev) => prev + 1);
    }
  };

  const handleDecrease = () => {
    if (quantityInOrder > 1) {
      setQuantityInOrder((prev) => prev - 1);
    }
  };

  return (
    <Container>
      <button onClick={onRemove} style={{ cursor: 'pointer', background: 'none', border: 'none', color: 'red' }}>
        Удалить
      </button>
      <Picture src={`/images/product/${product.imageName}.jpg`} alt={product.name} width={1920} height={1080} style={{ cursor: 'auto' }} />
      <p>{product.name}</p>
      <p>Price: {product.price}</p>
      <div style={{ display: 'flex', gap: '.5vw', margin: '1vw 0 0 0' }}>
        <QuantityButton onClick={handleDecrease}>-</QuantityButton>
        <span>{quantityInOrder}</span>
        <QuantityButton onClick={handleIncrease}>+</QuantityButton>
      </div>
    </Container>
  );
};

export default CartItem;
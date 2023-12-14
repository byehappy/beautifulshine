import { Picture } from "@/components/productCard/Card";
import ProductData from "@/interfaces/product";
import BuyButton from "@/components/productButtons/cart";
import { Metadata } from "next";
interface Prop {
  params: {
    id: string;
  };
}

async function getProductData(id: string): Promise<ProductData> {
  const res = await fetch(`http://localhost:8000/product?id=${id}`,{next:{revalidate:10}});
  const data = await res.json();

  return data[0];
}

export async function generateMetadata(
  { params:{id}}: Prop
): Promise<Metadata> {
 
  const product = await getProductData(id);
 
  return {
    title: product.name
  }
}

export default async function Product({ params: { id } }: Prop) {
  const product: ProductData = await getProductData(id);
  if (product.inStock == false){
    return (
    <div style={{margin:'5vw auto',fontSize:'6vw',fontWeight:'800',display:'flex',justifyContent:"center"}}>
      Товара нет в наличии
    </div>
    )
  }
  return (
    <div
      style={{
        display: "flex",
        margin: "3vw 15vw",
        gap: "5vw",
        justifyContent: "space-between",
      }}
    >
      <div style={{ width: "20vw" }}>
        <Picture
          style={{ cursor: "auto" }}
          src={`/images/product/${product.imageName}.jpg`}
          alt={product.imageName}
          width={1920}
          height={1080}
          objectFit="contain"
        />
      </div>
      <div
        style={{
          width: "20vw",
          display: "flex",
          flexDirection: "column",
          gap: "3vw",
          marginRight: "10vw",
        }}
      >
        <p style={{ fontSize: "2vw", margin: "auto" }}>{product.name}</p>
        <ul style={{ listStyleType: "none", padding: 0,gap:'1vw',display:'flex',flexDirection:"column" }}>
          <li>Бренд: {product.brand}</li>
          <li>Коллекция: {product.collection}</li>
          <li>Модель: {product.model}</li>
          <li>Материал: {product.material}</li>
          <li>Вес: {product.weight}</li>
          <li>Страна: {product.country}</li>
          <li style={{fontWeight:'800',fontSize:'2vw'}}>Цена: {product.price}</li>
        </ul>

        <BuyButton product={product} />
      </div>
    </div>
  );
}
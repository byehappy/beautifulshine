import ProductData from "@/interfaces/product";
import Cookies from "js-cookie";

export function addToCart(product: ProductData) {
  const existingCart = JSON.parse(Cookies.get("cart") || "[]");

  const isProductInCart = existingCart.some(
  (id: number) => id === Number(product.id)
  );


  if (!isProductInCart) {
    const updatedCart = [...existingCart, product.id];
    Cookies.set("cart", JSON.stringify(updatedCart));
  }

}

export function addToFavorites(product: ProductData) {
  const existingFavorites = JSON.parse(Cookies.get("favorites") || "[]");

  const isProductInFavorites = existingFavorites.some(
    (item: { id: string }) => item.id === product.id
  );

  if (!isProductInFavorites) {
    const updatedFavorites = [...existingFavorites, product.id];
    Cookies.set("favorites", JSON.stringify(updatedFavorites));
  }
}


export async function getProductsByIds(ids: string[]): Promise<ProductData[]> {
  try {
    const productDataArray: ProductData[] = [];

    for (const id of ids) {
      const res = await fetch(`http://localhost:8000/product?id=${id}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch product with ID ${id}`);
      }
      const productData = await res.json();
      productDataArray.push(productData[0]);
    }

    return productDataArray;
  } catch (error) {
    return [];
  }
}


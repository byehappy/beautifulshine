import { Metadata } from "next";
import ProductData from "@/interfaces/product";
import CatalogPage from "@/components/catalog/catalogPage";


async function getProducts(sortBy = 'date', sortOrder = 'desc') {
  const res = await fetch(`http://localhost:8000/product?_sort=${sortBy}&_order=${sortOrder}`, { next: { revalidate: 600 } });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const allProducts: ProductData[] = await res.json();

  const inStockProducts = allProducts.filter(product => product.inStock);

  return inStockProducts;
}
export const metadata: Metadata = {
  title: 'Catalog page',
};

async function Catalog() {
  const data = await getProducts(); 

  return (
    <>
      <CatalogPage data={data} />
    </>
  );
};


export default Catalog;



import { Metadata } from "next";
import ProductData from "@/interfaces/product";
import CatalogPage from "@/components/catalog/catalogPage";
import Category from "@/interfaces/category";


async function getProducts(sortBy = 'date', sortOrder = 'desc') {
  const res = await fetch(`http://localhost:8000/product?_sort=${sortBy}&_order=${sortOrder}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const allProducts: ProductData[] = await res.json();

  const inStockProducts = allProducts.filter(product => product.inStock);

  return inStockProducts;
}

async function getCategories():Promise<Category[]> {
  const res = await fetch(`http://localhost:8000/category`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const allCatalogs: Category[] = await res.json();

  return allCatalogs;
}

export const metadata: Metadata = {
  title: 'Catalog page',
};

async function Catalog() {
  const data = await getProducts(); 
  const categories = await getCategories();

  return (
    <>
      <CatalogPage data={data} categories={categories}/>
    </>
  );
};


export default Catalog;



"use client"

import React, { useState, useEffect } from 'react';
import CardProduct, { Picture } from "@/components/productCard/Card";
import styled from 'styled-components';
import Category from '@/interfaces/category';
import ProductData from '@/interfaces/product';

interface CatalogPageProps {
  data: ProductData[];
  categories:Category[];
}

export const ButtonOutline = styled.button`
  background:none;
  padding:.5vw;
  border: .2vw solid black;
  border-radius:2vw;
  cursor: pointer;
`

const CatalogPage: React.FC<CatalogPageProps> = ({ data, categories }) => {
  const [sortedData, setSortedData] = useState<ProductData[]>(data);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  
  const sortBy = (key: keyof ProductData) => {
    const sorted = [...sortedData].sort((a, b) => {
      if (key === 'date') {
        const dateA = new Date(a[key] as unknown as string).getTime();
        const dateB = new Date(b[key] as unknown as string).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      } else {
        const comparison = (a[key] as string).localeCompare(b[key] as string);
        return sortOrder === 'asc' ? comparison : -comparison;
      }
    });

    setSortedData(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const filterByCategory = (categoryId: number) => {
    const filteredData = data.filter((product) => product.category_id === categoryId);
    setSortedData(filteredData);
  };

  const resetFilter = () => {
    setSortedData(data);
  };

  return (
    <div style={{ margin: '1vw 5vw', display: 'flex', gap: '1vw' }}>
      <div style={{display:'flex',gap:'1vw',flexDirection:'row-reverse',background:'#e7e7e7',padding:'.5vw',borderRadius:'1vw',overflowY:'scroll',height:'30vw',width:'16vw',flexWrap:'wrap',justifyContent:'center'}}>
      {categories.map((item) => (
        <button
          key={item.id}
          style={{
            height: '8vw',
            width: '12vw',
            border:'none',
            background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${item.imageUrl}) center/cover no-repeat`,
            borderRadius: '.5vw',
            position: 'relative',
            overflow: 'hidden',
            cursor:'pointer'
          }}
          onClick={() => {
            setSelectedCategory(item);
            filterByCategory(item.id);
          }}
        >
          <span style={{ color: 'white', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            {item.name}
          </span>
        </button>
      ))}
      </div>
      <div>
        <div style={{ gap: '2vw', display: 'flex' }}>
          <ButtonOutline onClick={() => sortBy('name')}>Сортировать по названию</ButtonOutline>
          <ButtonOutline onClick={() => sortBy('price')}>Сортировать по цене</ButtonOutline>
          <ButtonOutline onClick={() => sortBy('date')}>Сортировать по дате</ButtonOutline>
          <ButtonOutline onClick={resetFilter}>Сбросить фильтр</ButtonOutline>
        </div>
        <div style={{ margin: '1vw 0', display: 'flex', gap: '2vw',flexWrap: "wrap" }}>
          {sortedData.map((product) => (
            <CardProduct key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;

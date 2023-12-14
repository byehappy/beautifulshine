"use client"

import React, { useState, useEffect } from 'react';
import CardProduct from "@/components/productCard/Card";
import ProductData from "@/interfaces/product";
import styled from 'styled-components';

interface CatalogPageProps {
  data: ProductData[];
}

export const ButtonOutline = styled.button`
  background:none;
  padding:.5vw;
  border: .2vw solid black;
  border-radius:2vw;
  cursor: pointer;
`

const CatalogPage: React.FC<CatalogPageProps> = ({ data }) => {
  const [sortedData, setSortedData] = useState<ProductData[]>(data);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

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

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  return (
    <div>
      <div style={{gap:'2vw',display:'flex',margin:'1vw 5vw'}}>
        <ButtonOutline onClick={() => sortBy('name')}>Сортировать по названию</ButtonOutline>
        <ButtonOutline onClick={() => sortBy('price')}>Сортировать по цене</ButtonOutline>
        <ButtonOutline onClick={() => sortBy('date')}>Сортировать по дате</ButtonOutline>
      </div>
      <div style={{ margin: '2.5vw 5vw', display: 'flex', gap: '2vw' }}>
        {sortedData.map((product) => (
          <CardProduct key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;

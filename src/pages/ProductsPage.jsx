import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../components/Sidebar/Sidebar';
import ProductGrid from '../components/ProductGrid/ProductGrid';
import { products } from '../data/products';

const ProductsPage = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filters, setFilters] = useState({
    category: [],
    price: '',
    rating: 0,
  });

  useEffect(() => {
    let tempProducts = [...products];

    // Category filter
    if (filters.category.length > 0) {
      tempProducts = tempProducts.filter(p => filters.category.includes(p.category));
    }

    // Price filter
    if (filters.price) {
      // Implement price filtering logic here
    }

    // Rating filter
    if (filters.rating > 0) {
      tempProducts = tempProducts.filter(p => p.rating >= filters.rating);
    }

    setFilteredProducts(tempProducts);
  }, [filters]);

  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <Sidebar setFilters={setFilters} />
        </Col>
        <Col md={9}>
          <ProductGrid products={filteredProducts} />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductsPage;
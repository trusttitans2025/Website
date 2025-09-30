import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Categories.css';

const categories = [
  { name: 'Electronics', image: 'https://via.placeholder.com/300x200?text=Electronics' },
  { name: 'Clothing', image: 'https://via.placeholder.com/300x200?text=Clothing' },
  { name: 'Home & Kitchen', image: 'https://via.placeholder.com/300x200?text=Home+%26+Kitchen' },
  { name: 'Books & Media', image: 'https://via.placeholder.com/300x200?text=Books+%26+Media' },
  { name: 'Sports & Fitness', image: 'https://via.placeholder.com/300x200?text=Sports+%26+Fitness' },
  { name: 'Beauty & Personal Care', image: 'https://via.placeholder.com/300x200?text=Beauty' },
];

const Categories = () => {
  return (
    <div className="categories-section">
      <Container>
        <h2>Shop by Category</h2>
        <Row>
          {categories.map(category => (
            <Col key={category.name} sm={6} md={4} lg={2}>
              <Link to={`/products?category=${category.name}`}>
                <Card className="category-card">
                  <Card.Img variant="top" src={category.image} />
                  <Card.Body>
                    <Card.Title>{category.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Categories;

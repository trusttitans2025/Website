import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Categories.css';

const categories = [
  { name: 'Electronics', image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { name: 'Clothing', image: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { name: 'Home & Kitchen', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { name: 'Books & Media', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { name: 'Sports & Fitness', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { name: 'Beauty & Personal Care', image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
];

const Categories = () => {
  return (
    <div className="categories-section">
      <Container>
        <h2 className="text-center mb-4">Shop by Category</h2>
        <Row>
          {categories.map(category => (
            <Col key={category.name} sm={6} md={4} lg={2}>
              <Link to={`/products?category=${category.name}`} className="category-link">
                <Card className="category-card h-100">
                  <Card.Img variant="top" src={category.image} className="category-img" />
                  <Card.Body className="category-card-body">
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

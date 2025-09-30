import React from 'react';
import { Form } from 'react-bootstrap';
import './Sidebar.css';

const Sidebar = ({ setFilters }) => {
  const handleCategoryChange = (e) => {
    const { id, checked } = e.target;
    setFilters(prevFilters => {
      const newCategory = checked
        ? [...prevFilters.category, id]
        : prevFilters.category.filter(c => c !== id);
      return { ...prevFilters, category: newCategory };
    });
  };

  const handleRatingChange = (e) => {
    const { id, checked } = e.target;
    const rating = parseInt(id.split('-')[1]);
    setFilters(prevFilters => ({
      ...prevFilters,
      rating: checked ? rating : 0,
    }));
  };

  return (
    <div className="sidebar">
      <h4>Filters</h4>
      <hr />
      <h5>Category</h5>
      <Form>
        {['Electronics', 'Clothing', 'Home & Kitchen', 'Books & Media', 'Sports & Fitness', 'Beauty & Personal Care'].map(category => (
          <Form.Check
            key={category}
            type="checkbox"
            id={category}
            label={category}
            onChange={handleCategoryChange}
          />
        ))}
      </Form>
      <hr />
      <h5>Price Range</h5>
      <Form.Range />
      <hr />
      <h5>Rating</h5>
      <Form>
        {[5, 4, 3, 2, 1].map(rating => (
          <Form.Check
            key={rating}
            type="checkbox"
            id={`rating-${rating}`}
            label={`${rating} Stars & Up`}
            onChange={handleRatingChange}
          />
        ))}
      </Form>
    </div>
  );
};

export default Sidebar;
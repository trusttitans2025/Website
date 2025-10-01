import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header>
      <Navbar bg="light" variant="light" expand="lg" className={`header-navbar fixed-top ${scrolled ? 'scrolled' : ''}`}>
        <Container>
          <Navbar.Brand as={Link} to="/">GeminiStore</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/products">Products</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-primary">Search</Button>
            </Form>
            <Nav>
              <Nav.Link as={Link} to="/cart" className="nav-icon">
                <FaShoppingCart />
                {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
              </Nav.Link>
              {user ? (
                <NavDropdown title={`Logged in as: ${user.email}`} id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/orders">My Orders</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to="/login" className="nav-icon">
                  <FaUser />
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

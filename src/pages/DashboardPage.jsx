import React from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import './DashboardPage.css';

const DashboardPage = () => {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main St, Anytown, USA',
  };

  const orders = [
    { id: 1, date: '2023-10-29', total: 125.50, status: 'Shipped' },
    { id: 2, date: '2023-10-25', total: 75.00, status: 'Delivered' },
    { id: 3, date: '2023-10-20', total: 250.00, status: 'Delivered' },
  ];

  return (
    <div className="dashboard-page">
      <Container>
        <h2>User Dashboard</h2>
        <Row>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Account Details</Card.Title>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Address:</strong> {user.address}</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={8}>
            <Card>
              <Card.Body>
                <Card.Title>Order History</Card.Title>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.date}</td>
                        <td>${order.total.toFixed(2)}</td>
                        <td>{order.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DashboardPage;
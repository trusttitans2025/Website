import React, { useContext, useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { orders as allOrders } from '../data/orders';
import './DashboardPage.css'; // Reusing dashboard styles for now

const OrdersPage = () => {
  const { user } = useContext(AuthContext);
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    if (user) {
      const filteredOrders = allOrders.filter(order => order.userId === user.email);
      setUserOrders(filteredOrders);
    }
  }, [user]);

  return (
    <div className="dashboard-page">
      <Container>
        <h2 className="mb-4">My Orders</h2>
        {userOrders.length > 0 ? (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {userOrders.map(order => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{order.orderDate}</td>
                  <td>${order.totalAmount.toFixed(2)}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>You have no orders.</p>
        )}
      </Container>
    </div>
  );
};

export default OrdersPage;

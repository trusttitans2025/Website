import React from 'react';

const OrderList = ({ orders, onOrderClick }) => {
  return (
    <div className="order-list">
      <p>Here are your recent orders:</p>
      <ul>
        {orders.map(order => (
          <li key={order.orderId}>
            <button onClick={() => onOrderClick(order)}>
              {order.orderId}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;

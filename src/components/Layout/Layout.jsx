import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Chatbot from '../Chatbot/Chatbot';
import { AuthContext } from '../../context/AuthContext';
import './Layout.css';

const Layout = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="layout">
      <Header />
      <div className="header-spacer"></div>
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
      <Chatbot user={user} />
    </div>
  );
};

export default Layout;

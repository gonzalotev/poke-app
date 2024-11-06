import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Navbar } from '@/components';
import AppRouter from '@/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Navbar />
      <AppRouter />
      <ToastContainer />
    </Router>
  );
}

export default App;

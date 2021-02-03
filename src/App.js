import React, { useEffect } from 'react';
import instance from './utils/axios';
import './App.css';
import AdminLayout from './layouts/AdminLayout';

function App() {
  useEffect(() => {
    instance.get('/api/support')
      .then(result => {
        console.log(result);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <AdminLayout />
  );
}

export default App;
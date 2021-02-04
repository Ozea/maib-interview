import React, { useEffect } from 'react';
import instance from './utils/axios';
import AdminLayout from './layouts/AdminLayout';
import './App.css';

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
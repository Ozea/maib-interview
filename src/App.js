import React, { useEffect } from 'react';
import instance from './utils/axios';
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
    <div className="App">
      Hello MAIB Interview project
    </div>
  );
}

export default App;

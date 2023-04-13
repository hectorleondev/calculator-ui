import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import {Home} from './pages/home'
import {Login} from './pages/login'
function App() {
  return (
      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route
              path="*"
              element={
                  <div>
                      <h2>404 Page not found</h2>
                  </div>
              }
          />
      </Routes>
  );
}

export default App;

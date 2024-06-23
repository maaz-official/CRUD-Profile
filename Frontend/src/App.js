import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import CreateUser from './pages/CreateUser';
import UpdateUser from './pages/Update';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create-user' element={<CreateUser />} />
        <Route path='/update-user/:id' element={<UpdateUser />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}

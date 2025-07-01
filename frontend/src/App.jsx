import Navbar from './components/navbar'
import './App.css'
import Main from './pages/home/main'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Fisherdex from './pages/fisherdex/fisherdex'
import Login from './pages/Login/login'
import { ProtectedRoute } from './components/ProtectedRoute'
import User from './pages/user/user'
import { useEffect, useState } from 'react'

function App() {

  const[isAuthenticated, setIsAuthenticated] = useState(false);


  //controllo se loggato

  useEffect(()=>{
    const token=localStorage.getItem('token');
    setIsAuthenticated(!!token);
  },[])

  return (
    
        <Router>
          <Navbar />
          <Routes>
          <Route path='/login' element={<Login />} />

            <Route path='/' element={<ProtectedRoute isAuthenticated={isAuthenticated}><Main /></ProtectedRoute>} />
            <Route path='/fisherdex' element={<ProtectedRoute isAuthenticated={isAuthenticated}><Fisherdex /></ProtectedRoute>} />
            <Route path='/user' element={<ProtectedRoute isAuthenticated={isAuthenticated}><User /></ProtectedRoute>} />
            
          </Routes>
        </Router>
  
  )
}

export default App

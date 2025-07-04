import Navbar from './components/navbar'
import './App.css'
import Main from './pages/home/main'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Fisherdex from './pages/fisherdex/fisherdex'
import Login from './pages/Login/login'
import { ProtectedRoute } from './components/ProtectedRoute'
import User from './pages/user/user'
import { useEffect, useState } from 'react'
import Register from './pages/register/register'

function App() {

  const[isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);


  //controllo se loggato

  useEffect(()=>{
    const token=localStorage.getItem('token');
    setIsAuthenticated(!!token);
    setCheckingAuth(false);
  },[])

  //Finché checkingAuth è true, il componente App non renderizza le rotte e non fa redirect, ma mostra solo un placeholder (ad esempio: "Caricamento..." o uno spinner).

  /*React aspetta di sapere se l’utente è autenticato o no prima di decidere quale pagina mostrare.
Solo dopo aver controllato il token (quindi quando checkingAuth diventa false) viene renderizzato il router e le rotte, che leggono lo stato di autenticazione vero e definitivo.*/

  if (checkingAuth) {
    return <div>Caricamento...</div>; // o uno spinner se vuoi
  }

  return (
    
        <Router>
          <Navbar />
          <Routes>
          <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
          <Route path='/register' element={<Register />} />
            <Route path='/' element={<ProtectedRoute isAuthenticated={isAuthenticated}><Main /></ProtectedRoute>} />
            <Route path='/fisherdex' element={<ProtectedRoute isAuthenticated={isAuthenticated}><Fisherdex /></ProtectedRoute>} />
            <Route path='/user' element={<ProtectedRoute isAuthenticated={isAuthenticated}><User setIsAuthenticated={setIsAuthenticated}/></ProtectedRoute>} />
            
          </Routes>
        </Router>
  
  )
}

export default App

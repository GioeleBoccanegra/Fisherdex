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
import { jwtDecode } from 'jwt-decode'
import { PublicRoute } from './components/publicRoute'

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);


  //controllo se loggato

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuthenticated(false);
      setCheckingAuth(false);
      return;
    }



    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000; // in secondi

      if (decoded.exp < now) {
        // Token scaduto
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    } catch (e) {
      // Token malformato o errore decodifica
      localStorage.removeItem("token");
      console.log(e);
      setIsAuthenticated(false);
    }

    setCheckingAuth(false);
  }, []);

  //Finché checkingAuth è true, il componente App non renderizza le rotte e non fa redirect, ma mostra solo un placeholder (ad esempio: "Caricamento..." o uno spinner).

  /*React aspetta di sapere se l’utente è autenticato o no prima di decidere quale pagina mostrare.
Solo dopo aver controllato il token (quindi quando checkingAuth diventa false) viene renderizzato il router e le rotte, che leggono lo stato di autenticazione vero e definitivo.*/

  if (checkingAuth) {
    return <div>Caricamento...</div>; // o uno spinner se vuoi
  }

  return (

    <Router>
      <Navbar setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path='/login' element={<PublicRoute isAuthenticated={isAuthenticated}> <Login setIsAuthenticated={setIsAuthenticated} /></PublicRoute>} />
        <Route
          path="/register"
          element={
            <PublicRoute isAuthenticated={isAuthenticated}>
              <Register />
            </PublicRoute>
          }
        />
        <Route path='/' element={<ProtectedRoute isAuthenticated={isAuthenticated}><Main setIsAuthenticated={setIsAuthenticated} /></ProtectedRoute>} />
        <Route path='/fisherdex' element={<ProtectedRoute isAuthenticated={isAuthenticated}><Fisherdex setIsAuthenticated={setIsAuthenticated} /></ProtectedRoute>} />
        <Route path='/user' element={<ProtectedRoute isAuthenticated={isAuthenticated}><User setIsAuthenticated={setIsAuthenticated} /></ProtectedRoute>} />

      </Routes>
    </Router>

  )
}

export default App

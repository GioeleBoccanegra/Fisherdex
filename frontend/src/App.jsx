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
import { PublicRoute } from './components/PublicRoute'
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./features/authSlice"

function App() {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const dispatch = useDispatch();


  //controllo se loggato

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      dispatch(logout());
      setCheckingAuth(false);
      return;
    }



    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000; // in secondi

      if (decoded.exp < now) {
        // Token scaduto
        localStorage.removeItem("token");
        dispatch(logout());
      } else {
        dispatch(login());
      }
    } catch (e) {
      // Token malformato o errore decodifica
      localStorage.removeItem("token");
      console.log(e);
      dispatch(logout());
    }

    setCheckingAuth(false);
  }, [dispatch]);

  //Finché checkingAuth è true, il componente App non renderizza le rotte e non fa redirect, ma mostra solo un placeholder (ad esempio: "Caricamento..." o uno spinner).

  /*React aspetta di sapere se l’utente è autenticato o no prima di decidere quale pagina mostrare.
Solo dopo aver controllato il token (quindi quando checkingAuth diventa false) viene renderizzato il router e le rotte, che leggono lo stato di autenticazione vero e definitivo.*/

  if (checkingAuth) {
    return <div>Caricamento...</div>; // o uno spinner se vuoi
  }

  return (

    <Router>
      <Navbar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path='/login' element={<PublicRoute isAuthenticated={isAuthenticated}> <Login /></PublicRoute>} />
        <Route
          path="/register"
          element={
            <PublicRoute isAuthenticated={isAuthenticated}>
              <Register />
            </PublicRoute>
          }
        />
        <Route path='/' element={<ProtectedRoute isAuthenticated={isAuthenticated}><Main /></ProtectedRoute>} />
        <Route path='/fisherdex' element={<ProtectedRoute isAuthenticated={isAuthenticated}><Fisherdex /></ProtectedRoute>} />
        <Route path='/user' element={<ProtectedRoute isAuthenticated={isAuthenticated}><User /></ProtectedRoute>} />

      </Routes>
    </Router>

  )
}

export default App

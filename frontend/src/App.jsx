import Navbar from './components/navbar'
import './App.css'
import Main from './pages/home/main'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Fisherdex from './pages/fisherdex/fisherdex'
import Mappa from './pages/map/map'
import User from './pages/user/user'

function App() {

  return (
    
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/fisherdex' element={<Fisherdex />} />
            <Route path='/user' element={<User />} />
          </Routes>
        </Router>
  
  )
}

export default App

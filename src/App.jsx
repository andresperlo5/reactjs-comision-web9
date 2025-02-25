import { BrowserRouter as Router, Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage'
import Footer from './components/Footer/Footer'
import NavbarC from './components/navbar/NavbarC'
import PageError from './pages/PageError'
import DetalleProducto from './pages/DetalleProducto'


const App = () => {
  return (
    <>
      <Router>
        <NavbarC />
        <Routes>
          <Route path='/detalle-producto/:id' element={<DetalleProducto />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/' element={<HomePage />} />
          <Route path='*' element={<PageError />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App

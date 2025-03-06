import { BrowserRouter as Router, Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage'
import Footer from './components/Footer/Footer'
import NavbarC from './components/navbar/NavbarC'
import PageError from './pages/PageError'
import DetalleProducto from './pages/DetalleProducto'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import UserPage from './pages/UserPage'
import AdminPage from './pages/AdminPage'
import CartPage from './pages/CartPage'
import FavPage from './pages/FavPage'
import GaleryPage from './pages/GaleryPage'
import AdminProductsPage from './pages/AdminProductsPage'
import AdminUsersPage from './pages/AdminUsersPage'


const App = () => {
  return (
    <>
      <Router>
        <NavbarC />
        <Routes>
          <Route path='/detalle-producto/:id' element={<DetalleProducto />} />
          <Route path='/user/cart' element={<CartPage />} />
          <Route path='/user/favs' element={<FavPage />} />
          <Route path='/user/galery' element={<GaleryPage />} />
          <Route path='/user' element={<UserPage />} />
          <Route path='/admin/users' element={<AdminProductsPage />} />
          <Route path='/admin/products' element={<AdminUsersPage />} />
          <Route path='/admin' element={<AdminPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
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

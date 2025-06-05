import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import Footer from "./components/Footer/Footer";
import NavbarC from "./components/navbar/NavbarC";
import PageError from "./pages/PageError";
import DetalleProducto from "./pages/DetalleProducto";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";
import CartPage from "./pages/CartPage";
import FavPage from "./pages/FavPage";
import GaleryPage from "./pages/GaleryPage";
import AdminProductsPage from "./pages/AdminProductsPage";
import AdminUsersPage from "./pages/AdminUsersPage";
import { CrearProducto } from "./pages/products/CrearProducto";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import AboutUsPage from "./pages/AboutUsPage";
import RecoveryPassPage from "./pages/RecoveryPassPage";

const App = () => {
  return (
    <>
      <Router>
        <NavbarC />
        <Routes>
          <Route path="/detalle-producto/:id" element={<DetalleProducto />} />
          <Route path="/user/cart" element={
            <PrivateRoute rol='usuario'>
              <CartPage />
            </PrivateRoute>
          } />
          <Route path="/user/favs" element={
            <PrivateRoute rol='usuario'>
              <FavPage />
            </PrivateRoute>
          } />
          <Route path="/user/galery" element={
            <PrivateRoute rol='usuario'>
              <GaleryPage />
            </PrivateRoute>
          } />
          <Route path="/user" element={
            <PrivateRoute rol='usuario'>
              <UserPage />
            </PrivateRoute>
          } />
          <Route path="/admin/users" element={
            <PrivateRoute rol='admin'>
              <AdminUsersPage />
            </PrivateRoute>
          } />
          <Route path="/admin/products" element={
            <PrivateRoute rol='admin'>
              <AdminProductsPage />
            </PrivateRoute>
          } />
          <Route path="/admin/crearProducto" element={
            <PrivateRoute rol='admin'>
              <CrearProducto />
            </PrivateRoute>
          } />
          <Route path="/admin" element={
            <PrivateRoute rol='admin'>
              <AdminPage />
            </PrivateRoute>
          } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/recoveryPass" element={<RecoveryPassPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/aboutUs" element={<AboutUsPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<PageError />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;

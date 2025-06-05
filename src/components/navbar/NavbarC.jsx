import './NavbarC.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router'

const NavbarC = () => {
  const navigate = useNavigate()
  const token = JSON.parse(sessionStorage.getItem('token')) || null
  const rolUsuario = JSON.parse(sessionStorage.getItem('rol')) || null

  const handleLogoutUser = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('rol')

    setTimeout(() => {
      navigate('/')
    }, 500)

  }
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <NavLink className={'nav-link'} to={token ? '/user' : '/'}>
            <img src="https://images.vexels.com/media/users/3/142789/isolated/preview/2bfb04ad814c4995f0c537c68db5cd0b-multicolor-swirls-circle-logo.png" alt="" width='150' />
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {
              token && rolUsuario === 'usuario' ?
                <Nav className="ms-auto">
                  <NavLink className={'nav-link'} to="/user">Inicio</NavLink>
                  <NavLink className={'nav-link'} to="/user/galery">Galeria</NavLink>
                  <NavLink className={'nav-link'} to="/user/cart">Carrito</NavLink>
                  <NavLink className={'nav-link'} to="/user/favs">Favoritos</NavLink>
                </Nav>
                :
                token && rolUsuario === 'admin' ?
                  <Nav className="ms-auto">
                    <NavLink className={'nav-link'} to="/admin">Inicio</NavLink>
                    <NavLink className={'nav-link'} to="/admin/users">Panel Usuario</NavLink>
                    <NavLink className={'nav-link'} to="/admin/products">Panel Productos</NavLink>
                    <NavLink className={'nav-link'} to="/user">Vista Usuario</NavLink>
                  </Nav>
                  :
                  <Nav className="ms-auto">
                    <NavLink className={'nav-link'} to="/">Inicio</NavLink>
                    <NavLink className={'nav-link'} to="/aboutUs">Sobre Nosotros</NavLink>
                    <NavLink className={'nav-link'} to="/contact">Contacto</NavLink>
                  </Nav>
            }
            {
              token ?
                <Nav className="ms-auto">
                  <NavLink className={'nav-link'} to="#" onClick={handleLogoutUser}>Cerrar Sesion</NavLink>
                </Nav>
                :
                <Nav className="ms-auto">
                  <NavLink className={'nav-link'} to="/login">Iniciar Sesion</NavLink>
                  <NavLink className={'nav-link'} to="/register">Registrarse</NavLink>
                </Nav>
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavbarC

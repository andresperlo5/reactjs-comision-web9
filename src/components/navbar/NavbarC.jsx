import './NavbarC.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router'

const NavbarC = () => {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <NavLink className={'nav-link'} to="/">
            <img src="https://images.vexels.com/media/users/3/142789/isolated/preview/2bfb04ad814c4995f0c537c68db5cd0b-multicolor-swirls-circle-logo.png" alt="" width='150' />
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavLink className={'nav-link'} to="/">Inicio</NavLink>
              <NavLink className={'nav-link'} to="#link">Sobre Nosotros</NavLink>
              <NavLink className={'nav-link'} to="/contact">Contacto</NavLink>
            </Nav>
            <Nav className="ms-auto">
              <NavLink className={'nav-link'} to="#home">Iniciar Sesion</NavLink>
              <NavLink className={'nav-link'} to="#link">Registrarse</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavbarC

import { useNavigate } from "react-router"


const PrivateRoute = ({ children, rol }) => {
  const navigate = useNavigate()
  const usuarioLogeado = JSON.parse(sessionStorage.getItem('usuarioLogueado')) || null

  if (!usuarioLogeado) {
    setTimeout(() => {
      navigate('/')
    }, 100);
  } else {
    if (rol === usuarioLogeado.rol) {
      return children
    } else {
      if (usuarioLogeado.rol === 'usuario') {
        setTimeout(() => {
          navigate('/user')
        }, 100)
      } else {
        return children
      }
    }
  }

}

export default PrivateRoute

import { useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import clientAxios from '../../helpers/axios.helpers';

const FormC = ({ idPage }) => {
  const navigate = useNavigate()
  const [formulario, setFormulario] = useState({
    nombreUsuario: '',
    email: '',
    contrasenia: '',
    repContrasenia: '',
    checkForm: false
  })

  const [errores, setErrores] = useState({})

  const handleChangeRegisterForm = (ev) => {
    const value = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value
    setFormulario({ ...formulario, [ev.target.name]: value })
  }

  const handleClickRegisterForm = async (ev) => {
    ev.preventDefault()
    const usuarioLs = JSON.parse(localStorage.getItem('usuarios')) || []

    let nuevosErrores = {}
    if (!formulario.nombreUsuario) {
      nuevosErrores.nombreUsuario = 'El campo usuario esta vacio'
    }

    if (!formulario.email) {
      nuevosErrores.email = 'El campo email esta vacio'
    }

    setErrores(nuevosErrores)

    if (formulario.nombreUsuario && formulario.email && formulario.contrasenia && formulario.repContrasenia && formulario.checkForm) {
      if (formulario.contrasenia === formulario.repContrasenia) {
        const usuario = await clientAxios.post("/usuarios/register", {
          nombreUsuario: formulario.nombreUsuario,
          emailUsuario: formulario.email,
          contrasenia: formulario.contrasenia
        },
          {
            "Content-Type": "application/json"
          }

        )
        if (res.statusCode === 201) {
          Swal.fire({
            title: "Gracias por tu registro!",
            text: `${res.msg}`,
            icon: "success"
          });
        }


        setFormulario({
          nombreUsuario: '',
          email: '',
          contrasenia: '',
          repContrasenia: '',
          checkForm: false
        })
      } else {
        alert('Las contraseñas no son iguales')
      }
    }


  }

  const handleChangeLoginForm = async (ev) => {
    ev.preventDefault()
    /*    const usuarioLs = JSON.parse(localStorage.getItem('usuarios')) || []
       const usuarioExiste = usuarioLs.find((usuario) => usuario.nombreUsuario === formulario.nombreUsuario)
    */


    let nuevosErrores = {}
    if (!formulario.nombreUsuario) {
      nuevosErrores.nombreUsuario = 'El campo usuario esta vacio'
    }

    if (!formulario.contrasenia) {
      nuevosErrores.contrasenia = 'El campo contraseña esta vacio'
    }

    setErrores(nuevosErrores)

    if (formulario.nombreUsuario && formulario.contrasenia) {
      const res = await clientAxios.post("/usuarios/login", {
        nombreUsuario: formulario.nombreUsuario,
        contrasenia: formulario.contrasenia
      })

      if (res.status === 200) {
        sessionStorage.setItem("token", JSON.stringify(res.data.token))
        sessionStorage.setItem("rol", JSON.stringify(res.data.rolUsuario))

        if (res.data.rolUsuario === "usuario") {
          setTimeout(() => {
            navigate("/user")
          }, 1000);
        } else {
          setTimeout(() => {
            navigate("/admin")
          }, 1000);
        }
      }

    }


    /*     if (usuarioExiste.contrasenia === formulario.contrasenia) {
          usuarioExiste.login = true
          localStorage.setItem('usuarios', JSON.stringify(usuarioLs))
          sessionStorage.setItem('usuarioLogueado', JSON.stringify(usuarioExiste))
          if (usuarioExiste.rol === 'usuario') {
            setTimeout(() => {
              navigate('/user')
            }, 1000);
          } else {
            setTimeout(() => {
              navigate('/admin')
            }, 1000);
          }
        } else {
          alert('El usuario y/o contraseña no son correctos. CONTRASEÑA')
        } */


  }



  return (
    <>
      <Container className='d-flex justify-content-center my-5'>
        <Form>
          {/*   <Form.Group className="mb-3" controlId="formBasicEmail1">
            <Form.Label>Nombre de Usuario</Form.Label>
            <Form.Control type="text" placeholder="Enter email" value={nombreUsuario} onChange={(ev) => setNombreUsuario(ev.target.value)} />
          </Form.Group> */}

          <Form.Group className="mb-3" controlId="formBasicEmail1">
            <Form.Label>Nombre de Usuario</Form.Label>
            <Form.Control type="text" placeholder="Enter email" name='nombreUsuario' value={formulario.nombreUsuario} onChange={handleChangeRegisterForm} isInvalid={errores.nombreUsuario} />
            {
              errores.nombreUsuario &&
              <p className='text-danger'>{errores.nombreUsuario}</p>
            }
          </Form.Group>

          {
            idPage === 'register' &&
            <Form.Group className="mb-3" controlId="formBasicEmail2">
              <Form.Label>Email del Usuario</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name='email' value={formulario.email} onChange={handleChangeRegisterForm} isInvalid={errores.email} />
              {
                errores.email &&
                <p className='text-danger'>{errores.email}</p>
              }
            </Form.Group>
          }

          <Form.Group className="mb-3" controlId="formBasicPassword1">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Password" name='contrasenia' value={formulario.contrasenia} onChange={handleChangeRegisterForm} />
          </Form.Group>
          {
            idPage === 'register' &&
            <>
              <Form.Group className="mb-3" controlId="formBasicPassword2">
                <Form.Label>Repetir Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Password" name='repContrasenia' value={formulario.repContrasenia} onChange={handleChangeRegisterForm} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox1">
                <Form.Check type="checkbox" label="Check me out" name='checkForm' value={formulario.checkForm} onChange={handleChangeRegisterForm} />
              </Form.Group>
            </>
          }
          <p>Si olvidaste tu contraseña. <Link to={"/recoveryPass"}>Haz click aqui</Link></p>
          <Container className="text-center">
            <Button className='py-3 px-5' variant="primary" type="submit" onClick={idPage === 'register' ? handleClickRegisterForm : handleChangeLoginForm}>
              {idPage === 'register' ? 'Enviar Datos' : 'Ingresar'}
            </Button>
          </Container>
        </Form>
      </Container>
    </>
  )
}

export default FormC

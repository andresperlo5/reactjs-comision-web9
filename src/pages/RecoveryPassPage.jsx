import { useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import clientAxios, { configHeaders } from '../helpers/axios.helpers';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const RecoveryPassPage = () => {
  const navigate = useNavigate()
  const token = new URLSearchParams(location.search).get("token")


  const [emailUsuario, setEmailUsuario] = useState("")
  const [nuevaContrasenia, setNuevaCotrasenia] = useState("")
  const [repContrasenia, setRepContrasenia] = useState("")

  const handleClickEmail = async (ev) => {
    ev.preventDefault()

    const res = await clientAxios.post("/servicios/recoveryPass", { emailUsuario }, configHeaders)


    if (res.status === 200) {
      Swal.fire({
        title: "Revisa tu correo por favor!!!",
        text: `En el correo te hemos enviado los pasos a seguir para recuperar tu contraseña`,
        icon: "success"
      });
    }
  }


  const handleClickRecoveryPass = async (ev) => {
    ev.preventDefault()
    if (nuevaContrasenia === repContrasenia) {
      const res = await clientAxios.put("/servicios/changePassUser", { nuevaContrasenia }, {
        headers: {
          "Content-Type": "application/json",
          "auth": `${token}`
        }
      })


      if (res.status === 200) {
        Swal.fire({
          title: "Se actualizo tu contraseña. Inicia sesion para corroborar",
          icon: "success"
        });
      }

      setNuevaCotrasenia("")
      setRepContrasenia("")

      setTimeout(() => {
        navigate("/login")
      }, 1000);


    } else {
      Swal.fire({
        title: "Las contraseñas no son iguales",
        icon: "error"
      });
    }
  }


  return (
    <Container className='d-flex justify-content-center my-5'>
      {
        token ?
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nueva Contraseña</Form.Label>
              <Form.Control type="text" placeholder="Por ej: usuario@dominio.com" required onChange={(ev) => setNuevaCotrasenia(ev.target.value)} />
              {/*     <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Repetir Contraseña</Form.Label>
              <Form.Control type="text" placeholder="Por ej: usuario@dominio.com" required onChange={(ev) => setRepContrasenia(ev.target.value)} />
              {/*     <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
            </Form.Group>
            <Container className='text-center'>
              <Button variant="primary" type="submit" className='py-3 px-5' onClick={handleClickRecoveryPass}>
                Enviar Datos
              </Button>
            </Container>
          </Form>
          :
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email del Usuario</Form.Label>
              <Form.Control type="email" placeholder="Por ej: usuario@dominio.com" required onChange={(ev) => setEmailUsuario(ev.target.value)} />
              {/*     <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
            </Form.Group>
            <Container className='text-center'>
              <Button variant="primary" type="submit" className='py-3 px-5' onClick={handleClickEmail}>
                Enviar Email
              </Button>
            </Container>
          </Form>
      }

    </Container>
  )
}

export default RecoveryPassPage
import { useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router"
import Swal from 'sweetalert2'
import { useApiFakeStore } from "../helpers/useApi"
import clientAxios, { configHeaders } from "../helpers/axios.helpers"

const DetalleProducto = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [producto, setProducto] = useState([])

  const obtenerProducto = async () => {

    try {
      const res = await clientAxios.get(`/productos/${id}`)

      setProducto(res.data.producto)
    } catch (error) {
      (error)
    }
  }

  const agregarProductoCarrito = async (idProducto) => {
    try {
      const usuarioLogueado = JSON.parse(sessionStorage.getItem('token')) || null

      if (!usuarioLogueado) {
        Swal.fire({
          icon: "info",
          title: "Debes iniciar sesion para poder comprar",
        });

        navigate('/login')

        return
      }

      const res = await clientAxios.put(`/carritos/agregarProducto/${idProducto}`, {}, configHeaders)


      if (res.status === 200) {
        Swal.fire({
          title: `${res.data.msg}`,
          icon: "success"
        });
      }
    } catch (error) {

      if (error.status === 400) {
        Swal.fire({
          title: `${error.response.data.msg}`,
          icon: "error"
        });
      }

    }

  }

  const handleClickPay = () => {
    const usuarioLogueado = JSON.parse(sessionStorage.getItem('token'))

    if (!usuarioLogueado) {
      Swal.fire({
        icon: "info",
        title: "Debes iniciar sesion para poder comprar",
      });

      navigate('/login')

      return
    }
    Swal.fire({
      title: "Gracias por tu compra!",
      icon: "success"
    });
  }

  useEffect(() => {
    obtenerProducto()
  }, [])



  return (
    <>
      <Container>
        <Row className="mt-5">
          <Col sm='12' md='6'>
            <img src={producto.imagen?.includes("public") ? `http://localhost:3001/${producto.imagen}` : producto.imagen} alt="" width={'250'} />
          </Col>
          <Col sm='12' md='6'>
            <h3>{producto.nombre}</h3>
            <p>${producto.precio}</p>
            <p>{producto.descripcion}</p>
            <Button className="mx-3" variant="success" onClick={() => agregarProductoCarrito(producto._id)}>Agregar Carrito</Button>
            <Button onClick={handleClickPay}>Comprar</Button>
          </Col>
        </Row>
      </Container>

    </>
  )
}

export default DetalleProducto

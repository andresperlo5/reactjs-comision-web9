import { useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router"
import Swal from 'sweetalert2'
import { useApiFakeStore } from "../helpers/useApi"
import clientAxios from "../helpers/axios.helpers"

const DetalleProducto = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [producto, setProducto] = useState([])

  const obtenerProducto = async () => {
    // const productosLs = JSON.parse(localStorage.getItem('productos')) || []

    try {
      const res = await clientAxios.get(`/productos/${id}`)

      console.log(res)
      setProducto(res.data.producto)
      /*   
            if (!productosLs.length) {
              const res = await useApiFakeStore(id)
              setProducto(res)
               const producto = await fetch(`https://fakestoreapi.com/products/${id}`)
               const data = await producto.json()
               setProducto(data)
            } else {
              const productoFiltrado = productosLs.find((prod) => prod.id === Number(id))
              setProducto(productoFiltrado)
            }
       */

    } catch (error) {
      console.log(error)
    }
  }

  const agregarProductoCarrito = () => {
    const usuarioLogueado = JSON.parse(sessionStorage.getItem('token')) || null
    const carritoLs = JSON.parse(localStorage.getItem('carrito')) || []
    const productoExiste = carritoLs.find((prod) => prod.id === producto.id)

    if (!usuarioLogueado) {
      Swal.fire({
        icon: "info",
        title: "Debes iniciar sesion para poder comprar",
      });

      navigate('/login')

      return
    }

    if (productoExiste) {
      Swal.fire({
        icon: "error",
        title: "Este producto ya esta cargado en el carrito!",
        text: "Puedes modificar la cantidad dentro del menu del carrito"
      });
      return
    }


    carritoLs.push(producto)
    Swal.fire({
      title: "Producto cargado con exito en el carrito!",
      icon: "success"
    });
    localStorage.setItem('carrito', JSON.stringify(carritoLs))


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
            <img src={producto.imagen} alt="" width={'250'} />
          </Col>
          <Col sm='12' md='6'>
            <h3>{producto.nombre}</h3>
            <p>${producto.precio}</p>
            <p>{producto.descripcion}</p>
            <Button className="mx-3" variant="success" onClick={agregarProductoCarrito}>Agregar Carrito</Button>
            <Button onClick={handleClickPay}>Comprar</Button>
          </Col>
        </Row>
      </Container>

    </>
  )
}

export default DetalleProducto

import { useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { useParams } from "react-router"


const DetalleProducto = () => {
  const { id } = useParams()
  const [producto, setProducto] = useState([])

  const obtenerProducto = async () => {
    try {
      const producto = await fetch(`https://fakestoreapi.com/products/${id}`)
      const data = await producto.json()
      setProducto(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    obtenerProducto()
  }, [])



  return (
    <>
      <Container>
        <Row className="mt-5">
          <Col sm='12' md='6'>
            <img src={producto.image} alt="" width={'250'} />
          </Col>
          <Col sm='12' md='6'>
            <h3>{producto.title}</h3>
            <p>${producto.price}</p>
            <p>{producto.description}</p>
            <Button className="mx-3" variant="success">Agregar Carrito</Button>
            <Button>Comprar</Button>
          </Col>
        </Row>
      </Container>

    </>
  )
}

export default DetalleProducto

import { Col, Container, Row } from 'react-bootstrap'
import CarouselC from '../components/carousel/CarouselC'
import CardC from '../components/card/CardC'
import { useEffect, useState } from 'react'
import { useApiFakeStore } from '../helpers/useApi'
import { useChangeTitle } from '../helpers/useChangeNameTitle'
import axios from 'axios'
import clientAxios from '../helpers/axios.helpers'
//import { use = hook = funcion nativa de react } from 'react'

const HomePage = () => {
  useChangeTitle('home')
  const [productos, setProductos] = useState([])

  const obtenerProductos = async () => {
    try {
      const productos = await clientAxios.get("/productos")
      console.log(productos.data)
      setProductos(productos.data.productos)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    obtenerProductos()
  }, [])


  return (
    <>
      <CarouselC />
      <Container>
        <Row>
          {
            productos.map((producto) =>
              <Col key={producto._id} sm='12' md='6' lg='4'>
                <CardC idProd={producto._id} urlImagen={producto.imagen} titulo={producto.nombre} descripcion={producto.descripcion} precio={producto.precio} />
              </Col>
            )
          }
        </Row>
      </Container>
    </>
  )
}

export default HomePage

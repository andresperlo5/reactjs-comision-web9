import { Col, Container, Row } from 'react-bootstrap'
import CarouselC from '../components/carousel/CarouselC'
import CardC from '../components/card/CardC'
import { useEffect, useState } from 'react'
import { useApiFakeStore } from '../helpers/useApi'
import { useChangeTitle } from '../helpers/useChangeNameTitle'
//import { use = hook = funcion nativa de react } from 'react'

const HomePage = () => {
  useChangeTitle('home')
  const [productos, setProductos] = useState([])

  /*   const [usuarios, setUsuarios] = useState({})
    const [roles, setRoles] = useState(0)
    const [formulario, setFormulario] = useState(false)
    const [nombre, setNombre] = useState('') */

  const obtenerProductos = async () => {
    try {
      const productosLs = JSON.parse(localStorage.getItem('productos')) || []


      if (!productosLs.length) {
        const res = await useApiFakeStore()
        console.log(res)
        setProductos(res)
        /*   const productos = await fetch('https://fakestoreapi.com/products')
          const data = await productos.json()
          setProductos(data) */
        localStorage.setItem("productos", JSON.stringify(res))
      } else {
        console.log('2')
        setProductos(productosLs)
      }


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
              <Col key={producto.id} sm='12' md='6' lg='4'>
                <CardC idProd={producto.id} urlImagen={producto.image} titulo={producto.title} descripcion={producto.description} />
              </Col>
            )
          }
        </Row>
      </Container>
    </>
  )
}

export default HomePage

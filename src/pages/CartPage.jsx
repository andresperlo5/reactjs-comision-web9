import { Container } from "react-bootstrap"
import TableC from "../components/table/TableC"
import { useEffect, useState } from "react"
import clientAxios, { configHeaders } from "../helpers/axios.helpers"

//Averiguar como podrian identificar y relacionar al usuario, el carrito y los productos
//Averiguar como van a lograr que la cantidad de un producto solo sea modificado en ese producto
const CartPage = () => {
  const [productos, setProductos] = useState([])

  const obtenerProductoDelCarrito = async () => {
    const res = await clientAxios.get("/carritos", configHeaders)

    setProductos(res.data.productos)
  }

  useEffect(() => {
    obtenerProductoDelCarrito()
  }, [])

  return (
    <>
      <Container className="my-5">
        <TableC idPage='productos' array={productos} obtenerProductoDelCarrito={obtenerProductoDelCarrito} />
      </Container>
    </>
  )
}

export default CartPage

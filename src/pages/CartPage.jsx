import { Container } from "react-bootstrap"
import TableC from "../components/table/TableC"

//Averiguar como podrian identificar y relacionar al usuario, el carrito y los productos
//Averiguar como van a lograr que la cantidad de un producto solo sea modificado en ese producto
const CartPage = () => {

  return (
    <>
      <Container className="my-5">
        <TableC idPage='userCart' />
      </Container>
    </>
  )
}

export default CartPage

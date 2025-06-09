import { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Swal from 'sweetalert2';
import clientAxios, { configHeaders } from '../../helpers/axios.helpers';
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react"

const TableC = ({ idPage, array, obtenerProductoDelCarrito }) => {
  const [cantidad, setCantidad] = useState(1)
  const [idPrefenrecia, setIdPreferencia] = useState("")

  const handleChangeQuantity = (ev) => {
    setCantidad(ev.target.value <= 0 ? 1 : ev.target.value)
  }

  const borrarProducto = (idProducto) => {
    Swal.fire({
      title: "Estas seguro de que quieres eliminar a este producto?",
      text: "Si te arrepientes despues puedes cargarlo nuevamente!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "SI, estoy seguro!"
    }).then(async (result) => {

      try {
        if (result.isConfirmed) {
          const res = await clientAxios.put(`/carritos/eliminarUnProducto/${idProducto}`, {}, configHeaders)
          if (res.status === 200) {
            Swal.fire({
              title: "Producto eliminado del carrito!",
              text: "Tu producto fue eliminado con exito",
              icon: "success"
            });
          }
          obtenerProductoDelCarrito()
        }
      } catch (error) {
        console.log(error)
      }

    });
  }

  const pagarCarritoMp = async () => {
    initMercadoPago(`${import.meta.env.VITE_MP_PUBLIC_KEY}`)
    try {
      const res = await clientAxios.post("/servicios/pagoMercadoPago", {}, configHeaders)
      //location.href = `${res.data.responseMp}`
      setIdPreferencia(res.data.responseMp)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {
        array?.length && idPage === "productos"
          ?
          <>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {
                  array.map((producto, i) =>
                    <tr key={producto._id}>
                      <td>{i + 1}</td>
                      <td>{producto.nombre}</td>
                      <td>{producto.precio}</td>
                      <td>
                        <input type="number" className='w-50' value={cantidad} onChange={handleChangeQuantity} />
                      </td>
                      <td>
                        <p>{(cantidad * producto.precio).toFixed(2)}</p>
                      </td>
                      <td>
                        <Button variant='danger' onClick={() => borrarProducto(producto._id)}>Eliminar</Button>
                      </td>
                    </tr>

                  )
                }

              </tbody>
            </Table>
            <Container className='text-center my-5'>
              <Button onClick={pagarCarritoMp}>Pagar con MP</Button>
              {
                idPrefenrecia &&
                <Container className='w-25'>
                  <Wallet initialization={{ preferenceId: idPrefenrecia, redirectMode: "modal" }} />
                </Container>
              }
            </Container>
          </>
          :
          array?.length && idPage === "adminUsers"
            ?
            <>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    array.map((usuario, i) =>
                      <tr key={usuario._id}>
                        <td>{i + 1}</td>
                        <td>{usuario.nombreUsuario}</td>
                        <td>{usuario.emailUsuario}</td>
                        <td>{usuario.rol}</td>
                        <td>
                          {
                            usuario.rol === "usuario" &&
                            <Button variant='danger' onClick={() => borrarProducto(usuario._id)}>Eliminar</Button>
                          }
                        </td>
                      </tr>

                    )
                  }

                </tbody>
              </Table>
              <Container className='text-center my-5'>
                <Button onClick={pagarCarritoMp}>Pagar con MP</Button>
                {
                  idPrefenrecia &&
                  <Container className='w-25'>
                    <Wallet initialization={{ preferenceId: idPrefenrecia, redirectMode: "modal" }} />
                  </Container>
                }
              </Container>
            </>
            :
            <h2 className='text-center my-5'>No hay productos cargados todavia en el carrito</h2>
      }
    </>
  )
}

export default TableC

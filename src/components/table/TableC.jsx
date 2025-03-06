import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Swal from 'sweetalert2';

const TableC = ({ idPage, array }) => {
  const [cantidad, setCantidad] = useState(1)
  const [carrito, setCarrito] = useState([])

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
    }).then((result) => {
      if (result.isConfirmed) {
        const carritoLs = JSON.parse(localStorage.getItem('carrito'))
        const carritoSinElProducto = carritoLs.filter((producto) => producto.id !== idProducto)
        setCarrito(carritoSinElProducto)
        localStorage.setItem('carrito', JSON.stringify(carritoSinElProducto))

        Swal.fire({
          title: "Producto eliminado del carrito!",
          text: "Tu producto fue eliminado con exito",
          icon: "success"
        });
      }
    });
  }

  useEffect(() => {
    const carritoLs = JSON.parse(localStorage.getItem('carrito')) || []
    setCarrito(carritoLs)
  }, [])


  return (
    <>
      {
        carrito.length
          ?
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
                carrito.map((producto, i) =>
                  <tr key={producto.id}>
                    <td>{i + 1}</td>
                    <td>{producto.title}</td>
                    <td>{producto.price}</td>
                    <td>
                      <input type="number" className='w-50' value={cantidad} onChange={handleChangeQuantity} />
                    </td>
                    <td>
                      <p>{(cantidad * producto.price).toFixed(2)}</p>
                    </td>
                    <td>
                      <Button variant='danger' onClick={() => borrarProducto(producto.id)}>Eliminar</Button>
                    </td>
                  </tr>

                )
              }

            </tbody>
          </Table>
          :
          <h2 className='text-center my-5'>No hay productos cargados todavia en el carrito</h2>
      }
    </>
  )
}

export default TableC

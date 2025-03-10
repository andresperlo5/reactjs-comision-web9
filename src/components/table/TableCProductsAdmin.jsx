import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router";
import Swal from "sweetalert2";

export const TableCProductsAdmin = () => {
  const [productos, setProductos] = useState([]);

  const productoLs = () => {
    setProductos(JSON.parse(localStorage.getItem("productos")) || []);
  };

  useEffect(() => {
    productoLs();
  }, []);

  const eliminarProducto = (id) => {
    Swal.fire({
      title: "Estas Seguro que quieres borrar este Producto?",
      text: "Este cambio es irreversible!!!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Borrar",
      cancelButtonText: "No, no quiero borrarlo",
    }).then((result) => {
      if (result.isConfirmed) {
        const productosActualizados = productos.filter(
          (producto) => producto.id !== id
        );
        localStorage.setItem(
          "productos",
          JSON.stringify(productosActualizados)
        );
        setProductos(productosActualizados);
        Swal.fire({
          title: "Producto Borrado Correctamente!",
          icon: "success",
        });
      }
    });
  };

  return (
    <Container>
      <h1>Tabla Productos</h1>
      <div className="d-flex justify-content-end">
        <Link to="/admin/crearProducto" className="btn btn-primary">
          Añadir Producto
        </Link>
      </div>
      <table className="table mt-5">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre del Producto</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos &&
            productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.title}</td>
                <td>{producto.description}</td>
                <td>{producto.price}</td>
                <td className="d-flex">
                  <Button
                    onClick={() => eliminarProducto(producto.id)}
                    className="btn btn-danger"
                  >
                    Eliminar
                  </Button>
                  <Button className="btn btn-warning ms-3">Editar</Button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Container>
  );
};

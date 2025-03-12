import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";

export const TableCProductsAdmin = () => {
  const navigate = useNavigate()
  const [productos, setProductos] = useState([]);
  const usuarioLogeado = JSON.parse(sessionStorage.getItem('usuarioLogueado')) || null

  const productoLs = () => {
    setProductos(JSON.parse(localStorage.getItem("productos")) || []);
  };

  useEffect(() => {
    productoLs();
  }, []);

  const eliminarProducto = (id) => {
    if (!usuarioLogeado) {
      Swal.fire({
        icon: "error",
        title: "Debes iniciar sesion para continuar!",
        text: "En breve seras redirigido al inicio de sesion"
      });

      setTimeout(() => {
        navigate('/login')
      }, 1500);
      return
    }

    if (usuarioLogeado && usuarioLogeado.rol === 'usuario') {
      setTimeout(() => {
        navigate('/user')
      }, 100);
      return
    }

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


  const validarUsuario = () => {
    if (!usuarioLogeado) {
      Swal.fire({
        icon: "error",
        title: "Debes iniciar sesion para continuar!",
        text: "En breve seras redirigido al inicio de sesion"
      });

      setTimeout(() => {
        navigate('/login')
      }, 1500);
      return
    } else if (usuarioLogeado && usuarioLogeado.rol === 'usuario') {
      setTimeout(() => {
        navigate('/user')
      }, 100);
    }
  }



  return (
    <>
      {
        usuarioLogeado && usuarioLogeado.rol === 'admin' &&
        <Container>
          <h1>Tabla Productos</h1>
          <div className="d-flex justify-content-end">
            <Link to={usuarioLogeado ? "/admin/crearProducto" : '#'} className="btn btn-primary" onClick={validarUsuario}>
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
                      {/*             <Button className="btn btn-warning ms-3" >Editar</Button> */}
                      <Link to={usuarioLogeado ? `/admin/crearProducto?id=${producto.id}` : "#"} className="btn btn-warning ms-3" onClick={validarUsuario}>Editar</Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Container>
      }
    </>
  );
};

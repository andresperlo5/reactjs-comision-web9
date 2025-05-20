import { useEffect, useState } from "react";
import { Button, Container, Tab } from "react-bootstrap";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import clientAxios from "../../helpers/axios.helpers";

export const TableCProductsAdmin = () => {
  const navigate = useNavigate()
  const [productos, setProductos] = useState([]);
  const usuarioLogeado = JSON.parse(sessionStorage.getItem('token')) || null
  const rol = JSON.parse(sessionStorage.getItem('rol')) || null

  const productoLs = async () => {
    console.log("1")
    const res = await clientAxios.get("/productos")
    console.log(res)
    setProductos(res.data.productos)
    //setProductos(JSON.parse(localStorage.getItem("productos")) || []);
  };



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

    if (usuarioLogeado && rol === 'usuario') {
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
    } else if (usuarioLogeado && rol === 'usuario') {
      setTimeout(() => {
        navigate('/user')
      }, 100);
    }
  }


  useEffect(() => {
    productoLs();
  }, []);
  return (
    <>
      {
        usuarioLogeado && rol === 'admin' &&
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
                productos.map((producto, i) => (
                  <tr key={producto._id}>
                    <td>{i + 1}</td>
                    <td>{producto.nombre}</td>
                    <td>{producto.descripcion}</td>
                    <td>{producto.precio}</td>
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

import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import clientAxios, { configHeaders } from "../../helpers/axios.helpers";

export const CrearProducto = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(0);
  const [productoEditar, setProductoEditar] = useState({
    title: '',
    description: '',
    price: 0
  })

  const navigate = useNavigate();
  const idParams = new URLSearchParams(location.search).get('id')

  const crearProducto = async (e) => {
    e.preventDefault();

    console.log(productoEditar)

    const res = await clientAxios.post("/productos", {

      nombre,
      descripcion,
      precio,
      imagen: "url"
    }, configHeaders)

    if (res.status === 201) {
      setNombre("");
      setDescripcion("");
      setPrecio("");

      Swal.fire({
        title: "Producto creado correctamente!",
        icon: "success",
      });

      navigate("/admin/products");
    }





/* 
    const productosLS = JSON.parse(localStorage.getItem("productos"));

    console.log(productosLS);

    const nuevoProducto = {
      id: productosLS[productosLS.length - 1].id + 1,
      title: nombre,
      description: descripcion,
      price: precio,
    };

    const productosActualizados = [...productosLS, nuevoProducto];

    localStorage.setItem("productos", JSON.stringify(productosActualizados));

    setNombre("");
    setDescripcion("");
    setPrecio("");

    Swal.fire({
      title: "Producto creado correctamente!",
      icon: "success",
    });

    navigate("/admin/products");
 */  };


  const obtenerProductoEditar = () => {
    const productosLS = JSON.parse(localStorage.getItem("productos"));
    const productoAEditar = productosLS.find((producto) => producto.id === Number(idParams))
    setProductoEditar(productoAEditar)
  }

  const handleChangeFormEdit = (ev) => {
    setProductoEditar({ ...productoEditar, [ev.target.name]: ev.target.value })
  }

  const editarProducto = (ev) => {
    ev.preventDefault()
    const productosLS = JSON.parse(localStorage.getItem("productos"));
    const productoAeditar = productosLS.find((producto) => producto.id === Number(idParams))
    const productoIndex = productosLS.findIndex((producto) => producto.id === Number(idParams))

    const prodActualizado = {
      ...productoAeditar,
      title: productoEditar.title,
      description: productoEditar.description,
      price: productoEditar.price
    }

    productosLS[productoIndex] = prodActualizado

    localStorage.setItem('productos', JSON.stringify(productosLS))

    Swal.fire({
      title: "Producto editado con exito!",
      icon: "success",
    });

    navigate('/admin/products')

  }

  useEffect(() => {
    if (idParams) {
      obtenerProductoEditar()
    }
  }, [])

  return (
    <section className="container">
      {
        idParams ?
          <h1>Editar Producto</h1>
          :
          <h1>Crear Producto</h1>
      }
      <hr />
      <Form className="w-50" onSubmit={idParams ? editarProducto : crearProducto}>
        <Form.Group className="mb-3" controlId="formNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Ingrese un nombre del producto"
            value={idParams && productoEditar.title}
            onChange={(e) => idParams ? handleChangeFormEdit(e) : setNombre(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Descripcion</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={idParams && productoEditar.description}
            placeholder="Ingrese la descripcion del producto"
            onChange={(e) => idParams ? handleChangeFormEdit(e) : setDescripcion(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrecio">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={idParams && productoEditar.price}
            placeholder="Ingrese el precio del producto"
            onChange={(e) => idParams ? handleChangeFormEdit(e) : setPrecio(e.target.value)}
          />
        </Form.Group>
        <Button type="submit btn btn-primary">
          {
            idParams ? 'Editar Producto' : 'Crear Producto'
          }
        </Button>
      </Form>
    </section>
  );
};

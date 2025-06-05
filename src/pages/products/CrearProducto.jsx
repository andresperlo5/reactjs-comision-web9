import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import clientAxios, { configHeaders, configHeadersImage } from "../../helpers/axios.helpers";

export const CrearProducto = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(0);
  const [productoEditar, setProductoEditar] = useState({
    title: '',
    description: '',
    price: 0,
  })
  const [imagen, setImagen] = useState("")

  const navigate = useNavigate();
  const idParams = new URLSearchParams(location.search).get('id')

  const crearProducto = async (e) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append("imagen", imagen)

    const res = await clientAxios.post("/productos", {
      nombre,
      descripcion,
      precio,
      imagen: "url"
    }, configHeaders)

    if (res.status === 201) {

      const agregarImagen = await clientAxios.put(`/productos/addImage/${res.data.idProducto}`, formData, configHeadersImage)

      setNombre("");
      setDescripcion("");
      setPrecio("");

      Swal.fire({
        title: "Producto creado correctamente!",
        icon: "success",
      });

      navigate("/admin/products");
    }


  };


  const obtenerProductoEditar = () => {
    const productosLS = JSON.parse(localStorage.getItem("productos"));
    const productoAEditar = productosLS.find((producto) => producto.id === Number(idParams))
    setProductoEditar(productoAEditar)
  }

  const handleChangeFormEdit = (ev) => {
    setProductoEditar({ ...productoEditar, [ev.target.name]: ev.target.value })
  }

  const handleChangeImage = (ev) => {
    setImagen(ev.target.files[0])
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
        <Form.Group className="mb-3" controlId="formPrecio">
          <Form.Label>Imagen</Form.Label>
          <Form.Control
            type="file"
            name="imagen"
            onChange={handleChangeImage}
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

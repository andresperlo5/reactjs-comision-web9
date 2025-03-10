import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export const CrearProducto = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(0);

  const navigate = useNavigate();

  const crearProducto = (e) => {
    e.preventDefault();

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
  };

  return (
    <section className="container">
      <h1>Crear Producto</h1>
      <hr />
      <Form className="w-50" onSubmit={crearProducto}>
        <Form.Group className="mb-3" controlId="formNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese un nombre del producto"
            onChange={(e) => setNombre(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Descripcion</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese la descripcion del producto"
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrecio">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ingrese el precio del producto"
            onChange={(e) => setPrecio(e.target.value)}
          />
        </Form.Group>
        <Button type="submit btn btn-primary">Crear Producto</Button>
      </Form>
    </section>
  );
};

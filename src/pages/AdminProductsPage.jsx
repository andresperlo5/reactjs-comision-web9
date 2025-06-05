import { useEffect, useState } from "react"
import { TableCProductsAdmin } from "../components/table/TableCProductsAdmin"


const AdminProductsPage = () => {
  const [products, setProducts] = useState([])
  const usuarioLogeado = JSON.parse(sessionStorage.getItem('token')) || null

  const getProducts = () => {
    const productosLs = JSON.parse(localStorage.getItem('productos')) || []
    setProducts(productosLs)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <>
      {
        usuarioLogeado &&
        <section>
          <TableCProductsAdmin />
        </section>
      }
    </>
  )
}

export default AdminProductsPage

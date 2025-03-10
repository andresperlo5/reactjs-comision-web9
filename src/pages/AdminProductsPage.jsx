import { useEffect, useState } from "react"
import TableC from "../components/table/TableC"
import { TableCProductsAdmin } from "../components/table/TableCProductsAdmin"


const AdminProductsPage = () => {
  const [products, setProducts] = useState([])

  const getProducts = () => {
    const productosLs = JSON.parse(localStorage.getItem('productos')) || []
    setProducts(productosLs)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <section>
      {/* <TableC idPage='adminProducts' array={products} /> */}
      <TableCProductsAdmin/>
    </section>
  )
}

export default AdminProductsPage

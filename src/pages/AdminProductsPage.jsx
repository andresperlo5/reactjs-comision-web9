import { useEffect, useState } from "react"
import TableC from "../components/table/TableC"


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
    <>
      <TableC idPage='adminProducts' array={products} />
    </>
  )
}

export default AdminProductsPage

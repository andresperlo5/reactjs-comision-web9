import { useEffect, useState } from "react"
import TableC from "../components/table/TableC"

const AdminUsersPage = () => {
  const [users, setUsers] = useState([])
  const usuarioLogeado = JSON.parse(sessionStorage.getItem('usuarioLogueado')) || null

  const getUsers = () => {
    const usuariosLs = JSON.parse(localStorage.getItem('usuarios')) || []
    setUsers(usuariosLs)
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <>
      {
        usuarioLogeado &&
        <TableC idPage='adminUsers' array={users} />
      }
    </>
  )
}

export default AdminUsersPage

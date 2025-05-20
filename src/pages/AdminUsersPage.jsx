import { useEffect, useState } from "react"
import TableC from "../components/table/TableC"
import clientAxios, { configHeaders } from "../helpers/axios.helpers"

const AdminUsersPage = () => {
  const [users, setUsers] = useState([])
  const usuarioLogeado = JSON.parse(sessionStorage.getItem('token')) || null

  const getUsers = async () => {
    const res = await clientAxios.get("/usuarios", configHeaders)
    console.log(res)
    setUsers(res.data.usuarios)
    /*   const usuariosLs = JSON.parse(localStorage.getItem('usuarios')) || []
      setUsers(usuariosLs) */
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

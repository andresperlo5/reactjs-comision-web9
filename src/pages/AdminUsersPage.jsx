import { useState } from "react"
import TableC from "../components/table/TableC"

const AdminUsersPage = () => {
  const [users, setUsers] = useState([])

  const getUsers = () => {
    const usuariosLs = JSON.parse(localStorage.getItem('usuarios')) || []
    setUsers(usuariosLs)
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <TableC idPage='adminUsers' array={users} />
  )
}

export default AdminUsersPage

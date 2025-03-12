
const AdminPage = () => {
  const usuarioLogeado = JSON.parse(sessionStorage.getItem('usuarioLogueado')) || null
  return (
    <>
      {
        usuarioLogeado &&
        <div>AdminPage</div>
      }
    </>
  )
}

export default AdminPage

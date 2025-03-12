export const useChangeTitle = (idPage) => {
  switch (idPage) {
    case 'home':
      document.title = "Pagina Principal"
      break
    case 'aboutUs':
      document.title = "Sobre Nosotros"
      break
    case 'contact':
      document.title = "Contacto"
      break

    default:
      document.title = 'Error'
      break
  }
}

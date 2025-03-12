export const useApiFakeStore = async (idFakeStore) => {
  const productos = await fetch(idFakeStore ? `https://fakestoreapi.com/products/${idFakeStore}` : 'https://fakestoreapi.com/products')
  const data = await productos.json()
  return data
}

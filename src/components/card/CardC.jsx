import Card from 'react-bootstrap/Card';
import './CardC.css'
import { Link } from 'react-router';

const CardC = ({ idProd, urlImagen, titulo, descripcion, precio }) => {
  //const { urlImagen, titulo, descripcion } = props
  return (
    <>
      <Card className='mt-5'>
        <Card.Img variant="top" src={urlImagen} />
        <Card.Body>
          <Card.Title className='text-truncate'>{titulo}</Card.Title>
          <Card.Title className='text-truncate'>${precio}</Card.Title>
          <Card.Text className='text-truncate'>
            {descripcion}
          </Card.Text>
          <Link to={`/detalle-producto/${idProd}`} className='btn btn-primary'> Ver Mas </Link>
        </Card.Body>
      </Card>
    </>
  )
}

export default CardC

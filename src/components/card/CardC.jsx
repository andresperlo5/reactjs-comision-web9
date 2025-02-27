import Card from 'react-bootstrap/Card';
import './CardC.css'
import { Link } from 'react-router';

const CardC = ({ idProd, urlImagen, titulo, descripcion }) => {
  //const { urlImagen, titulo, descripcion } = props
  return (
    <>
      <Card className='mt-5'>
        <Card.Img variant="top" src={urlImagen} />
        <Card.Body>
          <Card.Title className='text-truncate'>{titulo}</Card.Title>
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

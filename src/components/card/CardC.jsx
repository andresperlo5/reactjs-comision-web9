import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './CardC.css'

const CardC = () => {
  return (
    <>
      <Card className='mt-5'>
        <Card.Img variant="top" src="https://img.freepik.com/foto-gratis/hoja-otono-transparente-colores-vivos_23-2148239739.jpg" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </>
  )
}

export default CardC

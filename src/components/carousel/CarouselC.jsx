import Carousel from 'react-bootstrap/Carousel';
import './CarouselC.css'

const CarouselC = () => {
  return (
    <>
      <Carousel fade>
        <Carousel.Item className='img-carousel'>
          <img src="https://wallpapers.com/images/hd/4k-ultra-hd-landscape-wallpaper-awid1q3a5dov0lop.jpg" alt="imagen 1" />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className='img-carousel'>
          <img src="https://wallpapers.com/images/featured/hd-a5u9zq0a0ymy2dug.jpg" alt="imagen 2" />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className='img-carousel'>
          <img src="https://as2.ftcdn.net/v2/jpg/04/27/16/05/1000_F_427160582_w0D5Z01pVaz32w7JzzNWTtE2n1VvvKmi.jpg" alt="imagen 3" />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  )
}

export default CarouselC

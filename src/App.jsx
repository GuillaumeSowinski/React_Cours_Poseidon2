import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import './styles/image.css';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProduct() {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
    };

    fetchProduct();
  }, []);



  const addProduct = async () => {
    const response = await fetch('https://fakestoreapi.com/products', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Nouveau produit",
        price: 29.99,
        description: "Un super produit ajouté via API",
        image: "https://picsum.photos/200/300",
        category: "electronics",
      }),
    })
    const data = await response.json()
    alert(`Le produit avec l'id ${data.id} a été créé`)
  }

  return (
    <Container className='mt-5'>
      <Button onClick={addProduct}>Ajouter un  Produit</Button>
      <Row className="justify-content-center g-3">
        {products.map((item) => (
          <Col key={item.id} lg={3}>
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={item.image}
                alt={item.title}
              />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Card.Text>{item.price}€</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;

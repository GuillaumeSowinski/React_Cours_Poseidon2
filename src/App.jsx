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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.statusText ? response.statusText + ' - ' :
            ''}${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError("Une erreur est survenue lors de la récupération des produits.");
        console.error(err.message);
      } finally {
        setLoading(false)
      };
    }
    fetchProduct();
  }, []);




  const addProduct = async () => {
    try {
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
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.statusText ? response.statusText + ' - ' :
          ''}${response.status}`);
      }
      const data = await response.json()
      alert(`Le produit avec l'id ${data.id} a été créé`)
    } catch (err) {
      alert("Une erreur est survenue lors de l'ajout d'un produit.");
      console.error(err.message)
    }
  }


  const modifyFullProduct = async (id) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}a`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Produit mis à jour",
          price: 49.99,
          description: "Description mise à jour",
          image: "https://picsum.photos/200/300",
          category: "electronics",
        }),
      })
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.statusText ? response.statusText + ' - ' :
          ''}${response.status}`);
      }
      const data = await response.json()
      alert(`Le produit avec l'id ${data.id} a été modifié`)
    } catch (err) {
      alert("Une erreur est survenue lors de la modification du produit.");
      console.error(err.message)
    }
  }


  const modifyProduct = async (id) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price: 39.99,
        }),
      })
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.statusText ? response.statusText + ' - ' :
          ''}${response.status}`);
      }
      const data = await response.json()
      alert(`Le prix du produit avec l'id ${data.id} a été modifié`)
    } catch (err) {
      alert("Une erreur est survenue lors de la modification d'un produit.");
      console.error(err.message)
    }

  }

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.statusText ? response.statusText + ' - ' :
          ''}${response.status}`);
      }
      const data = await response.json()
      alert(`Le produit avec l'id ${data.id} a été supprimé`)
    } catch (err) {
      alert("Une erreur est survenue lors de la suppression du produit.");
      console.error(err.message)
    }
  }


  if (error) return <p>{error}</p>;
  if (loading) return <p>Chargement...</p>;

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
              <Card.Footer className='row gy-3 mx-0'>
                <Button variant="primary" onClick={() => modifyFullProduct(item.id)}>Modifier le produit complet</Button>
                <Button variant="warning" onClick={() => modifyProduct(item.id)}>Modifier le prix du produit</Button>
                <Button variant="danger" onClick={() => deleteProduct(item.id)}>Supprimer le produit</Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;

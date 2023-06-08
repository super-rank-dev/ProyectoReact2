import { useContext, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Context } from "../../context";
import ItemCount from "../ItemCount";
import "./itemDetail.css";
import Card from 'react-bootstrap/Card';

function ItemDetail({ product }) {
   const { onAdd } = useContext(Context);
   const [added, setAdded] = useState(0);

   function onAddProduct(count) {
     setAdded(count);
     onAdd(product, count);
   }

  return (
    <Container>          
    <div className='divCard'> 
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={product.image}/>
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Subtitle>{product.money} {product.price}</Card.Subtitle>
        {product.stock > 0 && (<p>Stock: {product.stock}</p>)}
        {product.stock === 0 && (<p className="pStock">Sin stock en este momento!</p>)}
        <div>
            {added == 0 && product.stock > 0 && (
              <ItemCount stock={product.stock} onAdd={onAddProduct} />
            )}
            <div className="ctas-container">
              {added >= 1 && (
                <Link to="/cart">
                  <Button>Ir al carrito</Button>
                </Link>
              )}
            </div>
          </div>
      </Card.Body>
    </Card>
    </div>
    </Container>
  );
}

export default ItemDetail;

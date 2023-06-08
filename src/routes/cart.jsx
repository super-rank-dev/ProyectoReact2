import {addDoc,collection,doc,getFirestore,updateDoc,} from "firebase/firestore";
import NavBar from '../components/NavBar'
import Alert from 'react-bootstrap/Alert';
import { useContext } from "react";
import { Context } from "../context";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import "../styles/cart.css";
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

import Checkout from './checkout';

import React, { useState } from 'react';

  
  function Cart() {
    const [orderId, setOrderId] = useState('');

    const { productsAdded, removeItem, clear } = useContext(Context);

     const db = getFirestore();
  
     function updateOrder(productId, finalStock) {
       const itemRef = doc(db, "products", productId);
       updateDoc(itemRef, { stock: finalStock }).catch((error) =>
         console.log({ error })
       );
     }

    const total = productsAdded.reduce(
      (acc, product) => acc + product.quantity * product.price,
      0);

  
    function sendOrder() {
      

      const total = productsAdded.reduce(
        (acc, product) => acc + product.quantity * product.price,
        0
      );
  
      const order = {
        buyer: { name: document.getElementById("Name").value, email: document.getElementById("Email").value, phone: document.getElementById("Telefono").value },
        items: productsAdded,
        total,
      };
  
       const collectionRef = collection(db, "orders");
  
       addDoc(collectionRef, order)
         .then((response) => {
           const orderId = response.id;
  
           productsAdded.map((product) => {
             const finalStock = product.stock - product.quantity;
             updateOrder(product.id, finalStock);
           });

           setOrderId(orderId);
           clear();
       })
        .catch((error) => console.log({ error }));


    }

    if (productsAdded.length>0 && !orderId){
  
    return (
      <div>
      <NavBar/>
      <div>
        <h2 className='titulo'>TU CARRITO</h2>
      </div>
      <div className="container">
  
  {productsAdded.map((product) => (
    <div className="Cart">
    <div className="col1">
      <img className="img1" variant="bottom" src={product.image} />
      </div>
      <div className="col2">

        <h4>{product.name}</h4>
        <h5>Cantidad: {product.quantity}</h5>
        <h5>Precio: {product.money} {product.price}</h5>
        <h5>Importe total: {product.money} {product.price*product.quantity}</h5>
      </div>
      <div className="col3">
      <Button variant="danger" onClick={() => removeItem(product.id)}>Remover Item</Button>
      </div>
    </div>
    ))}
    <div className='btnClear'>
    <Button variant="light" onClick={() => clear()}>Vaciar mi carrito</Button>
    </div>
    <div className="total">
       <h5>TOTAL A PAGAR: $U {total}</h5>
    </div>
    <div className='formulario'>
    <div className="formTitulo">
       <h5>Datos Personales</h5>
    </div>
    <Form>
    <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Nombre Completo</Form.Label>
        <Form.Control id="Name" type="title" placeholder="Ingrese su nombre completo" />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control id="Email" type="email" placeholder="Ingrese su Email" />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicTelephone">
      <Form.Label>Telefono</Form.Label>
        <Form.Control id="Telefono" type="title" placeholder="Ingrese su telefono" />
        <Form.Text className="text-muted">
          Sus datos personales no seran compartidos con nadie.
        </Form.Text>
      </Form.Group>
    </Form>
    </div>
    
    <div className="btn1">
    <Button onClick={sendOrder}>Terminar mi Compra</Button>
    
    </div>
      </div>
      </div>
    );
  }
  else if (orderId)
  {
    return(

    <Card>
      <Card.Header>Confirmacion de compra</Card.Header>
      <Card.Body>
        <Card.Title>Gracias por tu compra!</Card.Title>
        <Card.Text>
        A continuacion te mostramos el resumen de tu compra.
        </Card.Text>
        <Link to={`/checkout/${orderId}`}>
        <Button variant="primary">IR AL RESUMEN</Button>
        </Link>
      </Card.Body>
    </Card>

    );
  }
else{
  return(
    <div>
    <NavBar/>
    <div className='info'>
    <Alert variant='danger'>Su carrito esta vacio. 
    <Alert.Link href="/"> Haz clic aqui</Alert.Link> para volver a la tienda!
    </Alert>
    </div>
    </div>
  );
}

}
  
  export default Cart;
  
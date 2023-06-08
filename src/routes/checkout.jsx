import NavBar from '../components/NavBar'
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {collection,getDocs,getFirestore,query,where, documentId} from "firebase/firestore";
import "../styles/checkout.css";
import swal from 'sweetalert';
import React from 'react';


function Checkout() {
  //const { orderId } = props;

    //swal("Gracias por tu compra!", "A continuacion te mostramos el resumen de tu compra.", "success");

    const params = useParams();
    const orderNo = params.id; // orderId



    const [order, setOrder] = useState([]);
  

    useEffect(() => {
        const db = getFirestore();
    const ordersCollection = collection(db, "orders");

    const queryResult = query(ordersCollection, where(documentId(), "==", orderNo));

        getDocs(queryResult)
        .then((snapshot) => {
          const docs = snapshot.docs;
          setOrder(docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        })
        .catch((error) => console.log({ error }));

      
    }, [orderNo]);




  return (
    <div>
      <NavBar/>
      <h2 className='titulo'>Resumen de compra</h2>
      <h4 className='orden'>Orden: {order.length > 0 ? order[0].id : ''}</h4>

      
      {order.length > 0 && order[0].items.map(item => (
        
  <div className='contenedor'>
    <div className='col4'>
    <img src={item.image} className='imgCOut'></img>
    </div>
    <div className='col5'>
    <h5>{item.name}</h5>
    <h6>Cantidad: {item.quantity}</h6>
    <h6>Costo: {item.money} {item.price}</h6>
    </div>
  </div>
  
))}
    <h5 className='pago'>Total Pago: $U {order.length > 0 ? order[0].total : ''}</h5>
    {order.length > 0 && (
  <div className='comprador'>
    <h5>Nombre del comprador: {order[0].buyer.name}</h5>
    <h5>Teléfono: {order[0].buyer.phone}</h5>
    <h5>Email: {order[0].buyer.email}</h5>
  </div>
)}


    </div>
    
  )
}

export default Checkout
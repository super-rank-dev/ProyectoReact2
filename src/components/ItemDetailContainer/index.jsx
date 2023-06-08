import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./itemDetCont.css";
import ItemDetail from "../ItemDetail";
import { doc, getDoc, getFirestore } from "firebase/firestore";


function ItemDetailContainer(){
  const params = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const db = getFirestore();
    const itemRef = doc(db, "products", params.id);

    getDoc(itemRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setProduct({ id: snapshot.id, ...snapshot.data() });
        }
      })
      .catch((error) => console.log({ error }));
  }, []);



  if (!product) {
    return <div><Spinner animation="border" variant="primary" /></div>;
  }

  return (
    <div>
      <ItemDetail product={product} />
    </div>
  );

}

  
export default ItemDetailContainer;
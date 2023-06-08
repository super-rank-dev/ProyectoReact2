import { useEffect, useState } from "react";
import {collection,getDocs,getFirestore,query,where} from "firebase/firestore";
import ItemList from "../ItemList";
import Spinner from 'react-bootstrap/Spinner';

function ItemListContainer({ categoryId, isCategoryRoute }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const db = getFirestore();
    const itemsCollection = collection(db, "products");

    if (isCategoryRoute) {
      const queryResult = query(
        itemsCollection,
        where("category", "==", categoryId)
      );
      getDocs(queryResult)
        .then((snapshot) => {
          const docs = snapshot.docs;
          setProducts(docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        })
        .catch((error) => console.log({ error }));
    } else {
      getDocs(itemsCollection)
        .then((snapshot) => {
          const docs = snapshot.docs;
          setProducts(docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        })
        .catch((error) => console.log({ error }));
    }
  }, [categoryId]);

  if (!products) {
    return <div><Spinner animation="border" variant="primary"/></div>;
  }

  return (
    <div>
      <ItemList products={products} />
    </div>
  );

}

export default ItemListContainer;
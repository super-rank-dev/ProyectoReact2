import React from "react";
import { useContext } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
} from "mdb-react-ui-kit";

import { Context } from "../../context";
import "./item.css";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";

function Item({ product }) {
  const { onAdd } = useContext(Context);


  return (
    <MDBContainer fluid>
      <MDBRow className="justify-content-center mb-3">
        <MDBCol md="12" xl="10">
          <MDBCard className="shadow-0 border rounded-3 mt-5 mb-3">
            <MDBCardBody>
              <MDBRow>
                <MDBCol md="12" lg="3" className="mb-4 mb-lg-0">
                    <MDBCardImage src={product.image} fluid className="w-100"
                    /><div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }} ></div>
                </MDBCol>
                <MDBCol md="6">
                  <h5>{product.name}</h5>
                  <div className="mt-1 mb-0 text-muted small">
                    <span>{product.description}</span>                    
                  </div>
                </MDBCol>
                <MDBCol md="6" lg="3" className="border-sm-start-none border-start">
                  <div className="d-flex flex-row align-items-center mb-1">
                    <h4 className="mb-1 me-1">{product.money} {product.price}</h4>
                    <span className="text-danger">
                      <s>{product.money} {product.price*1.2}</s>
                    </span>
                  </div>
                  <h5 className="text-success">20% de descuento!</h5>
                  <h6 className="text-success">Envio Gratis!</h6>
                  <div className="d-flex flex-column mt-4">
                    <Button className="btn-detalle">
                    <NavLink  to={`/item/${product.id}`}>Detalle</NavLink>                      
                    </Button>
                    {product.stock > 0 && (<button className="btn-carrito" onClick={() => onAdd(product, 1)}>
                    Añadir al Carrito
                    </button>)}
                    {product.stock === 0 && (<p className="pStock">Sin stock en este momento!</p>)}
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Item;
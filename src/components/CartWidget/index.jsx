import "./cartwidget.css"
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context";
import Carrito from "../../assets/img/shopping_cart.svg";

function CartWidget() {
    const { productsAdded } = useContext(Context);
    let acc = 0;
    for (let i = 0; i < productsAdded.length; i++) {
        acc += productsAdded[i].quantity; 
    }


    return (
        <Link to="/cart">
        <div className="logoContenedor">
            <img src={Carrito}></img>
            {acc > 0 && acc}
        </div>
        </Link>
    );
}

export default CartWidget;
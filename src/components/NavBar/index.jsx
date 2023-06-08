import CartWidget from "../CartWidget"
import "./navbar.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { NavLink } from "react-router-dom";


function NavBar() {
    return (
        <div className="navBar">
            <Navbar bg="primary" variant="light">
                <Container>
                <NavLink className='logo' to="/">URU-SHOP</NavLink>
                <Nav className="me-auto">
                    <Nav.Link>
                    <NavLink  to={"/category/super"}>SUPER </NavLink>
                    </Nav.Link>
                    <Nav.Link>
                    <NavLink  to={"/category/ropa"}>ROPA </NavLink>
                    </Nav.Link>
                    <Nav.Link>
                    <NavLink  to={"/category/electro"}>ELECTRO </NavLink>
                    </Nav.Link>
                    <Nav.Link>
                    <NavLink  to={"/category/farmacia"}>FARMACIA </NavLink>
                    </Nav.Link>
                    <Nav.Link>
                    <NavLink  to={"/category/viajes"}>VIAJES </NavLink>
                    </Nav.Link>
                </Nav>
                </Container>
                <CartWidget/>
            </Navbar>          
        </div>    
    )
}

export default NavBar
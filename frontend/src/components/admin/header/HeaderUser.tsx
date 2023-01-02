import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import React, { useState, useEffect, createContext } from "react";
import axios from "../../../Axios";
import { globalContext } from "../../../Context";
const Logo = require("../../../images/Logo.png");

const HeaderUser = (): JSX.Element => {
    const [name, setName] = useState<string>("");

    const { currentUser } = globalContext();

    useEffect(() => {
        var firstName = currentUser.split(" ");
        setName(firstName[0]);
    }, [currentUser]);

    function Logout() {
        axios
            .get("/logout")
            .then(() => {
                window.location.href = "/";
            })
            .catch((err) => {});
    }

    return (
        <div>
            <Navbar bg="primary" expand="lg">
                <Container>
                    <Navbar.Brand href="/">
                    {/* <img src={Logo} height="35" /> */}
                    <h2>BlogSpot</h2>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/artigos">Artigos</Nav.Link>
                            <Nav.Link href="/categorias">Categorias</Nav.Link>
                            {/* <Nav.Link href="#">Artigos</Nav.Link> */}
                        </Nav>
                        <Nav className="ms-auto">
                            <NavDropdown title={`Olá, ${name}`}>
                                {/* <NavDropdown.Item href="#">
                                    Minha Conta
                                </NavDropdown.Item> */}
                                {/* <NavDropdown.Divider /> */}
                                <NavDropdown.Item onClick={Logout}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default HeaderUser;

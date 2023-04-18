import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import axios from "../../Axios";
const Logo = require("../../images/Logo.png");

interface Categories {
    id: number;
    title: string;
    slug: string;
}

const Header = (): JSX.Element => {
    const [categories, setCategories] = useState<Categories[]>([]);

    useEffect(() => {
        axios
            .get(`/categories`)
            .then((res) => {
                setCategories(res.data);
            })
            .catch((err) => {});
    }, []);

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
                            {categories.map(({ id, title, slug }) => (
                                <Nav.Link key={id} href={`/categoria/${slug}`}>
                                    {title}
                                </Nav.Link>
                            ))}
                        </Nav>
                        <Nav className="ms-auto">
                            <Nav.Link href="/login">Login</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Margin_Btn = styled.div`
    margin-left: 20px;
`;

function Navbar2() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Container>
                <Link to="/" className="navbar-logo">
                    <Navbar.Brand>
                        <i className="fa-solid fa-laptop-code"></i> SDDS{" "}
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link>주요기능</Nav.Link>
                        <Nav.Link>템플릿</Nav.Link>
                    </Nav>
                    <Nav>
                        <Link to="/login">
                            <Margin_Btn>
                                <Button variant="outline-secondary">
                                    Login
                                </Button>{" "}
                            </Margin_Btn>
                        </Link>
                        <Link to="/login">
                            <Margin_Btn>
                                <Button variant="outline-secondary">
                                    시작하기
                                </Button>{" "}
                            </Margin_Btn>
                        </Link>
                        {/* <Nav.Link href="#deets">Login</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            시작하기
                        </Nav.Link> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navbar2;

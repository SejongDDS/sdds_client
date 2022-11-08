import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function PersonalNav(){

    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
            <Container>
                <Navbar.Brand><i class="fa-solid fa-code"></i></Navbar.Brand>
                <Navbar.Brand href="/personal">

                    SDDS
                    </Navbar.Brand>
                    
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        
                
                    </Nav>
                    <Nav>
                        <Nav.Link href="/main">새로운 사이트만들기</Nav.Link>
                        <Nav.Link href="/">로그아웃</Nav.Link>
                    </Nav>
                    
                    
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default PersonalNav;
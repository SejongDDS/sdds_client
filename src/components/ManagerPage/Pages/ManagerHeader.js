import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'
import styled from 'styled-components';


const Header =styled.div`

`
function ManagerHeader({domain,page_url}){

    return(
        <Header>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
            <Container>
                <Navbar.Brand href="/personal">SDDS</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    <Nav.Link href={page_url}>{domain}</Nav.Link>
                
            </Nav>
            <Nav>
            <Nav.Link href={page_url}>사이트 바로가기</Nav.Link>
            <Nav.Link href="/personal">나가기</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    </Header>
    )
}

export default ManagerHeader;
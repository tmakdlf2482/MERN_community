import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';

function Heading() {
  return (
    <Navbar data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to='/' style={{color: 'white', textDecoration: 'none', marginRight: '10px'}}>홈</Link>
            <Link to='/upload' style={{color: 'white', textDecoration: 'none', marginRight: '10px'}}>업로드</Link>
            <Link to='/' style={{color: 'white', textDecoration: 'none', marginRight: '10px'}}>리스트</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Heading
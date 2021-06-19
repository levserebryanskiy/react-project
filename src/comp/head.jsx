import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';

const HeadComp = ({ onClick, isShow }) => (
  <div>
    <Navbar bg="light" expand="lg" className="justify-content-between">
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Item>
            <Nav.Link href="/">Список дел </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/addcategory">Категории</Nav.Link>
          </Nav.Item>
        </Nav>
        {isShow && (
          <Button type="button" onClick={onClick}>
            Добавить категорию
          </Button>
        )}
      </Navbar.Collapse>
    </Navbar>
  </div>
);

export default HeadComp;

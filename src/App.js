import React, { useState, useEffect } from "react";
import ChatWindow from "./components/ChatWindow";
import Login from "./components/Login";
import { Switch, Route, NavLink } from "react-router-dom";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
import FacebookLogin from "react-facebook-login";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [open, setOpen] = useState(false);
  const [username, setUser] = useState("Anonymous");
  const [avatar, setAvatar] = useState("");
  const loginWithFacebook = (data) => {
    console.log(data);
    setUser(data.name);
    setAvatar(data.picture.data.url);
    localStorage.setItem("username", data.name);
    localStorage.setItem("avatar", data.picture.data.url);
  };

  useEffect(() => {
    let oldUser = localStorage.getItem("username") || "Anonymous";
    let oldAvatar = localStorage.getItem("avatar") || "";
    setUser(oldUser);
    setAvatar(oldAvatar);
  }, []);
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">TalkToMe</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={() => setOpen(!open)}>
              Login with Facebook
            </Nav.Link>
            {/*
            <Nav.Link as={NavLink} to="/login">
              Login
            </Nav.Link>
            */}
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button ariant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <Modal show={open} onHide={() => setOpen(!open)}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <FacebookLogin
            appId="2780444682185548"
            autoLoad={false}
            fields="name,email,picture"
            callback={loginWithFacebook}
          />
        </Modal.Body>
      </Modal>
      <Container className="border border-dark" fluid>
        <Row>
          <Col xs="2" className="border-right border-dark p-3">
            <h5>Chat Rooms</h5>
          </Col>
          <Col xs="2" className="p-3">
            <h5>Messages</h5>
          </Col>
        </Row>
        <Row className="border-top border-dark" style={{ minHeight: "86vh" }}>
          <Col xs="2" className="border-right border-dark p-3">
            <h5>
              <a href="#">Vietnam</a>
            </h5>
            <h5>
              <a href="#">United States</a>
            </h5>
          </Col>
          <Col xs="10" className="p-3">
            <ChatWindow username={username} avatar={avatar}></ChatWindow>
          </Col>
        </Row>
      </Container>
      <Switch>
        <Route path="/login" exact component={Login}></Route>
      </Switch>
    </div>
  );
}

export default App;

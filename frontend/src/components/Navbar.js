import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import ConnectButton from "./ConnectButton";
import AccountModal from "./AccountModal"
import theme from "./theme";
import "@fontsource/inter";
import logo from "../assets/CXR - logo trailer_002.png";
import { Link } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineUser,
} from "react-icons/ai";
import { ChakraProvider, useDisclosure } from "@chakra-ui/react";



function NavBar() {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(true);

  function scrollHandler() {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  }

  //window.addEventListener("scroll", scrollHandler);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    
      <Navbar
        expanded={expand}
        fixed="top"
        expand="md"
        className={navColour ? "sticky" : "navbar"}
      >
        <Container>
          <Navbar.Brand href="/" className="d-flex">
            <img src={logo} className="img-fluid logo" alt="brand" />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={() => {
              updateExpanded(expand ? false : "expanded");
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto" defaultActiveKey="#home">
              <Nav.Item>
                <Nav.Link as="a" href="http://cryptoversexplore.com" target="_blank" >
                  <AiOutlineHome style={{ marginBottom: "2px" }} /> Official Website
                </Nav.Link>
              </Nav.Item>
              
              <ChakraProvider resetCSS={false} theme={theme}>
                <Nav.Item>
                  <ConnectButton handleOpenModal={onOpen} />
                  <AccountModal isOpen={isOpen} onClose={onClose} />
                </Nav.Item>
              </ChakraProvider>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}

export default NavBar;

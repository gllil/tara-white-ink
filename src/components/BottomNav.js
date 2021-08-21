import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import useListings from "../hooks/useListings";

const BottomNav = () => {
  const { items } = useListings("listings");
  return (
    <Container fluid className="bottom-nav text-center mt-5">
      <Row className="p-0">
        <Col className="p-0 menuBtn">
          <a href="/" className="nav-link">
            <i className="fas fa-home"></i>
            <h6>Home</h6>
          </a>
        </Col>
        <Col className="p-0 menuBtn">
          <a href="/about" className="nav-link">
            <i className="fas fa-address-card"></i>
            <h6>About Me</h6>
          </a>
        </Col>
        {items.length > 0 && (
          <Col className="p-0 menuBtn">
            <a href="/store" className="nav-link">
              <i className="fas fa-store"></i>
              <h6>Store</h6>
            </a>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default BottomNav;

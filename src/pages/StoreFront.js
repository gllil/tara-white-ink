import React from "react";
import { Badge, Col, Container, Row } from "react-bootstrap";
import logo from "../assets/images/mainLogo.png";
import StoreItem from "../components/StoreItem";
import useFirestoreDesc from "../hooks/useFirestoreDesc";
import useListings from "../hooks/useListings";

const StoreFront = () => {
  const { docs } = useFirestoreDesc("pageInfo");
  const { items } = useListings("listings");

  console.log(items);

  const formatPhoneNumber = (phoneNum) => {
    var cleaned = ("" + phoneNum).replace(/\D/g, "");
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
    return null;
  };
  return (
    <Container className="storeContainer">
      <div className="headerAbout">
        <Row>
          <Col className="text-right">
            <h4>
              <span className=" fa-layers fa-fw mr-2 mt-2">
                <i className="fas fa-shopping-cart fa-lg"></i>
                <span
                  className="fa-layers-text fa-inverse "
                  data-fa-transform="shrink-6 right-4 up-1"
                >
                  27
                </span>
              </span>
              <a href="/" className="aboutMeLink">
                <Badge className="aboutMeLinkStyle m-1" variant="secondary">
                  <i className="fas fa-home fa-lg"></i>
                </Badge>
              </a>
            </h4>
          </Col>
        </Row>
        <Row>
          <Col className="logoContainerAbout">
            <div className="logoWrapperAbout">
              <h1>
                <span className="whiteAbout">white</span>
                <span className="inkAbout">ink</span>
              </h1>
              <img src={logo} alt="tara white logo" className="inkImageAbout" />
            </div>
          </Col>
        </Row>
        {docs &&
          docs.map((doc) => (
            <div key={doc.id}>
              <Row>
                <Col className="subtitleContainer">
                  <h2>{doc.subtitle}</h2>
                  <h4 className="mt-3">{doc.description}</h4>
                </Col>
              </Row>
              <Row>
                <Col className="text-center">
                  <h1>Store</h1>
                </Col>
              </Row>
              <Row>
                <Col className="text-center mt-3">
                  <a
                    className="intagramLink"
                    href={doc.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-instagram fa-3x instagram"></i>
                  </a>
                  <a className="emailLink" href={`mailto:${doc.email}`}>
                    <i className="far fa-envelope fa-3x ml-4 email"></i>
                  </a>
                  <h5 className="mt-3">{formatPhoneNumber(doc.phone)}</h5>
                </Col>
              </Row>
            </div>
          ))}
      </div>
      <Row className="row justify-content-center justify-content-evenly">
        {items.length === 0 && (
          <Col className="text-center mt-5">
            <h4>
              <i className="fas fa-ghost"></i> Oh no! We currently do not have
              any items for sale at the moment. Please check back later.
            </h4>
          </Col>
        )}
        {items.map((item) => (
          <StoreItem
            xs={12}
            sm={6}
            md={4}
            lg={3}
            className="col"
            addCart={true}
            id={item.id}
            itemName={item.name}
            itemDescription={item.description}
            quantity={item.quantity}
            price={item.price}
            photo={item.url}
          />
        ))}
      </Row>
    </Container>
  );
};

export default StoreFront;

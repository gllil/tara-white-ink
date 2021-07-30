import React from "react";
import { Card, Button } from "react-bootstrap";

const StoreItem = ({
  id,
  itemName,
  itemDescription,
  price,
  quantity,
  photo,
}) => {
  return (
    <Card className="m-2" style={{ width: "18rem" }}>
      <Card.Img variant="top" src="https://via.placeholder.com/286x180.png" />
      <Card.Body>
        <Card.Title>Vintage Item</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">$12.00 USD</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">In Stock: 1</Card.Subtitle>
        <Card.Text>
          Some quick example text that will show the description of what someone
          is trying to purchase. This is just an example and would like ot know
          what you think.
        </Card.Text>
        <Button variant="secondary">Add to Cart</Button>
      </Card.Body>
    </Card>
  );
};

export default StoreItem;

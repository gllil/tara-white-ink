import React, { useState, useContext, useEffect } from "react";
import { Container, Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import Progress from "./Progress";
import { GlobalContext } from "../globalState/globalState";
import { projectFirestore } from "../firebase/config";

export const AddStoreItemForm = () => {
  const [state, setState] = useContext(GlobalContext);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const types = ["image/png", "image/jpeg"];
  const listingRef = projectFirestore.collection("listings");
  const listingsCollection = "listings";
  const addItemForm = document.getElementById("addItemForm");

  useEffect(() => {
    if (state.run) {
      listingRef
        .add(state.formData)
        .then(() => {
          setState({
            run: false,
            load: false,
            formData: {},
          });
          addItemForm.reset();
          setSuccess(true);
          setTimeout(() => setSuccess(false), 2000);
        })
        .catch((err) => console.error(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.run]);

  const handleImageChange = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select an image file (png or jpeg)");
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setState({
      formData: {
        ...state.formData,
        [name]: value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setState({
      load: true,
      formData: {
        ...state.formData,
      },
    });
  };

  return (
    <Container className="mt-5 mb-5">
      <Form id="addItemForm" onSubmit={handleSubmit}>
        <h3>Add New Item</h3>
        <Row>
          <Col xs={12}>
            <Form.Group>
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                onChange={handleFormChange}
                name="name"
                type="text"
                required
              />
            </Form.Group>
          </Col>
          <Col xs={12}>
            <Form.Group>
              <Form.Label>Item Description</Form.Label>
              <Form.Control
                onChange={handleFormChange}
                name="description"
                type="text"
                as="textarea"
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Label>Price</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>$</InputGroup.Text>
              </InputGroup.Prepend>

              <Form.Control
                onChange={handleFormChange}
                name="price"
                type="text"
                required
                placeholder="0.00"
              />
            </InputGroup>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                onChange={handleFormChange}
                name="quantity"
                type="number"
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Item Image</Form.Label>
              <Form.Control onChange={handleImageChange} type="file" required />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="secondary" type="submit">
          {state.load ? "Loading..." : "Add New Item"}
        </Button>
      </Form>
      <Row>
        <Col xs={12} className="text-center">
          <div className="output">
            {success && (
              <div className="success">Item was added successfully</div>
            )}
            {error && <div className="error">{error}</div>}
            {state.load && file && (
              <Progress
                file={file}
                setFile={setFile}
                collection={listingsCollection}
              />
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

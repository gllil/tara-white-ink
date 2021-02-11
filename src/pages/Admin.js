import React, { useState } from "react";
import {
  Modal,
  Image,
  Button,
  Container,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import UploadForm from "../components/UploadForm";
import AdminImageGrid from "../components/AdminImageGrid";
import { projectFirestore, auth } from "../firebase/config";
import UploadProfile from "../components/UploadProfile";
import useFirestoreDesc from "../hooks/useFirestoreDesc";

const Admin = () => {
  const { docs } = useFirestoreDesc("pageInfo");
  const imagesRef = projectFirestore.collection("images");
  const pageDataRef = projectFirestore.collection("pageInfo");
  const [selectedImg, setSelectedImg] = useState(null);
  const [imageId, setImageId] = useState(null);
  const [imgCaption, setImgCaption] = useState(null);
  const [caption, setCaption] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [noSuccess, setNoSuccess] = useState(false);
  console.log(docs);
  const formatPhoneNumber = (phoneNum) => {
    var cleaned = ("" + phoneNum).replace(/\D/g, "");
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
    return null;
  };

  const handleClose = () => {
    setOpen(false);
    setModalOpen(false);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setCaption(value);
  };

  const handleSave = (e) => {
    e.preventDefault();

    let data = caption;
    imagesRef
      .doc(imageId)
      .set(
        {
          caption: data,
        },
        { merge: true }
      )
      .then(() => setModalOpen(false));
  };

  const handleBlank = (e) => {
    e.preventDefault();

    imagesRef
      .doc(imageId)
      .set(
        {
          caption: "",
        },
        { merge: true }
      )
      .then(() => setModalOpen(false));
  };

  // const handleSpaces = (description, aboutMe) => {
  //   if (description) {
  //     description = description.replace(/  /g, "[sp][sp]");
  //     description = description.replace(/\n/g, "[nl]");
  //     setFormData({
  //       description: description,
  //     });
  //   }
  //   if (aboutMe) {
  //     aboutMe = aboutMe.replace(/  /g, "[sp][sp]");
  //     aboutMe = aboutMe.replace(/\n/g, "[nl]");
  //     setFormData({
  //       aboutMe: aboutMe,
  //     });
  //   }
  // };

  const handleForm = async (e) => {
    const { dataset, value } = e.target;

    setFormData({ ...formData, [dataset.property]: value });

    console.log(formData);
  };
  const fullForm = document.querySelector(".form");

  const handleSubmit = (e) => {
    e.preventDefault();
    // handleSpaces(formData.description, formData.aboutMe);
    if (fullForm) {
      pageDataRef
        .doc("6lWTkNKLtZMq9u6pfV3h")
        .set(formData, { merge: true })
        .then(() => {
          setSuccessModal(true);
          fullForm.reset();
        })
        .catch((err) => console.log(err));
    } else {
      setErrorModal(true);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();

    auth.signOut();
  };

  return (
    <div className="adminMain mb-5">
      <Container>
        <Row>
          <Col xs={4}>
            <Button
              onClick={(e) => handleClick(e)}
              style={{
                color: "white",
                background: "#000000",
                borderRadius: "25px",
              }}
              size="lg"
            >
              Logout
            </Button>
          </Col>
          <Col xs={4} className="text-center">
            <h1>Page Admin</h1>
          </Col>
          <Col xs={4} />
        </Row>
        <Row className="mt-5 mb-5">
          <Col>
            {docs ? (
              docs.map((doc) => (
                <Form onChange={handleForm} className="form" key={doc.id}>
                  <Form.Group>
                    <Form.Label>Page Subtitle</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={doc.subtitle}
                      data-property="subtitle"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Page Tag Line</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={doc.description}
                      data-property="description"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Instagram Link</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={doc.instagram}
                      data-property="instagram"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      defaultValue={doc.email}
                      data-property="email"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Business Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      defaultValue={formatPhoneNumber(doc.phone)}
                      data-property="phone"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>About Me Paragraph</Form.Label>
                    <Form.Control
                      as="textarea"
                      type="text"
                      defaultValue={doc.aboutMe}
                      data-property="aboutMe"
                    />
                  </Form.Group>
                  <Button onClick={handleSubmit}>Update</Button>
                </Form>
              ))
            ) : (
              <Form onChange={handleForm} className="form">
                <Form.Group>
                  <Form.Label>Page Subtitle</Form.Label>
                  <Form.Control type="text" data-property="subtitle" />
                </Form.Group>
                <Form.Group>
                  <Form.Label>About Me Paragraph</Form.Label>
                  <Form.Control as="textarea" data-property="aboutMe" />
                </Form.Group>
                <Button onClick={handleSubmit}>Update</Button>
              </Form>
            )}

            <Modal className="p-2" show={successModal}>
              <Modal.Body>
                <Row>
                  <Col>
                    <h3 className="p-3">Updated Successfully</h3>
                  </Col>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Row>
                  <Col>
                    <Button onClick={() => setSuccessModal(false)}>
                      Close
                    </Button>
                  </Col>
                </Row>
              </Modal.Footer>
            </Modal>
            <Modal className="p-2" show={errorModal}>
              <Modal.Body>
                <Row>
                  <Col>
                    <h3 className="p-3">
                      One or more lines must be filled in order to submit
                    </h3>
                  </Col>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Row>
                  <Col>
                    <Button onClick={() => setErrorModal(false)}>Close</Button>
                  </Col>
                </Row>
              </Modal.Footer>
            </Modal>
            <Modal className="p-2" show={noSuccess}>
              <Modal.Body>
                <Row>
                  <Col className="p-3">
                    <h3>Error:</h3>
                    <p>Form was not submitted successfully</p>
                  </Col>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Row>
                  <Col>
                    <Button onClick={() => setNoSuccess(false)}>Close</Button>
                  </Col>
                </Row>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
      </Container>
      <hr />
      <UploadProfile />
      <hr />
      <UploadForm />
      <AdminImageGrid
        setSelectedImg={setSelectedImg}
        setOpen={setOpen}
        setModalOpen={setModalOpen}
        setImageId={setImageId}
        setImgCaption={setImgCaption}
      />
      <Modal show={open} onHide={handleClose}>
        <Image src={selectedImg} rounded className="modalImage" />
      </Modal>
      <Modal show={modalOpen} onHide={handleClose}>
        <Form className="p-3">
          <Form.Group>
            <Form.Label>Edit or Add Caption</Form.Label>
            <Row>
              <Col>
                <img
                  src={selectedImg}
                  alt="modal"
                  width="100"
                  className="p-1"
                />
              </Col>
            </Row>

            <Form.Control
              as="textarea"
              type="text"
              defaultValue={imgCaption}
              data-property={selectedImg}
              onChange={handleChange}
            />
            <Button className="m-1" onClick={handleSave}>
              Save
            </Button>
            <Button className="m-1" onClick={handleBlank}>
              No Caption
            </Button>
            <Button className="m-1" onClick={handleClose}>
              Close
            </Button>
          </Form.Group>
        </Form>
        <Row>
          <Col></Col>
        </Row>
      </Modal>
    </div>
  );
};

export default Admin;

import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import useFirestore from "../hooks/useFirestore";
import { motion } from "framer-motion";
import ProfileProgress from "./ProfileProgress";
import { projectStorage } from "../firebase/config";

const UploadProfile = () => {
  const { docs } = useFirestore("pageInfo");
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const types = ["image/png", "image/jpeg"];
  useEffect(() => {
    docs && docs.map((doc) => setUrl(doc.url));
  }, [docs]);
  const handleChange = (e) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select an image file (png or jpeg)");
    }

    const imageRef = projectStorage.refFromURL(url);
    imageRef
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => console.error("Error removing document: ", error));
  };
  return (
    <Container>
      <Row>
        <Col sm={6} className="text-center">
          <motion.label
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            layout="true"
            className="label"
          >
            Upload About Me Picture
            <input className="input" type="file" onChange={handleChange} />
          </motion.label>
        </Col>
        {docs &&
          docs.map((doc) => (
            <Col className="text-center" sm={6} key={doc.id}>
              <img src={doc.url} alt="profile" width="200px" />
            </Col>
          ))}
      </Row>
      <Row>
        <Col xs={12} className="text-center">
          <div className="output">
            {error && <div className="error">{error}</div>}
            {file && <div>{file.name}</div>}
            {file && <ProfileProgress file={file} setFile={setFile} />}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UploadProfile;

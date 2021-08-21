import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Progress from "./Progress";
import { motion } from "framer-motion";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const types = ["image/png", "image/jpeg"];
  const imageCollection = "images";
  const handleChange = (e) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select an image file (png or jpeg)");
    }
  };
  return (
    <Container>
      <Row>
        <Col xs={12} className="text-center">
          <motion.label
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            layout="true"
            className="label"
          >
            Upload Photo to Gallery
            <input className="input" type="file" onChange={handleChange} />
          </motion.label>
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="text-center">
          <div className="output">
            {error && <div className="error">{error}</div>}
            {file && <div>{file.name}</div>}
            {file && (
              <Progress
                file={file}
                setFile={setFile}
                collection={imageCollection}
              />
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UploadForm;

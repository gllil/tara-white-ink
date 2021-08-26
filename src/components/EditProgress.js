import React, { useEffect } from "react";
import { ProgressBar } from "react-bootstrap";
import useStorageEdit from "../hooks/useStorageEdit";

const EditProgress = ({ file, setFile, collection }) => {
  const { url, progress } = useStorageEdit(file, collection);

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);
  return <ProgressBar now={progress} label={`${Math.round(progress)}%`} />;
};

export default EditProgress;

import React, { useEffect } from "react";
import useStorage from "../hooks/useStorage";
import { ProgressBar } from "react-bootstrap";

const Progress = ({ file, setFile, collection }) => {
  const { url, progress } = useStorage(file, collection);

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);
  return <ProgressBar now={progress} label={`${Math.round(progress)}%`} />;
};

export default Progress;

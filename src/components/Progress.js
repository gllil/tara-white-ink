import React, { useEffect } from "react";
import useStorage from "../hooks/useStorage";
import { ProgressBar } from "react-bootstrap";

const Progress = ({ file, setFile }) => {
  const { url, progress } = useStorage(file);

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);
  return <ProgressBar now={progress} label={`${Math.round(progress)}%`} />;
};

export default Progress;

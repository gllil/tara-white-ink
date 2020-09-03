import React, { useEffect } from "react";
import useStoragePage from "../hooks/useStoragePage";
import { ProgressBar } from "react-bootstrap";

const ProfileProgress = ({ file, setFile }) => {
  const { url, progress } = useStoragePage(file);

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);
  return <ProgressBar now={progress} label={`${Math.round(progress)}%`} />;
};

export default ProfileProgress;

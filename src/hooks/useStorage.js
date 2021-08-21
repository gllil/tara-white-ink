import { useState, useEffect, useContext } from "react";
import {
  projectStorage,
  projectFirestore,
  timestamp,
} from "../firebase/config";
import { GlobalContext } from "../globalState/globalState";

const useStorage = (file, collection) => {
  const [state, setState] = useContext(GlobalContext);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const storageRef = projectStorage.ref(file.name);
    const collectionRef = projectFirestore.collection(collection);

    storageRef.put(file).on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        const createdAt = timestamp();

        if (collection === "images") {
          collectionRef.get().then((res) => {
            let num = res.size + 1;
            const newImageData = {
              url: url,
              createdAt: createdAt,
              orderNum: num,
            };

            collectionRef.add(newImageData);

            setUrl(url);
          });
        }

        if (collection === "listings") {
          setState({
            run: true,
            ...state.load,
            formData: {
              ...state.formData,
              url: url,
            },
          });
        }
      }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  return { progress, url, error };
};

export default useStorage;

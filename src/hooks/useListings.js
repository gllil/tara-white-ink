import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

const useListings = (collection) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsub = projectFirestore.collection(collection).onSnapshot((snap) => {
      let documents = [];
      snap.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      setItems(documents);
    });

    return () => unsub();
  }, [collection]);

  return { items };
};

export default useListings;

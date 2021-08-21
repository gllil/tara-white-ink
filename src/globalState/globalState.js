import React, { useState } from "react";

export const GlobalContext = React.createContext();

export const GlobalState = ({ children }) => {
  const [state, setState] = useState({
    run: false,
    load: false,
    formData: {},
  });

  return (
    <GlobalContext.Provider value={[state, setState]}>
      {children}
    </GlobalContext.Provider>
  );
};

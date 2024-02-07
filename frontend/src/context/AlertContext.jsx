import { createContext, useState } from "react";
export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alertState, setAlertState] = useState(null);

  const showAlert = (title, description, alertType, duration) => {
    setAlertState({ title, description, alertType, duration });
  };

  const hideAlert = () => {
    setAlertState(null);
  };

  return (
    <AlertContext.Provider value={{ alertState, showAlert, hideAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

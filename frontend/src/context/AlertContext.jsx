import { createContext, useState } from "react";
export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alertState, setAlertState] = useState(null);

  const showAlert = (description, alertType, duration) => {
    setAlertState({ description, alertType, duration });
    console.log(alertState);
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

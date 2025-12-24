import React, { useContext } from "react";
import './App.css'
import Routes from "./routes.jsx";
import { useState } from "react";
import Toast from "./components/Toast";
import { UserContext } from "./context/UserContext.jsx";

function App() {
  const { toast, setToast } = useContext(UserContext)


  return (
    <div className="App ">
      <div className="relative">
        {toast && (
          <Toast
            message={toast}
            onClose={() => setToast(null)}
          />
        )}
        <Routes />

      </div>

    </div>
  );
}

export default App;

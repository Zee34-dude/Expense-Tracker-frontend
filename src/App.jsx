import React, { useContext } from "react";
import './App.css'
import Routes from "./routes.jsx";
import UserProvider from "./context/UserContext.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { UserContext } from "./context/UserContext.jsx";


function App() {


 
  return (
    <div className="App ">
      <div className="relative">
        <Routes />

      </div>

    </div>
  );
}

export default App;

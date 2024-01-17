import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { dataStore } from "./lib/state_manager/store";
import { Home } from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Provider store={dataStore}>
              <Home />
            </Provider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

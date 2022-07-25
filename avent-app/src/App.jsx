import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <>
      <div className="app">
        <Login />
        <Register />
        <BrowserRouter>
          <main>
            <Routes>
              {/* <Route path="/register" element={<Register />}></Route>
              <Route path="/login" element={<Login />}></Route> */}

              {/*Landing page routes*/}

              {/*Event feed routes */}
            </Routes>
          </main>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

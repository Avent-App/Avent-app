import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import EventFeed from "./components/EventFeed";
import CreateEvent from "./components/CreateEvent";

function App() {
  return (
    <>
      <div className="app">
        <Login />
        <Register />
        <BrowserRouter>
          <main>
            <Routes>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/login" element={<Login />}></Route>

              {/*Landing page routes*/}

              <Route path="/" element={<Landing />} />
              
              {/*Event feed routes*/}
              
              <Route path="/feed" element={<EventFeed />} />
              <Route path="/createEvent" element={<CreateEvent />} />
            </Routes>
          </main>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

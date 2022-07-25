import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <div className="app">
        <BrowserRouter>
          <main>
            <Routes>
              {/* <Route path="/register" element={<Register />}></Route>
              <Route path="/login" element={<Login />}></Route> */}

              {/*Landing page routes*/}

              {/*Event feed routes*/}
            </Routes>
          </main>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

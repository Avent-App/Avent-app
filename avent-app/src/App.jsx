import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import EventFeed from "./components/EventFeed";
import EventDetails from "./components/EventDetails";
import CreateEvent from "./components/CreateEvent";
import NotFound from "./components/NotFound";
import { useState } from "react";

function App() {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <div className="app">
        <BrowserRouter>
          <main>
            <Routes>
              <Route
                path="/register"
                element={<Register user={user} setUser={setUser} isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn} />}
              ></Route>
              <Route
                path="/login"
                element={
                  <Login
                    user={user}
                    setUser={setUser}
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                  />
                }
              ></Route>

              {/*Landing page routes*/}

              <Route path="/" element={<Landing />} />

              {/*Event feed routes*/}

              <Route path="/feed" element={<EventFeed />} />
              <Route path="/details/:eventId" element={<EventDetails />} />
              <Route path="/createEvent" element={<CreateEvent />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

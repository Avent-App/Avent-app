import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import EventFeed from "./components/EventFeed";
import EventDetails from "./components/EventDetails";
import CreateEvent from "./components/CreateEvent";
import NotFound from "./components/NotFound";
import { useState, useEffect } from "react";
import AboutUs from "./components/AboutUs";

import Listings from "./components/Listings";
import Reservations from "./components/Reservations";
import Profile from "./components/Profile";
import apiClient from "./services/apiClient";
import ProfileDetail from "./components/ProfileDetail";
// import { SubHero } from "./components/Landing";

function App() {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function getUserFromToken() {
    if (await apiClient.getToken()) {
      const res = await apiClient.fetchUserFromToken();
      setUser(res.data.user);
    }
  }

  useEffect(() => {
    getUserFromToken();
  }, []);

  return (
    <>
      <div className="app">
        <BrowserRouter>
          <main>
            <Routes>
              <Route
                path="/register"
                element={
                  <Register
                    user={user}
                    setUser={setUser}
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                  />
                }
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

              <Route
                path="/feed"
                element={
                  <EventFeed setUser={setUser} isLoggedIn={isLoggedIn.user} />
                }
              />
              <Route
                path="/details/:eventId"
                element={<EventDetails user={user} />}
              />

              <Route
                path="/createEvent"
                element={<CreateEvent user={user} />}
              />
              <Route path="/aboutUs" element={<AboutUs />} />
              <Route
                path="/settings/profile"
                element={<Profile user={user} setUser={setUser} />}
              />
              <Route
                path="/settings/reservations"
                element={<Reservations user={user} />}
              />
              <Route
                path="/settings/listings"
                element={<Listings user={user} />}
              />
              <Route path="*" element={<NotFound />} />
              <Route
                path="/feed"
                element={
                  <EventFeed
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                  />
                }
              />
              <Route
                path="/details/:eventId"
                element={
                  <EventDetails
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                  />
                }
              />
              <Route
                path="/createEvent"
                element={
                  <CreateEvent
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                  />
                }
              />
              <Route
                path="/aboutUs"
                element={
                  <AboutUs
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                  />
                }
              />
              <Route
                path="*"
                element={
                  <NotFound
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                  />
                }
              />
              <Route
                path="/profiles/:userId"
                element={<ProfileDetail user={user} />}
              />
              {/* <Route path="/profiles" element={<ProfileDetail user={user} />} /> */}
            </Routes>
          </main>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

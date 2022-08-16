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
import ScrollToTop from "./components/ScrollToTop";

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
          <ScrollToTop />
          <main>
            <Routes>
              <Route path="/register" element={<Register user={user} setUser={setUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}></Route>
              <Route path="/login" element={<Login user={user} setUser={setUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}></Route>
              
              {/*Landing page routes*/}

              <Route path="/" element={<Landing />} />

              {/*Event feed routes*/}
              
              <Route
                path="/feed"
                element={
                  <EventFeed setUser={setUser} isLoggedIn={isLoggedIn.user} user={user} />
                }
              />

              <Route path="/settings/profile" element={<Profile user={user} setUser={setUser} />} />
              <Route path="/settings/reservations" element={<Reservations user={user} />} />
              <Route path="/settings/listings" element={<Listings user={user} />} />
              <Route path="/details/:eventId" element={<EventDetails isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user}/>} />
              <Route path="/createEvent" element={<CreateEvent isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user}/>} />
              <Route path="/profile/:userId" element={<ProfileDetail user={user} />} />
              
              <Route path="*" element={<NotFound isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />

            </Routes>
          </main>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

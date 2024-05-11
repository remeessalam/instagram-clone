import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Signup from "./components/signup/signUp";
import HomePage from "./pages/homepage";
import { ProfilePage } from "./pages/profilePage";
import Chatpage from "./pages/chatpage";
import { Showuser } from "./pages/showProfile";
import { GoogleOAuthProvider } from "@react-oauth/google";
import io from "socket.io-client";
function App() {
  const socket = io.connect("http://localhost:4000/");
  // http://localhost:4000
  // https://socket.adidasshoe.shop/
  return (
    <div>
      <GoogleOAuthProvider clientId="117584395273-oljruplarl1md005un2cv7rmkvf11so6.apps.googleusercontent.com">
        <BrowserRouter>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/profile" element={<ProfilePage />} />
            <Route exact path="/chat" element={<Chatpage Socket={socket} />} />
            <Route exact path="/showuser/:id" element={<Showuser />} />
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;

// http://localhost:4000

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Gigs from "./pages/Gigs";
import Messages from "./pages/Messages";
import Wallet from "./pages/Wallet";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
export default function App() {
import GigDetails from "./pages/GigDetails.jsx";
  return (
    <Router>
      <Navbar />
      <div className="pt-20"> {/* Navbar height ka space */}
        <Routes>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gig/:id" element={<GigDetails />} />
        </Routes>
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/" element={<Home />} />
          <Route path="/gigs" element={<Gigs />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

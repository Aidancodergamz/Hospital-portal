import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import './App.css';
import './css/home.css';
import Navigation from './includes/Navigation';
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserDash from "./pages/UserDash";
import PrivateRoute from "./PrivateRoute";
import LoggedInNav from "./includes/LoggedInNav";
import Games from "./pages/Games";

function Layout({ children }) {
  const location = useLocation();
  const hideNavbar = location.pathname === "/userdash" || location.pathname === "/games"; // Hide Navigation for UserDash and Games

  return (
    <div>
      {!hideNavbar && <Navigation />}
      {children}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userdash" element={<UserDash />} />
          <Route path="/loggedinnav" element={<LoggedInNav />} />
          <Route path="/games" element={<Games />} />
          <Route element={<PrivateRoute />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

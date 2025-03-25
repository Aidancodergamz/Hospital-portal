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
import InteractiveMap from "./pages/InteractiveMap";
import Department from "./pages/Department";

function Layout({ children }) {
  const location = useLocation();
  const hideNavbar = location.pathname === "/userdash" || location.pathname === "/games" || location.pathname === "/interactiveMap" || location.pathname === "/department"; // This hides the navigation bar for those logged in and replaces it with a side navigation bar tailored for logged in users.

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
          <Route path="/interactiveMap" element={<InteractiveMap />} />
          <Route path="/department" element={<Department />} />
          <Route element={<PrivateRoute />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import './css/home.css';
import Navigation from './includes/Navigation';
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <Router> 
      <Navigation /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

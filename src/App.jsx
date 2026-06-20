// import logo from "./logo.svg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashborad from "./pages/Dashborad";
import ProtectedLayout from "./config/ProtectedLayout";
import ProtectedRoute from "./config/ProtectedRoute";
import NavBar from "./components/NavBar";
import AddTask from "./pages/AddTask";
import Analytics from "./pages/Analytics";
// import AddProduct from "./pages/AddProduct";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route element={<ProtectedRoute />}>
          <Route element={<ProtectedLayout />}>
            <Route path="/add-task" element={<AddTask />} />
            <Route path="/dashboard" element={<Dashborad />} />
            <Route path="/analytics" element={<Analytics />} />
            {/* // Add routes like below exaple */}
            {/* <Route path="/chat" element={<Chat />} /> */}
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

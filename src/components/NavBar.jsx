import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { FaHome, FaPlusCircle, FaTasks, FaSignOutAlt } from "react-icons/fa";

const NavBar = () => {

  const handleLogout = () => {
    if(window.confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      window.location.href = "/"; // Redirect to login page after logout
    }
  };
  return (
    <Navbar
      collapseOnSelect
      expand="md"
      bg="dark"
      variant="dark"
      className="shadow-sm py-2 px-3 sticky-top"
    >
      <Container fluid>
        <Navbar.Brand
          href="/dashboard"
          className="fw-bold d-flex align-items-center gap-2"
        >
          <span className="text-info font-monospace">✔</span> TaskManager
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto my-2 my-md-0 gap-1">
            <Nav.Link
              href="/dashboard"
              className="d-flex align-items-center gap-2 px-3 rounded text-light-50"
            >
              <FaHome size={18} className="text-info" />
              <span>Home</span>
            </Nav.Link>

            <Nav.Link
              href="/add-task"
              className="d-flex align-items-center gap-2 px-3 rounded text-light-50"
            >
              <FaPlusCircle size={18} className="text-info" />
              <span>Add Task</span>
            </Nav.Link>
            
            <Nav.Link
              href="/analytics"
              className="d-flex align-items-center gap-2 px-3 rounded text-light-50"
            >
              <svg
                className="text-info"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z" />
              </svg>
              <span>Analytics</span>
            </Nav.Link>
          </Nav>

          <Nav className="ms-auto pt-2 pt-md-0">
            <Button
              onClick={handleLogout}
              variant="outline-danger"
              className="d-flex align-items-center gap-2 px-3 py-1.5 fw-medium w-100 w-md-auto justify-content-center"
            >
              <FaSignOutAlt size={16} />
              <span>Logout</span>
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

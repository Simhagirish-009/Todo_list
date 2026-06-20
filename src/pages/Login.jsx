import React, { useState } from "react";
import { Form, Button, Card, Spinner } from "react-bootstrap"; // Imported Spinner
import "../styles/form-styles.css";
import { login } from "../services/user_api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import Toastify

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Enabled loading state

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Turn on the spinner immediately upon form submission

    try {
      const data = { email, password };
      const response = await login(data);
      console.log("Login response:", response.data); // Debugging log

      localStorage.clear(); // Clear any previous data
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      toast.success(
        response.data.message || "Login successful! Please verify OTP.",
      ); // Show success toast

      setTimeout(() => {
        setLoading(false); // Clear the loading state before changing views
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      setLoading(false); // Turn off the spinner if an error occurs so the user can try again
      alert(
        err.response?.data?.message ||
          "An error occurred during login. Please try again.",
      );
    }

    console.log("Logging in with:", { email, password });
  };

  return (
    <div className="form-background">
      <div className="form-container">
        <Card className="form-card animate__animated animate__fadeIn">
          <Card.Header className="bg-transparent border-0 text-center">
            <Card.Title as="h2">Login</Card.Title><br/>
            <h6 className="animate__animated animate__fadeIn">Welcome to Todo List Application</h6>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              {/* Email Group */}
              <Form.Group className="mb-3" controlId="loginEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading} // Freeze inputs while sending data
                />
              </Form.Group>

              {/* Password Group */}
              <Form.Group className="mb-4" controlId="loginPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading} // Freeze inputs while sending data
                />
              </Form.Group>

              {/* Submit Button with Dynamic Spinner layout */}
              <div className="d-grid">
                <Button
                  variant="primary"
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="d-flex align-items-center justify-content-center"
                >
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Verifying...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </div>
              <br />

              {/* Context Links disabled dynamically while submitting */}
              <Form.Group>
                <Button variant="link" href="/emailverify/" disabled={loading}>
                  Forgotten Password
                </Button>
              </Form.Group>
              <Form.Group>
                <Button variant="link" href="/register/" disabled={loading}>
                  Don't have an account? Register here
                </Button>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Login;

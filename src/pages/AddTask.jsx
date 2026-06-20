import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Card,
  Row,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";
import { FaPlusCircle, FaArrowLeft } from "react-icons/fa";
import { createTask } from "../services/task_api";

export default function AddTask() {
  // Initial empty form state matching your Django Model choices
  const initialFormState = {
    title: "",
    description: "",
    status: "TODO",
    priority: "MEDIUM",
    due_date: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Handle input changes dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Form Submission Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      // Format the data before sending (convert empty string due_date to null for Django)
      const submissionData = {
        ...formData,
        due_date: formData.due_date
          ? new Date(formData.due_date).toISOString()
          : null,
      };

      await createTask(submissionData);

      setMessage({ type: "success", text: "Task created successfully!" });
      setFormData(initialFormState); // Reset form on success
    } catch (error) {
      setMessage({
        type: "danger",
        text: error.response?.data
          ? JSON.stringify(error.response.data)
          : "Failed to create task.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5 d-flex justify-content-center">
      <Card className="shadow-sm border-0 w-100" style={{ maxWidth: "650px" }}>
        <Card.Body className="p-4 sm:p-5">
          {/* Header */}
          <div className="d-flex align-items-center gap-2 mb-4">
            <FaPlusCircle className="text-info" size={24} />
            <h2 className="fw-bold text-dark mb-0">Create New Task</h2>
          </div>

          {/* Feedback Alerts */}
          {message.text && (
            <Alert
              variant={message.type}
              onClose={() => setMessage({ type: "", text: "" })}
              dismissible
            >
              {message.text}
            </Alert>
          )}

          {/* Form */}
          <Form onSubmit={handleSubmit}>
            {/* Title */}
            <Form.Group className="mb-3" controlId="taskTitle">
              <Form.Label className="fw-medium text-secondary">
                Task Title *
              </Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="What needs to be done?"
                value={formData.title}
                onChange={handleChange}
                required
                maxLength={255}
              />
            </Form.Group>

            {/* Description */}
            <Form.Group className="mb-3" controlId="taskDescription">
              <Form.Label className="fw-medium text-secondary">
                Description
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                placeholder="Add details about this task..."
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Row className="g-3 mb-4">
              {/* Status Select */}
              <Col xs={12} sm={6}>
                <Form.Group controlId="taskStatus">
                  <Form.Label className="fw-medium text-secondary">
                    Status
                  </Form.Label>
                  <Form.Select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="TODO">To Do</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              {/* Priority Select */}
              <Col xs={12} sm={6}>
                <Form.Group controlId="taskPriority">
                  <Form.Label className="fw-medium text-secondary">
                    Priority
                  </Form.Label>
                  <Form.Select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              {/* Due Date Picker */}
              <Col xs={12}>
                <Form.Group controlId="taskDueDate">
                  <Form.Label className="fw-medium text-secondary">
                    Due Date & Time
                  </Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="due_date"
                    value={formData.due_date}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Action Buttons */}
            <div className="d-flex justify-content-between align-items-center pt-2 border-top">
              <Button
                href="#home"
                variant="outline-secondary"
                className="d-flex align-items-center gap-2"
              >
                <FaArrowLeft size={12} /> Back
              </Button>

              <Button
                variant="primary"
                type="submit"
                disabled={loading}
                className="px-4 fw-medium"
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Saving...
                  </>
                ) : (
                  "Save Task"
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

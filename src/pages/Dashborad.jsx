import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Spinner,
  Alert,
  Button,
  Form,
} from "react-bootstrap";
import {
  FaCheckCircle,
  FaClock,
  FaPlayCircle, // Added this
  FaExclamationTriangle,
  FaTrash,
  FaFilter,
} from "react-icons/fa";
import { getTasks, updateTask, deleteTask } from "../services/task_api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter States
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [dateFilter, setDateFilter] = useState(""); // Stores 'YYYY-MM-DD'

  // 1. Fetch tasks from Django backend on mount
  useEffect(() => {
    const fetchTasksData = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        setError(
          "Failed to load tasks. Please verify your connection or login status.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTasksData();
  }, []);

const handleToggleStatus = async (task) => {
  // Cycle logic: TODO -> IN_PROGRESS -> COMPLETED -> TODO
  let newStatus = "TODO";
  if (task.status === "TODO") newStatus = "IN_PROGRESS";
  else if (task.status === "IN_PROGRESS") newStatus = "COMPLETED";

  try {
    // Optimistically update the UI
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === task.id ? { ...t, status: newStatus } : t,
      ),
    );
    await updateTask(task.id, { status: newStatus });
  } catch (err) {
    setError("Could not update task status. Reverting changes.");
    const freshTasks = await getTasks();
    setTasks(freshTasks);
  }
};
  // 3. Handler to delete a task
  const handleDeleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));
      await deleteTask(id);
    } catch (err) {
      setError("Failed to delete the task. Try again later.");
      const freshTasks = await getTasks();
      setTasks(freshTasks);
    }
  };

  // 4. Client-side filtration compute block
  const filteredTasks = tasks.filter((task) => {
    // Priority Match
    const matchesPriority =
      priorityFilter === "ALL" || task.priority === priorityFilter;

    // Status Match
    const matchesStatus =
      statusFilter === "ALL" || task.status === statusFilter;

    // Due Date Match (Compares the local formatted date part only)
    let matchesDate = true;
    if (dateFilter && task.due_date) {
      const taskDateString = new Date(task.due_date)
        .toISOString()
        .split("T")[0];
      matchesDate = taskDateString === dateFilter;
    } else if (dateFilter && !task.due_date) {
      matchesDate = false; // Filter explicitly requested a date, but task doesn't have one
    }

    return matchesPriority && matchesStatus && matchesDate;
  });

  // Helper for Priority Badge colors
  const getPriorityVariant = (priority) => {
    switch (priority) {
      case "HIGH":
        return "danger";
      case "MEDIUM":
        return "warning";
      default:
        return "primary";
    }
  };

  // Reset Filters utility
  const handleResetFilters = () => {
    setPriorityFilter("ALL");
    setStatusFilter("ALL");
    setDateFilter("");
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
        <span className="ms-2 text-muted">Loading Dashboard...</span>
      </div>
    );
  }

  return (
    <Container className="py-5">
      <header className="mb-4">
        <h1 className="fw-bold text-dark">My Task Dashboard</h1>
        <p className="text-muted">Stay organized and track your progress.</p>
      </header>

      {error && (
        <Alert
          variant="danger"
          onClose={() => setError(null)}
          dismissible
          className="mb-4"
        >
          {error}
        </Alert>
      )}

      {/* --- Filter Bar Section --- */}
      <Card className="mb-4 border-0 shadow-sm bg-white">
        <Card.Body className="p-3">
          <Row className="g-3 align-items-end">
            <Col xs={12} md={3}>
              <Form.Group controlId="filterStatus">
                <Form.Label className="small fw-semibold text-secondary d-flex align-items-center gap-1">
                  <FaFilter size={10} /> Status
                </Form.Label>
                <Form.Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="form-select-sm"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="TODO">To Do</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={12} md={3}>
              <Form.Group controlId="filterPriority">
                <Form.Label className="small fw-semibold text-secondary">
                  Priority
                </Form.Label>
                <Form.Select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="form-select-sm"
                >
                  <option value="ALL">All Priorities</option>
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={12} md={3}>
              <Form.Group controlId="filterDate">
                <Form.Label className="small fw-semibold text-secondary">
                  Due On Date
                </Form.Label>
                <Form.Control
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="form-control-sm"
                />
              </Form.Group>
            </Col>

            <Col xs={12} md={3} className="text-md-end">
              {(priorityFilter !== "ALL" ||
                statusFilter !== "ALL" ||
                dateFilter !== "") && (
                <Button
                  variant="link"
                  size="sm"
                  onClick={handleResetFilters}
                  className="text-decoration-none text-danger p-0 mb-1"
                >
                  Clear Filters
                </Button>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* --- Task Cards Rendering Grid --- */}
      {/* --- Task Cards Rendering Grid --- */}
      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredTasks.map((task) => {
          const isCompleted = task.status === "COMPLETED";
          const isInProgress = task.status === "IN_PROGRESS";

          // Dynamically compute the left border color
          let borderLeftColor = "5px solid #dc3545"; // Default: Red for TODO
          if (isInProgress) borderLeftColor = "5px solid #ffc107"; // Yellow/Warning
          if (isCompleted) borderLeftColor = "5px solid #198754"; // Green/Success

          return (
            <Col key={task.id}>
              <Card
                className="h-100 shadow-sm border-0"
                style={{ borderLeft: borderLeftColor }}
              >
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
                      <Card.Title
                        className={`mb-0 fw-semibold ${isCompleted ? "text-decoration-line-through text-muted" : ""}`}
                      >
                        {task.title}
                      </Card.Title>

                      {/* Interactive Button showing distinct icons for 3 states */}
                      <button
                        onClick={() => handleToggleStatus(task)}
                        className="btn btn-link p-0 border-0"
                        style={{
                          fontSize: "1.4rem",
                          cursor: "pointer",
                          lineHeight: 1,
                        }}
                        title={`Current Status: ${task.status}. Click to change.`}
                      >
                        {isCompleted && (
                          <FaCheckCircle className="text-success" />
                        )}
                        {isInProgress && (
                          <FaPlayCircle className="text-warning" />
                        )}
                        {task.status === "TODO" && (
                          <FaClock className="text-danger" />
                        )}
                      </button>
                    </div>

                    <Card.Text
                      className={`text-secondary small ${isCompleted ? "text-muted" : ""}`}
                    >
                      {task.description || "No description provided."}
                    </Card.Text>
                  </div>

                  <div className="mt-4 pt-3 border-top d-flex justify-content-between align-items-center text-muted small">
                    <div className="d-flex align-items-center gap-2">
                      <Badge
                        bg={getPriorityVariant(task.priority)}
                        className="text-uppercase"
                      >
                        {task.priority}
                      </Badge>

                      {task.due_date && (
                        <span className="d-flex align-items-center gap-1 text-nowrap">
                          <FaExclamationTriangle size={12} />
                          Due: {new Date(task.due_date).toLocaleDateString()}
                        </span>
                      )}
                    </div>

                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="border-0 p-1 line-height-1"
                      onClick={() => handleDeleteTask(task.id)}
                      title="Delete Task"
                    >
                      <FaTrash size={14} />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      {/* Empty State Handlers */}
      {filteredTasks.length === 0 && !error && (
        <div className="text-center py-5 border border-dashed rounded text-muted bg-white">
          {tasks.length > 0
            ? "No tasks match your current criteria. Try adjusting the filters!"
            : "No tasks found. Create one to get started!"}
        </div>
      )}
    </Container>
  );
}

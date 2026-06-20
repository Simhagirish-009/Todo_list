import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import {
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaExclamationCircle,
} from "react-icons/fa";
import { getTasks } from "../services/task_api";

// Chart.js registration components
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
);

export default function Analytics() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        setError("Failed to load analytics data.");
      } finally {
        setLoading(false);
      }
    };
    fetchAnalyticsData();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="info" />
        <span className="ms-2 text-muted">Calculating metrics...</span>
      </div>
    );
  }

  // --- Data Crunching ---
  const totalTasks = tasks.length;

  const statusCounts = { TODO: 0, IN_PROGRESS: 0, COMPLETED: 0 };
  const priorityCounts = { HIGH: 0, MEDIUM: 0, LOW: 0 };

  tasks.forEach((task) => {
    if (statusCounts[task.status] !== undefined) statusCounts[task.status]++;
    if (priorityCounts[task.priority] !== undefined)
      priorityCounts[task.priority]++;
  });

  const completionRate =
    totalTasks > 0
      ? Math.round((statusCounts.COMPLETED / totalTasks) * 100)
      : 0;

  // --- Chart Configurations ---
  const doughnutData = {
    labels: ["To Do", "In Progress", "Completed"],
    datasets: [
      {
        data: [
          statusCounts.TODO,
          statusCounts.IN_PROGRESS,
          statusCounts.COMPLETED,
        ],
        backgroundColor: ["#0dcaf0", "#ffc107", "#198754"],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: ["Low", "Medium", "High"],
    datasets: [
      {
        label: "Number of Tasks",
        data: [priorityCounts.LOW, priorityCounts.MEDIUM, priorityCounts.HIGH],
        backgroundColor: ["#0d6efd", "#fd7e14", "#dc3545"],
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } },
  };

  return (
    <Container className="py-5">
      <header className="mb-4">
        <h1 className="fw-bold text-dark">Performance Analytics</h1>
        <p className="text-muted">
          A visual breakdown of your task completion and distribution.
        </p>
      </header>

      {error && <Alert variant="danger">{error}</Alert>}

      {/* --- Metric Overview Cards --- */}
      <Row className="g-4 mb-5">
        <Col xs={12} sm={6} lg={3}>
          <Card className="border-0 shadow-sm bg-white h-100">
            <Card.Body className="d-flex align-items-center justify-content-between">
              <div>
                <h6 className="text-muted uppercase small mb-1">Total Tasks</h6>
                <h3 className="fw-bold m-0">{totalTasks}</h3>
              </div>
              <FaTasks className="text-secondary" size={30} />
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} lg={3}>
          <Card className="border-0 shadow-sm bg-white h-100 border-start border-success border-4">
            <Card.Body className="d-flex align-items-center justify-content-between">
              <div>
                <h6 className="text-muted uppercase small mb-1">Completed</h6>
                <h3 className="fw-bold text-success m-0">
                  {statusCounts.COMPLETED}
                </h3>
              </div>
              <FaCheckCircle className="text-success" size={30} />
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} lg={3}>
          <Card className="border-0 shadow-sm bg-white h-100 border-start border-warning border-4">
            <Card.Body className="d-flex align-items-center justify-content-between">
              <div>
                <h6 className="text-muted uppercase small mb-1">In Progress</h6>
                <h3 className="fw-bold text-warning m-0">
                  {statusCounts.IN_PROGRESS}
                </h3>
              </div>
              <FaClock className="text-warning" size={30} />
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} lg={3}>
          <Card className="border-0 shadow-sm bg-white h-100 bg-light">
            <Card.Body className="d-flex flex-column justify-content-center text-center">
              <h6 className="text-muted uppercase small mb-1">
                Completion Rate
              </h6>
              <h2 className="fw-extrabold text-info m-0">{completionRate}%</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* --- Visual Charts Grid --- */}
      {totalTasks > 0 ? (
        <Row className="g-4">
          <Col xs={12} lg={5}>
            <Card className="border-0 shadow-sm p-3 h-100">
              <Card.Body>
                <Card.Title className="fw-bold mb-4 text-secondary small text-uppercase">
                  Task Status Split
                </Card.Title>
                <div
                  style={{
                    maxHeight: "280px",
                    position: "relative",
                    margin: "auto",
                  }}
                >
                  <Doughnut
                    data={doughnutData}
                    options={{ responsive: true, maintainAspectRatio: false }}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} lg={7}>
            <Card className="border-0 shadow-sm p-3 h-100">
              <Card.Body>
                <Card.Title className="fw-bold mb-4 text-secondary small text-uppercase">
                  Tasks by Priority Volume
                </Card.Title>
                <Bar data={barData} options={barOptions} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <div className="text-center py-5 text-muted bg-white border border-dashed rounded">
          Add some tasks first to populate the productivity graphs!
        </div>
      )}
    </Container>
  );
}

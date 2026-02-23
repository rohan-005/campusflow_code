import { Link } from "react-router-dom";
import {
  FiMonitor,
  FiBookOpen,
  FiCheckCircle,
  FiShield
} from "react-icons/fi";
import "../styles/landing.css";

const Landing = () => {
  const features = [
    {
      icon: <FiMonitor />,
      title: "Asset Tracking",
      description:
        "Real-time tracking of labs, classrooms, and equipment with automated check-in/out"
    },
    {
      icon: <FiBookOpen />,
      title: "Digital Repository",
      description:
        "Centralized storage for notes and study materials with moderation"
    },
    {
      icon: <FiCheckCircle />,
      title: "Approval Workflows",
      description:
        "Multi-step verification system for resource requests and uploads"
    },
    {
      icon: <FiShield />,
      title: "Access Control",
      description:
        "Role-based permissions for students and administrators"
    }
  ];

  return (
    <div className="landing-container">
      <header className="landing-header">
        <div className="logo-container">
          <div className="logo-icon">CF</div>
          <span className="logo-text">CampusFlow</span>
        </div>
      </header>

      <main className="landing-main">
        <div className="hero-section">
          <h1 className="hero-title">
            Centralized Campus Resource Management
          </h1>

          <p className="hero-subtitle">
            A unified platform for managing assets, digital resources,
            and structured approval workflows.
          </p>

          <div className="hero-buttons">
            <Link to="/login" className="btn-outline large">
              Login
            </Link>
            <Link to="/register" className="btn-primary large">
              Register
            </Link>
          </div>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon-wrapper">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="landing-footer">
        © 2026 CampusFlow. Institutional Access Only.
      </footer>
    </div>
  );
};

export default Landing;
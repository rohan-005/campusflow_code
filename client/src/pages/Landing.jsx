import { Link } from "react-router-dom";
import { 
  FiMonitor, 
  FiBookOpen, 
  FiCheckCircle, 
  FiShield,
  FiArrowRight
} from "react-icons/fi";
import "../styles/landing.css";

const Landing = () => {
  const features = [
    {
      icon: <FiMonitor className="feature-icon" />,
      title: "Asset Tracking",
      description: "Real-time tracking of labs, classrooms, and equipment with automated check-in/out"
    },
    {
      icon: <FiBookOpen className="feature-icon" />,
      title: "Digital Repository",
      description: "Centralized storage for notes, study materials with version control and moderation"
    },
    {
      icon: <FiCheckCircle className="feature-icon" />,
      title: "Approval Workflows",
      description: "Multi-step verification system for all resource requests and content uploads"
    },
    {
      icon: <FiShield className="feature-icon" />,
      title: "Access Control",
      description: "Role-based permissions for students, faculty, and administrative staff"
    }
  ];

  return (
    <div className="landing-container">
      {/* Header with logo */}
      <header className="landing-header">
        <div className="logo-container">
          <div className="logo-icon">
            <span className="logo-dot"></span>
          </div>
          <span className="logo-text">CampusFlow</span>
        </div>
      </header>

      {/* Main content */}
      <main className="landing-main">
        {/* Hero section */}
        <div className="hero-section">
          <h1 className="hero-title">
            Centralized Campus Resource Management
          </h1>

          <p className="hero-subtitle">
            A unified platform for managing physical assets, digital resources, 
            and approval workflows across your institution.
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

        {/* Features section */}
        <div className="features-section">
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon-wrapper">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <div className="feature-hover-effect"></div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Simple footer */}
      <footer className="landing-footer">
        <p>© 2024 CampusFlow. Institutional access only.</p>
      </footer>
    </div>
  );
};

export default Landing;
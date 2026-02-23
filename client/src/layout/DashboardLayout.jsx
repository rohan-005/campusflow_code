import Navbar from "../components/Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9" }}>
      <Navbar />

      <div
        style={{
          padding: "30px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
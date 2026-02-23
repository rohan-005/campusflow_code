import Navbar from "../components/Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div style={{ minHeight: "100vh" }}>
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
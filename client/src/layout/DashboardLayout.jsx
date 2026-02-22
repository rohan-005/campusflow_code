    import Navbar from "../components/Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div style={{ padding: 20 }}>{children}</div>
    </div>
  );
};

export default DashboardLayout;
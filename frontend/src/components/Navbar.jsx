import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>🤖 AI Resume Analyzer</div>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    backgroundColor: "#1a1a2e",
    color: "white",
    width: "100%",
    boxSizing: "border-box",
  },
  logo: {
    fontSize: "1.4rem",
    fontWeight: "bold",
    color: "#e94560",
  },
  links: {
    display: "flex",
    gap: "20px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "1rem",
  },
};

export default Navbar;
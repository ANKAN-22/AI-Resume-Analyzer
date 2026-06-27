import UploadForm from "../components/UploadForm";

function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.heading}>AI Resume Analyzer</h1>
        <p style={styles.subheading}>
          Upload your resume and a job description to get your ATS score,
          missing skills, and AI-powered suggestions.
        </p>
      </div>
      <UploadForm />
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#0f3460",
    paddingBottom: "40px",
  },
  hero: {
    textAlign: "center",
    padding: "50px 20px 20px",
    color: "white",
  },
  heading: {
    fontSize: "2.5rem",
    color: "#e94560",
    marginBottom: "15px",
  },
  subheading: {
    fontSize: "1.1rem",
    color: "#a8b2d8",
    maxWidth: "600px",
    margin: "0 auto",
  },
};

export default Home;
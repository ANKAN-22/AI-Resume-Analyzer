import { useLocation, useNavigate } from "react-router-dom";
import AtsScore from "../components/AtsScore";
import MissingSkills from "../components/MissingSkills";
import SkillsChart from "../components/SkillsChart";

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { extracted_info, match_result } = location.state || {};

  if (!extracted_info || !match_result) {
    return (
      <div style={styles.noData}>
        <h2>No results found.</h2>
        <p>Please upload a resume first.</p>
        <button onClick={() => navigate("/")} style={styles.button}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Resume Analysis Results</h2>

      {/* Candidate Info */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Candidate Information</h3>
        <p><span style={styles.label}>Name:</span> {extracted_info.name || "N/A"}</p>
        <p><span style={styles.label}>Email:</span> {extracted_info.email || "N/A"}</p>
        <p><span style={styles.label}>Phone:</span> {extracted_info.phone || "N/A"}</p>
        <p><span style={styles.label}>Education:</span> {extracted_info.education?.join(", ") || "N/A"}</p>
        <p><span style={styles.label}>Experience:</span> {extracted_info.experience?.join(", ") || "N/A"}</p>
      </div>

      {/* ATS Score */}
      <AtsScore score={match_result.ats_score} />

      {/* Skills Analysis */}
      <MissingSkills
        matchedSkills={match_result.matched_skills}
        missingSkills={match_result.missing_skills}
      />

      {/* Skills Chart */}
      <SkillsChart skills={extracted_info.skills} />

      {/* Matched Keywords */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Matched Keywords</h3>
        <div style={styles.tagsContainer}>
          {match_result.matched_keywords.map((keyword, index) => (
            <span key={index} style={styles.keywordTag}>
              {keyword}
            </span>
          ))}
        </div>
      </div>

      <button onClick={() => navigate("/")} style={styles.button}>
        Analyze Another Resume
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "40px auto",
    padding: "0 20px 40px",
    color: "white",
  },
  heading: {
    fontSize: "2rem",
    color: "#e94560",
    marginBottom: "25px",
    textAlign: "center",
  },
  card: {
    padding: "20px",
    backgroundColor: "#16213e",
    borderRadius: "12px",
    marginBottom: "20px",
    color: "white",
    lineHeight: "1.8",
  },
  cardTitle: {
    fontSize: "1.4rem",
    marginBottom: "15px",
    color: "#a8b2d8",
  },
  label: {
    color: "#e94560",
    fontWeight: "bold",
    marginRight: "8px",
  },
  tagsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  keywordTag: {
    padding: "6px 14px",
    backgroundColor: "#0f3460",
    color: "#a8b2d8",
    borderRadius: "20px",
    fontSize: "0.9rem",
  },
  noData: {
    textAlign: "center",
    color: "white",
    padding: "60px 20px",
  },
  button: {
    display: "block",
    margin: "30px auto 0",
    padding: "14px 30px",
    backgroundColor: "#e94560",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
  },
};

export default Results;
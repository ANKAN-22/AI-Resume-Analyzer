function AtsScore({ score }) {
  const getColor = (score) => {
    if (score >= 75) return "#2ecc71";
    if (score >= 50) return "#f39c12";
    return "#e94560";
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>ATS Match Score</h3>
      <div style={styles.scoreCircle(getColor(score))}>
        <span style={styles.scoreText}>{score}%</span>
      </div>
      <p style={styles.label}>
        {score >= 75
          ? "Great match! Your resume fits well."
          : score >= 50
          ? "Average match. Consider adding missing skills."
          : "Low match. Update your resume to improve chances."}
      </p>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#16213e",
    borderRadius: "12px",
    marginBottom: "20px",
    color: "white",
  },
  title: {
    fontSize: "1.4rem",
    marginBottom: "20px",
    color: "#a8b2d8",
  },
  scoreCircle: (color) => ({
    width: "140px",
    height: "140px",
    borderRadius: "50%",
    border: `8px solid ${color}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px",
  }),
  scoreText: {
    fontSize: "2.2rem",
    fontWeight: "bold",
    color: "white",
  },
  label: {
    fontSize: "1rem",
    color: "#a8b2d8",
  },
};

export default AtsScore;
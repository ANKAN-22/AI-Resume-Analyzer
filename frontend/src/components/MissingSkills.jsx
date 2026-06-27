function MissingSkills({ matchedSkills, missingSkills }) {
  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Skills Analysis</h3>

      <div style={styles.section}>
        <h4 style={styles.matched}>✅ Matched Skills</h4>
        <div style={styles.tagsContainer}>
          {matchedSkills.length > 0 ? (
            matchedSkills.map((skill, index) => (
              <span key={index} style={styles.matchedTag}>
                {skill}
              </span>
            ))
          ) : (
            <p style={styles.empty}>No matched skills found.</p>
          )}
        </div>
      </div>

      <div style={styles.section}>
        <h4 style={styles.missing}>❌ Missing Skills</h4>
        <div style={styles.tagsContainer}>
          {missingSkills.length > 0 ? (
            missingSkills.map((skill, index) => (
              <span key={index} style={styles.missingTag}>
                {skill}
              </span>
            ))
          ) : (
            <p style={styles.empty}>No missing skills! Great job.</p>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
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
  section: {
    marginBottom: "20px",
  },
  matched: {
    color: "#2ecc71",
    marginBottom: "10px",
  },
  missing: {
    color: "#e94560",
    marginBottom: "10px",
  },
  tagsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  matchedTag: {
    padding: "6px 14px",
    backgroundColor: "#1a5c38",
    color: "#2ecc71",
    borderRadius: "20px",
    fontSize: "0.9rem",
  },
  missingTag: {
    padding: "6px 14px",
    backgroundColor: "#5c1a1a",
    color: "#e94560",
    borderRadius: "20px",
    fontSize: "0.9rem",
  },
  empty: {
    color: "#a8b2d8",
    fontSize: "0.95rem",
  },
};

export default MissingSkills;
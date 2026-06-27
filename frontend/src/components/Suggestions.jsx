function Suggestions({ suggestions }) {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>💡 Resume Improvement Suggestions</h3>
      <ul style={styles.list}>
        {suggestions.map((suggestion, index) => (
          <li key={index} style={styles.item}>
            <span style={styles.bullet}>→</span>
            {suggestion}
          </li>
        ))}
      </ul>
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
    marginBottom: "15px",
    color: "#a8b2d8",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  item: {
    display: "flex",
    gap: "10px",
    padding: "10px 0",
    borderBottom: "1px solid #0f3460",
    fontSize: "0.95rem",
    lineHeight: "1.5",
  },
  bullet: {
    color: "#e94560",
    fontWeight: "bold",
    flexShrink: 0,
  },
};

export default Suggestions;
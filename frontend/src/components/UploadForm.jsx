import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UploadForm() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jdText, setJdText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!resumeFile) {
      setError("Please upload a resume file.");
      return;
    }
    if (!jdText.trim()) {
      setError("Please enter a job description.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Step 1: Upload resume
      const formData = new FormData();
      formData.append("resume", resumeFile);

      const uploadResponse = await axios.post(
        "https://ai-resume-analyzer-b21q.onrender.com/upload",
        formData
      );

      const extractedInfo = uploadResponse.data.extracted_info;

      // Step 2: Match with JD
      const matchResponse = await axios.post(
        "https://ai-resume-analyzer-b21q.onrender.com/match",
        {
          resume_info: extractedInfo,
          jd_text: jdText,
        }
      );

      // Step 3: Navigate to results
      navigate("/results", {
        state: {
          extracted_info: extractedInfo,
          match_result: matchResponse.data.match_result,
          suggestions: matchResponse.data.suggestions,
          ai_summary: matchResponse.data.ai_summary,
          cover_letter: matchResponse.data.cover_letter,
        },
      });
    } catch (err) {
      setError("Something went wrong. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Upload Your Resume</h2>

      <div style={styles.section}>
        <label style={styles.label}>Resume (PDF or DOCX)</label>
        <input
          type="file"
          accept=".pdf,.docx"
          onChange={(e) => setResumeFile(e.target.files[0])}
          style={styles.fileInput}
        />
      </div>

      <div style={styles.section}>
        <label style={styles.label}>Job Description</label>
        <textarea
          rows={8}
          placeholder="Paste the job description here..."
          value={jdText}
          onChange={(e) => setJdText(e.target.value)}
          style={styles.textarea}
        />
      </div>

      {error && <p style={styles.error}>{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={styles.button}
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "700px",
    margin: "40px auto",
    padding: "30px",
    backgroundColor: "#16213e",
    borderRadius: "12px",
    color: "white",
  },
  title: {
    fontSize: "1.8rem",
    marginBottom: "25px",
    color: "#e94560",
  },
  section: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "1rem",
    color: "#a8b2d8",
  },
  fileInput: {
    color: "white",
    fontSize: "0.95rem",
  },
  textarea: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #a8b2d8",
    backgroundColor: "#0f3460",
    color: "white",
    fontSize: "0.95rem",
    resize: "vertical",
    boxSizing: "border-box",
  },
  error: {
    color: "#e94560",
    marginBottom: "10px",
  },
  button: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#e94560",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1.1rem",
    cursor: "pointer",
  },
};

export default UploadForm;
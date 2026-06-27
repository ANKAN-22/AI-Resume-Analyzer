from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from resume_parser.parser import parse_resume, extract_all
from resume_parser.matcher import calculate_ats_score
from database import save_analysis, get_all_analyses
import os
from datetime import datetime, timezone

load_dotenv()

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "message": "AI Resume Analyzer backend is running!"})

@app.route("/upload", methods=["POST"])
def upload_resume():
    if "resume" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["resume"]

    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    allowed_extensions = {".pdf", ".docx"}
    ext = os.path.splitext(file.filename)[1].lower()

    if ext not in allowed_extensions:
        return jsonify({"error": "Only PDF and DOCX files are allowed"}), 400

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    extracted_text = parse_resume(file_path)

    if extracted_text is None:
        return jsonify({"error": "Could not parse resume"}), 500

    extracted_info = extract_all(extracted_text)

    return jsonify({
        "message": "Resume uploaded and parsed successfully",
        "filename": file.filename,
        "extracted_text": extracted_text,
        "extracted_info": extracted_info
    })

@app.route("/match", methods=["POST"])
def match_resume():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400

    if "resume_info" not in data:
        return jsonify({"error": "No resume info provided"}), 400

    if "jd_text" not in data:
        return jsonify({"error": "No job description provided"}), 400

    resume_info = data["resume_info"]
    jd_text = data["jd_text"]

    match_result = calculate_ats_score(resume_info, jd_text)

    # Save to MongoDB
    analysis_data = {
        "resume_info": resume_info,
        "jd_text": jd_text,
        "match_result": match_result,
        "timestamp": datetime.now(timezone.utc).isoformat()
    }
    save_analysis(analysis_data)

    return jsonify({
        "message": "ATS score calculated successfully",
        "match_result": match_result
    })

@app.route("/history", methods=["GET"])
def get_history():
    analyses = get_all_analyses()
    return jsonify({
        "message": "Analysis history retrieved",
        "analyses": analyses
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)
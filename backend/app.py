from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from resume_parser.parser import parse_resume
import os

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

    return jsonify({
        "message": "Resume uploaded and parsed successfully",
        "filename": file.filename,
        "extracted_text": extracted_text
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)
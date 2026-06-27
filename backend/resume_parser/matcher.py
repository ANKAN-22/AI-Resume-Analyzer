import json
import os
import re

SKILLS_PATH = os.path.join(os.path.dirname(__file__), "skills_list.json")
with open(SKILLS_PATH, "r") as f:
    SKILLS_DATA = json.load(f)

ALL_SKILLS = (
    SKILLS_DATA["technical_skills"] +
    SKILLS_DATA["soft_skills"] +
    SKILLS_DATA["domain_skills"]
)

def extract_jd_skills(jd_text):
    jd_lower = jd_text.lower()
    found = []
    for skill in ALL_SKILLS:
        if skill.lower() in jd_lower:
            found.append(skill)
    return found

def extract_keywords(text):
    words = re.findall(r'\b[a-zA-Z]{3,}\b', text.lower())
    stopwords = {"and", "the", "for", "with", "that", "this", "are", "you",
                 "have", "will", "from", "they", "been", "has", "was", "our",
                 "not", "but", "can", "all", "any", "its", "your", "their"}
    return list(set([w for w in words if w not in stopwords]))

def calculate_ats_score(resume_info, jd_text):
    # Extract JD skills
    jd_skills = extract_jd_skills(jd_text)

    # Get all resume skills as flat list
    resume_skills = []
    for category in resume_info["skills"].values():
        resume_skills.extend(category)
    resume_skills = [s.lower() for s in resume_skills]

    # Matched and missing skills
    matched_skills = [s for s in jd_skills if s.lower() in resume_skills]
    missing_skills = [s for s in jd_skills if s.lower() not in resume_skills]

    # Skills score
    skills_score = (len(matched_skills) / len(jd_skills) * 100) if jd_skills else 0

    # Keyword matching
    jd_keywords = extract_keywords(jd_text)
    resume_keywords = extract_keywords(
        " ".join(resume_skills) + " " +
        " ".join(resume_info.get("education", [])) + " " +
        " ".join(resume_info.get("experience", []))
    )
    matched_keywords = [k for k in jd_keywords if k in resume_keywords]
    keyword_score = (len(matched_keywords) / len(jd_keywords) * 100) if jd_keywords else 0

    # Final ATS score (weighted)
    ats_score = round((skills_score * 0.6) + (keyword_score * 0.4), 2)

    return {
        "ats_score": ats_score,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "matched_keywords": matched_keywords[:10],
        "total_jd_skills": len(jd_skills),
        "total_matched_skills": len(matched_skills)
    }
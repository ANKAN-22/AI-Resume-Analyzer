import pdfplumber
import docx
import os
import re
import json
import spacy

nlp = spacy.load("en_core_web_sm")

# Load skills list
SKILLS_PATH = os.path.join(os.path.dirname(__file__), "skills_list.json")
with open(SKILLS_PATH, "r") as f:
    SKILLS_DATA = json.load(f)

ALL_SKILLS = (
    SKILLS_DATA["technical_skills"] +
    SKILLS_DATA["soft_skills"] +
    SKILLS_DATA["domain_skills"]
)

def extract_text_from_pdf(file_path):
    text = ""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    return text.strip()

def extract_text_from_docx(file_path):
    doc = docx.Document(file_path)
    text = ""
    for paragraph in doc.paragraphs:
        text += paragraph.text + "\n"
    return text.strip()

def parse_resume(file_path):
    ext = os.path.splitext(file_path)[1].lower()
    if ext == ".pdf":
        return extract_text_from_pdf(file_path)
    elif ext == ".docx":
        return extract_text_from_docx(file_path)
    else:
        return None

def extract_email(text):
    match = re.search(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}", text)
    return match.group(0) if match else None

def extract_phone(text):
    match = re.search(r"(\+?\d{1,3}[\s-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}", text)
    return match.group(0) if match else None

def extract_name(text):
    doc = nlp(text)
    for ent in doc.ents:
        if ent.label_ == "PERSON":
            return ent.text.split("\n")[0].strip()
    return text.split("\n")[0].strip()

def extract_skills(text):
    text_lower = text.lower()
    found_skills = {
        "technical_skills": [],
        "soft_skills": [],
        "domain_skills": []
    }
    for category, skills in SKILLS_DATA.items():
        for skill in skills:
            if skill.lower() in text_lower:
                found_skills[category].append(skill)
    return found_skills

def extract_education(text):
    education_keywords = ["bca", "bsc", "b.sc", "btech", "b.tech", "mca", "msc",
                         "mtech", "m.tech", "mba", "bachelor", "master", "phd",
                         "university", "college", "institute", "school"]
    lines = text.split("\n")
    education = []
    for line in lines:
        if any(keyword in line.lower() for keyword in education_keywords):
            education.append(line.strip())
    return education

def extract_experience(text):
    experience_keywords = ["intern", "engineer", "developer", "analyst",
                          "manager", "executive", "consultant", "associate",
                          "worked", "experience"]
    lines = text.split("\n")
    experience = []
    for line in lines:
        if any(keyword in line.lower() for keyword in experience_keywords):
            experience.append(line.strip())
    return experience

def extract_all(text):
    return {
        "name": extract_name(text),
        "email": extract_email(text),
        "phone": extract_phone(text),
        "skills": extract_skills(text),
        "education": extract_education(text),
        "experience": extract_experience(text)
    }
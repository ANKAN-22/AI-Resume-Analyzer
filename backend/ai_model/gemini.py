from google import genai
import os
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def generate_summary(resume_info):
    name = resume_info.get("name", "The candidate")
    skills = resume_info.get("skills", {})
    tech_skills = ", ".join(skills.get("technical_skills", []))
    education = ", ".join(resume_info.get("education", []))
    experience = ", ".join(resume_info.get("experience", []))

    prompt = f"""
    Write a professional resume summary in 3-4 sentences for the following candidate:
    Name: {name}
    Technical Skills: {tech_skills}
    Education: {education}
    Experience: {experience}
    
    The summary should be concise, professional, and highlight their key strengths.
    Do not include any headers or labels, just the summary paragraph.
    """

    response = client.models.generate_content(
        model="gemini-2.5-flash-lite",
        contents=prompt
    )
    return response.text.strip()

def generate_cover_letter(resume_info, jd_text):
    name = resume_info.get("name", "The candidate")
    skills = resume_info.get("skills", {})
    tech_skills = ", ".join(skills.get("technical_skills", []))
    education = ", ".join(resume_info.get("education", []))
    experience = ", ".join(resume_info.get("experience", []))

    prompt = f"""
    Write a professional cover letter for the following candidate applying for this job:
    
    Candidate Name: {name}
    Technical Skills: {tech_skills}
    Education: {education}
    Experience: {experience}
    
    Job Description: {jd_text}
    
    The cover letter should be professional, concise (3 paragraphs), and highlight 
    how the candidate's skills match the job requirements.
    """

    response = client.models.generate_content(
        model="gemini-2.5-flash-lite",
        contents=prompt
    )
    return response.text.strip()
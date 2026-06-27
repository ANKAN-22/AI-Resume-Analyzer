def generate_suggestions(resume_info, match_result):
    suggestions = []

    # Check skills
    if len(match_result["missing_skills"]) > 0:
        missing = ", ".join(match_result["missing_skills"])
        suggestions.append(f"Add missing skills to your resume: {missing}")

    # Check ATS score
    if match_result["ats_score"] < 50:
        suggestions.append("Your ATS score is low. Tailor your resume more closely to the job description.")

    # Check experience
    if not resume_info.get("experience") or len(resume_info["experience"]) == 0:
        suggestions.append("Add work experience or internship details to strengthen your resume.")
    else:
        has_metrics = any(
            any(char.isdigit() for char in exp)
            for exp in resume_info["experience"]
        )
        if not has_metrics:
            suggestions.append("Add measurable achievements to your experience (e.g. 'Improved performance by 30%').")

    # Check education
    if not resume_info.get("education") or len(resume_info["education"]) == 0:
        suggestions.append("Add your educational qualifications to your resume.")

    # Check technical skills count
    tech_skills = resume_info.get("skills", {}).get("technical_skills", [])
    if len(tech_skills) < 5:
        suggestions.append("Add more technical skills relevant to your target role.")

    # Check soft skills
    soft_skills = resume_info.get("skills", {}).get("soft_skills", [])
    if len(soft_skills) == 0:
        suggestions.append("Include soft skills like communication, teamwork, or leadership.")

    # Check domain skills
    domain_skills = resume_info.get("skills", {}).get("domain_skills", [])
    if len(domain_skills) == 0:
        suggestions.append("Add domain-specific skills like data analysis, project management, etc.")

    # Keyword suggestion
    if match_result["ats_score"] < 75:
        suggestions.append("Include more keywords from the job description to improve ATS compatibility.")

    # General tips
    suggestions.append("Ensure your resume is saved as a PDF for best ATS compatibility.")
    suggestions.append("Keep your resume to 1 page if you have less than 3 years of experience.")

    return suggestions
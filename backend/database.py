from pymongo import MongoClient
from dotenv import load_dotenv
import os


load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")

client = MongoClient(MONGO_URI, tls=True, tlsInsecure=True)
db = client[DB_NAME]

analyses_collection = db["analyses"]

def save_analysis(data):
    result = analyses_collection.insert_one(data)
    return str(result.inserted_id)

def get_all_analyses():
    analyses = list(analyses_collection.find({}, {"_id": 0}))
    return analyses
from flask_pymongo import pymongo
import os

MONGO_URI = os.getenv("MONGO_URI")

try:
    mongo = pymongo.MongoClient(MONGO_URI)    
    db = mongo['url-shortener']
    Url = db["Url"]
    mongo.server_info()
except:
    print("Error - connection to db failed")

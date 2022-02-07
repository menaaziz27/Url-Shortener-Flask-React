from flask_pymongo import pymongo

MONGO_URI = 'mongodb+srv://root:admin@mycluster.dlfkm.mongodb.net/url-shortener?retryWrites=true&w=majority'

try:
    mongo = pymongo.MongoClient(MONGO_URI)    
    db = mongo['url-shortener']
    Url = db["Url"]
    mongo.server_info()
except:
    print("Error - connection to db failed")

from pymongo import MongoClient

MONGO_URI = "mongodb+srv://mrshaktiman01:nK5Epooo7G2rk5zo@cluster0.2edlu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(MONGO_URI)
db = client["test"]
orders_collection = db["orders"]

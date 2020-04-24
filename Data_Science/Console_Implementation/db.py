from flask import Flask
from flask_pymongo import pymongo
import fruit

CONNECTION_STRING = "mongodb+srv://fresty_grading:20181234@fresty-quality-grading-gebmh.mongodb.net/test?retryWrites=true&w=majority"
client = pymongo.MongoClient(CONNECTION_STRING)
db = client["test"]
test_collection = db["test_collection"]
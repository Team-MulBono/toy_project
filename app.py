import requests
from flask import Flask, jsonify, request, render_template
from bs4 import BeautifulSoup
from pymongo import MongoClient

client = MongoClient('mongodb+srv://mulbono:1234@cluster0.fn6k9sb.mongodb.net/?retryWrites=true&w=majority')
db = client.dbmulbono

from flask import Flask
app = Flask(__name__)

@app.route('/index')
def main():
    return 'This is Home!'

@app.route('/index/guest-book', methods=["GET"])
def get_guest_book():
    return 'This is Home!'

@app.route('/index/guest-book', methods=["POST"])
def write_guest_book():
    return 'This is Home!'

if __name__ == '__main__':  
    app.run('0.0.0.0',port=5000,debug=True)
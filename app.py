import json
import requests
from flask import Flask, jsonify, request, render_template
from bs4 import BeautifulSoup
from pymongo import MongoClient

client = MongoClient('mongodb+srv://mulbono:1234@cluster0.fn6k9sb.mongodb.net/?retryWrites=true&w=majority')
db = client.dbmulbono

from flask import Flask
app = Flask(__name__)

# index 페이지 조회 API
@app.route('/index')
def main():
    data = list(db.test.find({},{'_id':False}))
    json_data = json.dumps(data)
    return render_template('index.html', json_data=json_data)

# 방명록 조회 API
@app.route('/index/guest-book', methods=["GET"])
def get_guest_book():
    guest_books = list(db.guestbook.find({},{'_id':False}))
    return jsonify({'response':guest_books})

# 방명록 작성 API
@app.route('/index/guest-book', methods=["POST"])
def write_guest_book():
    return 'This is Home!'

if __name__ == '__main__':  
    app.run('0.0.0.0',port=5000,debug=True)
import requests
from flask import Flask, jsonify, request, render_template
from bs4 import BeautifulSoup
from pymongo import MongoClient
import datetime as dt

client = MongoClient('mongodb+srv://mulbono:1234@cluster0.fn6k9sb.mongodb.net/?retryWrites=true&w=majority')
db = client.dbmulbono

from flask import Flask
app = Flask(__name__)

# index 페이지 조회 API
@app.route('/index')
def main():
    return 'This is Home!'

# 방명록 조회 API
@app.route('/index/guest-book', methods=["GET"])
def get_guest_book():
    return 'This is Home!'

# 방명록 작성 API
@app.route("/guestbook", methods=["POST"])
def guestbook_post():
    time = dt.datetime.now()

    nickname_receive = request.form["nickname_give"]
    comment_receive = request.form["comment_give"]
    time_receive = time.strftime("%Y-%m-%d %H:%M")

    doc = {
        'nickname': nickname_receive,
        'comment': comment_receive,
        'time': time_receive,
    }
    db.guestbook.insert_one(doc)
    return jsonify({'msg':'방명록 작성 완료!!'})

if __name__ == '__main__':  
    app.run('0.0.0.0',port=5000,debug=True)

import json
import requests
from bs4 import BeautifulSoup
from flask import Flask, jsonify, request, render_template
from pymongo import MongoClient
import datetime as dt
from bson import ObjectId
from bson.json_util import dumps

client = MongoClient('mongodb+srv://mulbono:1234@cluster0.fn6k9sb.mongodb.net/?retryWrites=true&w=majority')
db = client.dbmulbono

app = Flask(__name__)

# index 페이지 조회 API (index.html 랜더링 및 팀원 소개 data)
@app.route('/index')
def main():
    data = list(db.members.find({},{'_id':False}))
    json_data = json.dumps(data)

    return render_template('index.html', json_data=json_data)


# 방명록 조회 API
@app.route('/index/guest-book', methods=["GET"])
def get_guest_book():
    guest_books = list(db.guestbook.find())
    json_data = dumps(guest_books, default=str)
    
    return jsonify({'response':json_data})


# 방명록 작성 API
@app.route("/index/guest-book", methods=["POST"])
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


# 방명록 삭제 API
@app.route('/index/guest-book/<id>', methods=["POST"])
def delete_guest_book(id):
    db.guestbook.delete_one({'_id': ObjectId(id)})
    
    return jsonify({'msg':'방명록 삭제 완료!'})


# 방명록 수정 API
@app.route('/index/guest-book/<id>', methods=["PUT"])
def update_guest_book(id):
    nickname = request.form.get('nickname_give')
    comment = request.form.get('comment_give')

    guest_book = db.guestbook.find_one({'_id': ObjectId(id)})

    if not guest_book:
        return jsonify({'mgs':'방명록이 존재하지 않습니다.'}), 404
    
    guest_book['nickname'] = nickname
    guest_book['comment'] = comment

    db.guestbook.update_one({'_id': ObjectId(id)}, {'$set': guest_book})
    
    return jsonify({"msg":"방명록 수정 완료!"})


if __name__ == '__main__':  
    app.run('0.0.0.0',port=5000,debug=True)

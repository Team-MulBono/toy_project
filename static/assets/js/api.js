// 방명록 조회 API 호출 함수
async function guest_book(){
    let res = await fetch('/index/guest-book',{
        method : "GET",
    })
    let res_json = await res.json()
    let res_parse = JSON.parse(res_json['response'])

    res_parse.forEach((data) => {
        let obj_id = data['_id']['$oid']
        let nickname = data['nickname']
        let comment = data['comment']
        let time = data['time']
        console.log(obj_id, nickname, comment, time)
        
        let tmp = `<li class="comment-list">
                        <img class="comment-list-img" src="/static/assets/images/blue-bono.jpeg" alt="방명록 댓글 이미지">
                        <div class="comment-content">
                        <span class="comment-Id" style="display: none;">${obj_id}</span>
                        <span class="comment-username">${nickname}</span>
                        <span class="comment-text">${comment}</span>
                        <div class="comment-info">
                            <p class="comment-data">${time}</p>
                            <button class="modify-comment" type="button" onclick="handleUpdate('${obj_id}')">수정</button>
                            <button class="delete-comment" type="button" onclick="handleDelete('${obj_id}')">삭제</button>
                        </div>
                        </div>
                    </li>`
    });
}

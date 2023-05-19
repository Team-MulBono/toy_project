// 방명록 조회 API 호출 함수
async function guest_book(){
    let res = await fetch('/index/guest-book',{
        method : "GET",
    })
    let res_json = await res.json()
    let res_parse = JSON.parse(res_json['response'])

    $('#guest_book_list').empty();
    res_parse.forEach((data) => {
        let obj_id = data['_id']['$oid']
        let nickname = data['nickname']
        let comment = data['comment']
        let time = data['time']
        
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
        $('#guest_book_list').append(tmp)
    });
}

// 방명록 작성 API 호출 함수
let comment_btn = document.querySelector('.submit-button')
comment_btn.addEventListener("click", async function write() {
    let nickname = $('#nickname').val();
    let comment = $('#comment').val();
    
    let formData = new FormData
    formData.append('nickname_give', nickname)
    formData.append('comment_give', comment)

    let request = await fetch('/index/guest-book', {
        method : "POST",
        body : formData
    })
    let request_json = await request.json()
    
    if (request['status'] == 200){
        alert(request_json['msg'])
        window.location.reload();
    }
})

// 방명록 삭제 API 호출 함수
async function handleDelete(id) {
    let res = await fetch(`/index/guest-book/${id}`, {
        method : "DELETE",
    })
    let res_json = await res.json()

    if (res['status']==200) {
        alert(res_json['msg']);
        window.location.reload();
    }
}

// 방명록 수정 API 호출 함수
async function handleUpdate(id){
    let nickname = $('#nickname').val()
    let comment = $('#comment').val()

    let formData = new FormData()
    formData.append("nickname_give", nickname)
    formData.append("comment_give", comment)

    let res = await fetch(`/index/guest-book/${id}`, {
        method : "PUT",
        body : formData
    })
    let res_json = await res.json()

    if (res['status']==200){
        alert(res_json['msg'])
        window.location.reload()
    } else if (res['status']==404){
        alert(res_json['msg'])
        window.location.reload()
    }
}
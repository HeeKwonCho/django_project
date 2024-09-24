function getQueryParams() {
    const params = {};
    window.location.search.substring(1).split('&').forEach(param => {
        const [key, value] = param.split('=');
        params[key] = decodeURIComponent(value);
    });
    return params;
}

window.onload = function() {
    const params = getQueryParams();

    document.getElementById('course-title').textContent = params.title;
    document.getElementById('course-instructor').textContent = `강사: ${params.instructor}`;
    document.getElementById('course-price').textContent = `가격: ${params.price}`;
    document.getElementById('course-rating').textContent = `평점: ★ ${params.rating}`;

    loadComments(params.id);
}

function loadComments(courseId) {
    const comments = JSON.parse(localStorage.getItem(`comments-${courseId}`)) || [];
    const commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = ''; 
    comments.forEach((comment, index) => {
        const commentItem = document.createElement('div');
        commentItem.className = 'comment-item';
        commentItem.setAttribute('data-index', index);
        commentItem.innerHTML = `
            <p>${comment}</p>
            <div class="comment-actions">
                <button class="edit-comment">수정</button>
                <button class="delete-comment">삭제</button>
            </div>
        `;
        commentsList.appendChild(commentItem);
    });

    const editButtons = document.querySelectorAll('.edit-comment');
    const deleteButtons = document.querySelectorAll('.delete-comment');

    editButtons.forEach(button => {
        button.addEventListener('click', editComment);
    });

    deleteButtons.forEach(button => {
        button.addEventListener('click', deleteComment);
    });
}

document.getElementById('submit-comment').addEventListener('click', function() {
    const commentInput = document.getElementById('comment-input');
    const commentText = commentInput.value.trim();
    if (commentText === '') return;

    const params = getQueryParams();
    const courseId = params.id;
    const comments = JSON.parse(localStorage.getItem(`comments-${courseId}`)) || [];
    comments.push(commentText);
    localStorage.setItem(`comments-${courseId}`, JSON.stringify(comments));

    commentInput.value = '';
    loadComments(courseId);
});

function editComment(event) {
    const commentItem = event.target.closest('.comment-item');
    const commentIndex = commentItem.getAttribute('data-index');
    const params = getQueryParams();
    const courseId = params.id;
    const comments = JSON.parse(localStorage.getItem(`comments-${courseId}`)) || [];

    const commentText = comments[commentIndex];
    commentItem.innerHTML = `
        <input type="text" class="comment-edit-input" value="${commentText}">
        <div class="comment-actions">
            <button class="save-comment">저장</button>
            <button class="cancel-edit">취소</button>
        </div>
    `;

    commentItem.querySelector('.save-comment').addEventListener('click', function() {
        const newCommentText = commentItem.querySelector('.comment-edit-input').value.trim();
        if (newCommentText !== '') {
            comments[commentIndex] = newCommentText;
            localStorage.setItem(`comments-${courseId}`, JSON.stringify(comments));
            loadComments(courseId);
        }
    });

    commentItem.querySelector('.cancel-edit').addEventListener('click', function() {
        loadComments(courseId);
    });
}

function deleteComment(event) {
    const commentItem = event.target.closest('.comment-item');
    const commentIndex = commentItem.getAttribute('data-index');
    const params = getQueryParams();
    const courseId = params.id;
    const comments = JSON.parse(localStorage.getItem(`comments-${courseId}`)) || [];

    comments.splice(commentIndex, 1);
    localStorage.setItem(`comments-${courseId}`, JSON.stringify(comments));
    loadComments(courseId);
}

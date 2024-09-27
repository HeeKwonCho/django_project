// 로그인 모달 관련 코드
// const modal = document.getElementById('loginModal');
// const btnLogin = document.querySelector('.btnlogin-popup');
const spanClose = document.querySelector('.close');

// 로그인 버튼 클릭 시 모달 표시
// if (btnLogin) {
//     btnLogin.onclick = function() {
//         modal.style.display = 'block';
//     }
// }

// 모달 닫기 버튼 클릭 시 모달 숨기기
// if (spanClose) {
//     spanClose.onclick = function() {
//         modal.style.display = 'none';
//     }
// }

// 모달 외부 클릭 시 모달 숨기기
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = 'none';
//     }
// }

// 사용자 로고 클릭 시 드롭다운 메뉴 표시/숨기기
const userLogo = document.getElementById('userLogo');
const userDropdown = document.getElementById('userDropdown');

if (userLogo) {
    userLogo.onclick = function () {
        if (userDropdown) {
            userDropdown.classList.toggle('show');
        }
    }
}

// 드롭다운 외부 클릭 시 드롭다운 숨기기
window.onclick = function(event) {
    if (!event.target.matches('.user-logo') && !event.target.closest('.user-dropdown')) {
        if (userDropdown && userDropdown.classList.contains('show')) {
            userDropdown.classList.remove('show');
        }
    }
}

// 모달 외부 클릭 시 모달 숨기기와 드롭다운 숨기기 처리 통합
window.onclick = function(event) {
    // 모달 외부 클릭 시 모달 숨기기
    // if (event.target == modal) {
    //     modal.style.display = 'none';
    // }
    
    // 드롭다운 외부 클릭 시 드롭다운 숨기기
    if (!event.target.matches('.user-logo') && !event.target.closest('.user-dropdown')) {
        if (userDropdown && userDropdown.classList.contains('show')) {
            userDropdown.classList.remove('show');
        }
    }
}



// const categoryLinks = document.querySelectorAll('.nav-links a');
// const courseCards = document.querySelectorAll('.course-card');

// function filterCourses(category) {
//     courseCards.forEach(card => {
//         card.style.display = 'none';
//     });

//     courseCards.forEach(card => {
//         if (card.getAttribute('data-category') === category || category === '전체') {
//             card.style.display = 'block';
//         }
//     });
// }

// categoryLinks.forEach(link => {
//     link.addEventListener('click', function(event) {
//         event.preventDefault();
//         const category = this.textContent.trim();
//         filterCourses(category);
//     });
// });

// filterCourses('웹 개발');

// const courseTitles = document.querySelectorAll('.course-title');

// courseTitles.forEach(title => {
//     title.addEventListener('click', function(event) {
//         event.preventDefault();
//         const courseCard = this.closest('.course-card');
//         const courseId = courseCard.getAttribute('data-id');
//         const courseTitle = courseCard.querySelector('.course-title').textContent;
//         const courseInstructor = courseCard.querySelector('.course-instructor').textContent;
//         const coursePrice = courseCard.querySelector('.course-price').textContent;
//         const courseRating = courseCard.querySelector('.course-rating .rating-number').textContent;

//         window.location.href = `review.html?id=${courseId}&title=${encodeURIComponent(courseTitle)}&instructor=${encodeURIComponent(courseInstructor)}&price=${encodeURIComponent(coursePrice)}&rating=${encodeURIComponent(courseRating)}`;
//     });
// });

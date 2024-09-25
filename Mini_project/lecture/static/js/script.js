const modal = document.getElementById('loginModal');
const btnLogin = document.querySelector('.btnlogin-popup');
const spanClose = document.querySelector('.close');

if (btnLogin) {
    btnLogin.onclick = function() {
        modal.style.display = 'block';
    }
}

if (spanClose) {
    spanClose.onclick = function() {
        modal.style.display = 'none';
    }
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

const categoryLinks = document.querySelectorAll('.nav-links a');
const courseCards = document.querySelectorAll('.course-card');

function filterCourses(category) {
    courseCards.forEach(card => {
        card.style.display = 'none';
    });

    courseCards.forEach(card => {
        if (card.getAttribute('data-category') === category || category === '전체') {
            card.style.display = 'block';
        }
    });
}

categoryLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const category = this.textContent.trim();
        filterCourses(category);
    });
});

filterCourses('웹 개발');

const courseTitles = document.querySelectorAll('.course-title');

courseTitles.forEach(title => {
    title.addEventListener('click', function(event) {
        event.preventDefault();
        const courseCard = this.closest('.course-card');
        const courseId = courseCard.getAttribute('data-id');
        const courseTitle = courseCard.querySelector('.course-title').textContent;
        const courseInstructor = courseCard.querySelector('.course-instructor').textContent;
        const coursePrice = courseCard.querySelector('.course-price').textContent;
        const courseRating = courseCard.querySelector('.course-rating .rating-number').textContent;

        window.location.href = `review.html?id=${courseId}&title=${encodeURIComponent(courseTitle)}&instructor=${encodeURIComponent(courseInstructor)}&price=${encodeURIComponent(coursePrice)}&rating=${encodeURIComponent(courseRating)}`;
    });
});

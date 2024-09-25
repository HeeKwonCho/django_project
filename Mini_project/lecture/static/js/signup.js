const btnSignup = document.querySelector('.btnsignup-popup');

if (btnSignup) {
    btnSignup.onclick = function() {
        window.location.href = 'signup.html';
    }
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function validatePassword(password) {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,32}$/;
    return passwordPattern.test(password);
}

document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.querySelector('.signup-form');
    if (!signupForm) return;

    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const passwordConfirm = document.getElementById('password-confirm').value.trim();
        const termsChecked = document.getElementById('terms').checked;

        if (!validateEmail(email)) {
            alert('유효한 이메일을 입력하세요.');
            return;
        }

        if (!validatePassword(password)) {
            alert('비밀번호 조건을 확인하세요.');
            return;
        }

        if (password !== passwordConfirm) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        if (!termsChecked) {
            alert('회원가입 조건에 동의해주세요.');
            return;
        }

        const signupData = {
            email: email,
            password: password,
        };

        fetch('http://your-backend-api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(signupData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('회원가입이 완료되었습니다!');
                window.location.href = '/login.html';
            } else {
                alert('회원가입에 실패했습니다: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('회원가입 처리 중 오류가 발생했습니다.');
        });
    });

    const passwordField = document.getElementById('password');
    const passwordConfirmField = document.getElementById('password-confirm');

    if (passwordField && passwordConfirmField) {
        const togglePassword = document.createElement('span');
        togglePassword.classList.add('toggle-password');
        togglePassword.innerHTML = '👁️';

        togglePassword.addEventListener('click', function() {
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                passwordConfirmField.type = 'text';
                togglePassword.innerHTML = '🙈';
            } else {
                passwordField.type = 'password';
                passwordConfirmField.type = 'password';
                togglePassword.innerHTML = '👁️';
            }
        });

        passwordField.parentNode.appendChild(togglePassword);
        passwordConfirmField.parentNode.appendChild(togglePassword.cloneNode(true));
    }
});
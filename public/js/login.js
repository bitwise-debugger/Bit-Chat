let FORM = document.querySelector('#FORM');
let msg = document.querySelector('.msg');
let login_btn = document.querySelector('#login-btn');
async function showMessage(message, success) {
    if (success) {
        login_btn.innerHTML = message;
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 500);
        });
        login_btn.innerHTML = `Login`;
    } else {
        msg.classList.add('display-flex');
        msg.innerHTML = message;
        await new Promise((resolve) => {
            login_btn.innerHTML = `Login`;
            setTimeout(() => {
                msg.classList.add('translate_right');
                resolve();
            }, 3000);
        });
        await new Promise((resolve) => {
            setTimeout(() => {
                msg.classList.remove('translate_right');
                msg.classList.remove('display-flex');
                resolve();
            }, (500));
        });
    }
}
FORM.addEventListener('submit', async function (e) {
    e.preventDefault();
    let formData = new FormData(this);
    let urlEncodedData = new URLSearchParams(formData).toString();
    console.log(formData);
    try {
        console.log(login_btn);
        login_btn.innerHTML = ``;
        let cursor = document.createElement('div');
        cursor.classList.add('loading-cursor-5');
        login_btn.appendChild(cursor);
        let response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: urlEncodedData
        });
        let result = await response.json();
        if (result.success) {
            showMessage(result.message, result.success).then(() => {
                window.location.href = '/home';
            })
        } else {
            showMessage(result.message);
        }
    } catch (err) {
        console.log('Login Error:', err);
        showMessage('Something went wrong. Please try again.');
    }
});

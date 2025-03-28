let FORM = document.querySelector('#FORM');
let msg = document.querySelector('.msg');
let login_btn = document.querySelector('#register-btn');
async function showMessage(message, success) {
    if (success) {
        login_btn.innerHTML = message;
        await new Promise((resolve) => {
            setTimeout(() => {
                login_btn.innerHTML = `Register`;
                resolve();
            }, 500);
        });
    } else {
        msg.classList.add('display-flex');
        msg.innerHTML = message;
        await new Promise((resolve) => {
            login_btn.innerHTML = `Register`;
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
    try {
        console.log(login_btn);
        login_btn.innerHTML = ``;
        let cursor = document.createElement('div');
        cursor.classList.add('loading-cursor-5');
        login_btn.appendChild(cursor);
        let response = await fetch('/register', {
            method: 'POST',
            headers: {
                // 'Content-Type': 'multipart/form-data'
            },
            body: formData
        });
        let result = await response.json();
        if (result.success) {
            showMessage(result.message, result.success).then(() => {
                window.location.href = '/';
            })
        } else {
            showMessage(result.message);
        }
    } catch (err) {
        console.log('Login Error:', err);
        showMessage('Something went wrong. Please try again.');
    }
});

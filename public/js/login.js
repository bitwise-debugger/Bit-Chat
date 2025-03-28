let FORM = document.querySelector('#FORM');
let msg = document.querySelector('.msg');
async function showMessage(message) {
    msg.classList.add('display-flex');
    msg.innerHTML = message;
    await new Promise((resolve) => {
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
FORM.addEventListener('submit', async function (e) {
    e.preventDefault();
    let formData = new FormData(this);
    let urlEncodedData = new URLSearchParams(formData).toString();
    console.log(formData);
    try {
        let response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: urlEncodedData
        });
        let result = await response.json();
        if (result.success) {
            showMessage(result.message).then(() => {
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

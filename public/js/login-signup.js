let form = document.querySelector('form');
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    let formType = this.getAttribute('data-form');
    const formData = new FormData(this);
    const action = this.getAttribute('action');
    const urlEncodedData = new URLSearchParams(formData).toString();
    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: urlEncodedData,
    }
    try {
        let blob = await fetch(action, config);
        let response = await blob.json();
        let success = response.success ? 'message' : 'error';
        createMessage(success, response.message + ' Redirecting....');
        setTimeout(() => {
            console.log(this.dataset.form);
            if (formType == 'login') {
                window.location.href = '/ui/dashboard';
            } else if (formType == 'register') {
                window.location.href = '/user/login';
            }
        }, 1200);
    } catch (er) {
        createMessage('error', er.message)
    }
});
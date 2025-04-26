let form = document.querySelector('form');
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const action = this.getAttribute('action');
    const config = {
        method: 'POST',
        Headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData,
    }
    try {
        let blob = await fetch(action, config);
        let response = await blob.json();
        let success = response.success ? 'message' : 'error';
        createMessage(success, response.message)
    } catch (er) {
        createMessage('error', er.message)
    }
});
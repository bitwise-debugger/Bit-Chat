function createMessage(type, message) {
    // Create the message container
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message', type);  // Add both 'message' and the specific type class (error, warning, etc.)

    // Create the message text
    const messageText = document.createElement('span');
    messageText.classList.add('message-text');
    messageText.textContent = message;

    // Create the SVG icon (common for error/warning, can be customized per type)
    const messageSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    messageSvg.setAttribute("class", "message-svg");
    messageSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    messageSvg.setAttribute("viewBox", "0 0 24 24");

    // Set different icons based on the message type (error or warning)
    if (type === 'error') {
        messageSvg.innerHTML = '<path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>';
    } else if (type === 'warning') {
        messageSvg.innerHTML = '<path d="M12.8659 3.00017L22.3922 19.5002C22.6684 19.9785 22.5045 20.5901 22.0262 20.8662C21.8742 20.954 21.7017 21.0002 21.5262 21.0002H2.47363C1.92135 21.0002 1.47363 20.5525 1.47363 20.0002C1.47363 19.8246 1.51984 19.6522 1.60761 19.5002L11.1339 3.00017C11.41 2.52187 12.0216 2.358 12.4999 2.63414C12.6519 2.72191 12.7782 2.84815 12.8659 3.00017ZM4.20568 19.0002H19.7941L11.9999 5.50017L4.20568 19.0002ZM10.9999 16.0002H12.9999V18.0002H10.9999V16.0002ZM10.9999 9.00017H12.9999V14.0002H10.9999V9.00017Z"></path>';
    }
    else{
        messageSvg.innerHTML = '<path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z"></path> "/>'
    }
    // Append elements to the container
    messageContainer.appendChild(messageSvg);
    messageContainer.appendChild(messageText);

    // Insert the message into the DOM (appending it to the body or a specific container)
    document.body.appendChild(messageContainer);

    // Optional: Remove the message after 5 seconds
    setTimeout(() => {
        messageContainer.remove();
    }, 5000);
}

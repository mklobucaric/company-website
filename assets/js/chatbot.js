// Get the offcanvas element
// const offcanvas = document.getElementById('offcanvasChat');

// Get the chat messages container
const chatMessages = document.getElementById('chat-messages');

// Get the chat form
const chatForm = document.getElementById('chat-form');

// Get the chat input
const chatInput = document.getElementById('chat-input');

// Get the send button
const sendButton = document.getElementById('chatbot-send');

if (sendButton) {
    sendButton.addEventListener('click', retrieveAIResponse);
}

// Create an array to store the chat messages
var messages = [];

// Add an event listener for the chat form submit event
async function retrieveAIResponse () {

  // Get the value of the chat input
  const message = chatInput.value;

  // Add the message to the messages array
  messages.push({ "role": "user", "content": message });
  displayMessage(messages[messages.length - 1]);

  // Clear the chat input
  chatInput.value = '';

    try {
        // token = localStorage.getItemItem('firebaseToken');
        // Send the messages array to the backend
        const response = await fetch('http://127.0.0.1:8000/api/chat/achat', {
            method: 'POST',
            headers: {
            // 'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ messages:messages}),
        })

        if (response.status === 201) {
            const result = await response.json();
            alert('Response retrieval successful!');
            messages.push({ "role": "assistant", "content": result.content });

            // Display the messages in the chat messages container
            displayMessage(messages[messages.length - 1]);

        } else {
            const result = await response.json(); 
            console.error('Response retrieval failed:', result);
            alert('Response retrieval failed! ' + result.detail);
        }

    } catch (error) {
        console.error(error);
        alert('Response retrieval failed!');
}

};

// Add an event listener for the reset button click event
chatForm.addEventListener('reset', () => {
  // Clear the messages array
  messages.length = 0;

  // Clear the chat messages container
  chatMessages.innerHTML = '';
});

function displayMessage (message) {
  // Create a new message element
  const messageElement = document.createElement('div');

  // Add the appropriate class to the message element
  if (message.role === 'user') {
    messageElement.innerHTML = `<strong>You:</strong><br>${message.content}`;
  } else {
    messageElement.innerHTML = "<strong>AI RAG Chatbot:</strong><br>" + message.content;
  }

  messageElement.style.padding = "5px"; // Optional: Adds padding to each message for better readability

  // Append the message element to the chat messages container
  chatMessages.appendChild(messageElement);

  // Scroll to the bottom of the chat messages container
  chatMessages.scrollTop = chatMessages.scrollHeight;
};

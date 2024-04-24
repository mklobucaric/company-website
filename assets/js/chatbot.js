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




// Set up an event listener for when the offcanvas chat element finishes its closing transition
document.getElementById('offcanvasChat').addEventListener('hidden.bs.offcanvas', function () {
    // This function will contain logic to handle the chat closing,
    // such as disconnecting from chat services or clearing chat history and show chat button
    closeWebSocket();
});

if (sendButton) {
    sendButton.addEventListener('click', retrieveAIStream);
    //sendButton.addEventListener('click', retrieveAIResponse);
}

let messageId = 0; // Initialize counter outside the function
// Create an array to store the chat messages
var messages = [];
let socket = null;
let pendingMessages = [];
let streamMessage = ""

let quota_exceeded = false

// Add an event listener for the chat form submit event
async function retrieveAIResponse () {

  // Get the value of the chat input
  const message = chatInput.value;

  // Add the message to the messages array
  messages.push({ "role": "user", "content": message });
  messageId++
  displayMessage(messages[messages.length - 1],messageId);

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
            console.log('Response retrieval successful!');
            messages.push({ "role": "assistant", "content": result.content });

            // Display the messages in the chat messages container
            messageId++
            displayMessage(messages[messages.length - 1], messageId);

        } else {
            const result = await response.json(); 
            console.error('Response retrieval failed:', result);
            console.log('Response retrieval failed! ' + result.detail);
        }

    } catch (error) {
        console.error(error);
        console.log('Response retrieval failed!');
}

};


// Add an event listener for the reset button click event
chatForm.addEventListener('reset', () => {
  // Clear the messages array
  messages.length = 0;

  // Clear the chat messages container
  chatMessages.innerHTML = '';
});

function displayMessage (message, msgId) {
  // Create a new message element
  const messageElement = document.createElement('div');
  messageElement.id = `message-${msgId}`; // Increment messageId each time
  console.log(messageElement.id);
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


function setupWebSocket() {

    // Get the Firebase token from local storage
    const token = localStorage.getItem('firebaseToken');

    socket = new WebSocket(`ws://127.0.0.1:8000/api/chat/ws/aschat?token=${encodeURIComponent(token)}`);

    socket.onopen = function(event) {
        console.log("WebSocket is open now.");
        if (pendingMessages.length > 0) {
            pendingMessages.forEach(msg => socket.send(JSON.stringify({ messages: msg })));
            pendingMessages = [];  // Clear the queue after sending
            
        }
    };

    socket.onmessage = function(event) {
        //console.log("Received:", event.data);
        // Handle incoming messages
    };
    socket.onclose = function(event) {
        //messages.push({ "role": "assistant", "content": streamMessage });
        streamMessage = ''; // Reset for next connection
        messages.length = 0;
        chatMessages.innerHTML = '';
        console.log('WebSocket connection closed:', event);
        messageId = 0;

        if (quota_exceeded) {
            offcanvasChat.hide()
            localStorage.setItem('firebaseToken', '');
            quotaModal.show();
  
    };

    };


    socket.onerror = function(event) {
        console.error('WebSocket error:', event);
        console.log('WebSocket connection error!');
        loginModal.show(); // Add this line to show the login modal when there is a WebSocket error
      };
      

}


async function retrieveAIStream() {
    // Get the value of the chat input
    if (messageId === 0) {
        chatMessages.innerHTML = '';
    }

    // Add the message to the messages array
    const message = chatInput.value;
    messages.push({ "role": "user", "content": message });
    messageId++
    displayMessage(messages[messages.length - 1],messageId);
    chatInput.value = '';  // Clear the chat input

    // const socket = new WebSocket('ws://127.0.0.1:8000/api/chat/ws/aschat');

    // socket.onopen = function(event) {
    //     // Send the message once the connection is opened
    //     socket.send(JSON.stringify({messages:messages}));
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ messages: messages }));
    } else {
        console.log("WebSocket is not open. Queueing message and trying to reconnect...");
        pendingMessages.push(messages);  // Queue messages to send after reconnecting
        if (!socket || socket.readyState === WebSocket.CLOSED) {
            setupWebSocket();
        }
    }

    // };
    messageId++
    displayMessage({ "role": "assistant", "content": "" }, messageId);


    socket.onmessage = function(event) {
        // Display each incoming token
        const token = event.data;

        // Check if the token indicates the end of the stream
        if (token === '{"type": "end_of_stream"}') {
            messages.push({ "role": "assistant", "content": streamMessage });
            streamMessage = ''; // Reset for next message stream
            
        } else if (token === '{"type": "quota_exceeded"}') {
            quota_exceeded = true;
        } else {
            streamMessage += token;
            displayMessageStream(token, messageId);
        }
    };
}

// Display message in the offcanvas body
function displayMessageStream(token, msgId) {
    msgId = `message-${msgId}`; // Increment messageId each time
    const msgEl = document.getElementById(msgId); // Retrieve the element by ID

    if (msgEl) {
        msgEl.innerHTML += token; // Update the innerHTML with new text
    } else {
        console.log('No element found with ID:', elementId);
    }
}

function closeWebSocket() {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close(1000, "Closing connection normally."); // 1000 is a normal closure code
        messages.length = 0;
        chatMessages.innerHTML = '';
        streamMessage = ''; 
        messageId = 0;

    }
}


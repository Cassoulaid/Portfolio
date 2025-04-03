const apiKey = 'AIzaSyDaCECFisH8rzDNmMx1ZCgSqYVVG-4vE0M'
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

const sendButton = document.querySelector('.submit-button');
const messagesContainer = document.querySelector('.main-container')
const userInput = document.querySelector('#user-input');
const imageInput = document.querySelector('#image-input');


const send_request = (message) => {

  const loadingMessage = document.createElement('div');
  loadingMessage.className = 'bot-message loading';
  loadingMessage.innerHTML = '<p>En cours de réponse...</p>';
  messagesContainer.appendChild(loadingMessage);

    const data = {
        contents: [
          {
            parts: [
              { text: message}
            ]
          }
        ]
      };
 
    fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then (data => {
            loadingMessage.remove();
            displayMessage(data?.candidates?.[0]?.content?.parts?.[0]?.text, true);
        })
        .catch(error => {
          loadingMessage.remove();
          console.error("Error:", error);
        });      
}

const sendImageToApi = (base64) => {
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}` 

  const loadingMessage = document.createElement('div');
  loadingMessage.className = 'bot-message loading';
  loadingMessage.innerHTML = '<p>En cours de réponse...</p>';
  messagesContainer.appendChild(loadingMessage);

  const data = {
    contents: [
      {
        parts: [
          { text: "que vois tu ici"},
          {
            "inline_data": {
              "mime_type":"image/jpeg",
              "data": base64
            }
          }
        ]
      }
    ]
  };

  fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(data)
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
      }
      return response.json();
  })
  .then(data => {
      console.log('Image envoyée avec succès', data);
      loadingMessage.remove();
      displayMessage(data?.candidates?.[0]?.content?.parts?.[0]?.text, true);
  })
  .catch(error => {
    loadingMessage.remove();
    console.error('Erreur lors de l’envoi de l’image', error);
  });
};

const displayMessage = (message, isBot = false) => {
    const container = document.createElement("div");
    container.className = `${isBot ? "bot-message" : "user-message"}`;
    
    const paragraph = document.createElement("p");
    paragraph.innerHTML = message;
    
    container.appendChild(paragraph);
    messagesContainer.appendChild(container);
  }
    
sendButton.addEventListener('click', () => {
    const messageValue = userInput.value;
    const imageFile = imageInput.files[0];
    console.log(imageFile, imageInput);
    
    if (messageValue) {
        displayMessage(messageValue, false);
        userInput.value = '';
        send_request(messageValue);
    }
    
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            displayImage(e.target.result, false);
        };
        reader.readAsDataURL(imageFile);
        reader.onloadend = function() {
          const base64String = reader.result
            .replace('data:', '')
            .replace(/^.+,/, '');
            sendImageToApi(base64String)
        }
        imageInput.value = '';
      }
});

const displayImage = (imageSrc, isBot = false) => {
  const container = document.createElement('div');
  container.className = `${isBot ? 'bot-message' : 'user-message'}`;
      
  const image = document.createElement('img');
  image.src = imageSrc;
  image.style.maxWidth = '200px';
  image.style.borderRadius = '10px';
  
  container.appendChild(image);
  messagesContainer.appendChild(container);
};

userInput.addEventListener('keypress', (e) => {
    if(e.key === "Enter") {
    const messageValue = userInput.value;
    displayMessage(messageValue, false);
    userInput.value = '';
    send_request(messageValue)
    }
});
    
const suggestionsContainer = document.createElement('div');
suggestionsContainer.className = 'suggestions-container';
messagesContainer.parentNode.insertBefore(suggestionsContainer, messagesContainer.nextSibling);

const suggestions = [
    "Quelle est la météo aujourd'hui ?",
    "C'est quoi un trou noir ?",
    "Quelles sont les dernières nouvelles ?",
    "Raconte-moi une blague.",
    "Peux-tu m'expliquer ce qu'est une IA ?"
];

const displaySuggestions = () => {
    suggestionsContainer.innerHTML = '';

    suggestions.forEach(suggestion => {
        const suggestionButton = document.createElement('button');
        suggestionButton.className = 'suggestion';
        suggestionButton.textContent = suggestion;
        suggestionButton.addEventListener('click', () => {
            userInput.value = suggestion;
            userInput.focus();
        });
        suggestionsContainer.appendChild(suggestionButton);
    });
};

displaySuggestions();

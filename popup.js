// Add this to the top of popup.js

document.getElementById('openApp').addEventListener('click', () => {
  chrome.tabs.create({ url: 'index.html' });
});


// ... (the rest of your existing popup.js code for the canvas and dictation) ...
document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('noteCanvas');
  const ctx = canvas.getContext('2d');
  let isDrawing = false;

  // Basic drawing functionality
  canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
  });

  canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
    }
  });

  canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    ctx.closePath();
  });

  // Dictation functionality
  const startButton = document.getElementById('startDictation');
  const outputArea = document.getElementById('dictatedText');
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';
      for (let i = 0; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }
      outputArea.value = finalTranscript + interimTranscript;
    };

    startButton.addEventListener('click', () => {
      if (startButton.textContent === 'Start Dictation') {
        recognition.start();
        startButton.textContent = 'Stop Dictation';
        startButton.style.backgroundColor = '#f44336'; // Red color
      } else {
        recognition.stop();
        startButton.textContent = 'Start Dictation';
        startButton.style.backgroundColor = '#4CAF50'; // Green color
      }
    });

  } else {
    startButton.textContent = 'Speech Recognition Not Supported';
    startButton.disabled = true;
  }
});
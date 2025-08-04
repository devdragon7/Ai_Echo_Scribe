// This is app.js - it controls index.html

document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('mainCanvas');
  const ctx = canvas.getContext('2d');
  let isDrawing = false;

  // Basic drawing functionality for the main canvas
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

  // Dictation functionality for the main app
  const startButton = document.getElementById('startDictation');
  const outputArea = document.getElementById('dictatedText');
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = 0; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        }
      }
      // We append the final transcript and add a space for the next one
      if (finalTranscript) {
          outputArea.value += finalTranscript.trim() + '. ';
      }
    };

    startButton.addEventListener('click', () => {
      if (startButton.textContent === 'Start Dictation') {
        recognition.start();
        startButton.textContent = 'Stop Dictation';
        startButton.style.backgroundColor = '#d9534f'; // Red color
      } else {
        recognition.stop();
        startButton.textContent = 'Start Dictation';
        startButton.style.backgroundColor = '#4A90E2'; // Blue color
      }
    });

  } else {
    startButton.textContent = 'Speech Recognition Not Supported';
    startButton.disabled = true;
  }
});
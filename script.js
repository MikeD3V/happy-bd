// Function to request microphone permission first
function requestMicPermission() {
    // Check if the browser supports media devices
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      console.log("Requesting microphone permission...");
  
      // Request permission for the microphone
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function(stream) {
          console.log("Microphone access granted.");
          startBlowDetection(stream); // Start blow detection if permission is granted
        })
        .catch(function(err) {
          console.log("Microphone access denied: " + err);
        });
    } else {
      console.log("getUserMedia not supported on your browser.");
    }
  }
  
  // Function to start blow detection after permission is granted
  function startBlowDetection(stream) {
    // Create audio context
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const microphone = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
  
    // Connect the microphone to the analyser
    microphone.connect(analyser);
  
    // Set up the analyser
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
  
    // Function to check for a loud noise (blow detection)
    function detectBlow() {
      analyser.getByteFrequencyData(dataArray);
      let sum = 0;
  
      // Calculate average volume of the microphone input
      for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i];
      }
      const averageVolume = sum / bufferLength;
  
      // If the average volume exceeds a threshold, consider it a blow
      if (averageVolume > 40) {  // Threshold can be adjusted
        blowOutCandle();
      }
  
      // Continue checking
      requestAnimationFrame(detectBlow);
    }
  
    // Start checking for microphone input
    detectBlow();
  }
  
  function blowOutCandle() {
    console.log("Happy birthday Winit!");

    // Stop the flame animation
    const flames = document.querySelectorAll('.fuego');
    flames.forEach(flame => {
        flame.style.animation = 'none';  // Stop the flame animation
        flame.style.opacity = 0;         // Make the flames disappear
    });

    // Start confetti effect
    const duration = 60 * 1000; // Duration of confetti (in milliseconds)
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 20, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 20 * (timeLeft / duration);

        // Generate confetti
        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            })
        );
        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            })
        );
    }, 250);
}

// Request microphone permission and start detection
function requestMicPermission() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        console.log("Requesting microphone permission...");

        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(function (stream) {
                console.log("Microphone access granted.");
                startBlowDetection(stream); // Start blow detection if permission is granted
            })
            .catch(function (err) {
                console.log("Microphone access denied: " + err);
            });
    } else {
        console.log("getUserMedia not supported on your browser.");
    }
}

// Function to start blow detection after permission is granted
function startBlowDetection(stream) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const microphone = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();

    microphone.connect(analyser);

    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function detectBlow() {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;

        for (let i = 0; i < bufferLength; i++) {
            sum += dataArray[i];
        }
        const averageVolume = sum / bufferLength;

        if (averageVolume > 40) {  // Threshold can be adjusted
            blowOutCandle();
        }

        requestAnimationFrame(detectBlow);
    }

    detectBlow();
}

// Call the function to request microphone permission
requestMicPermission();

  // Call the function to request microphone permission
  requestMicPermission();
  
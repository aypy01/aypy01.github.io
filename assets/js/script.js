// Get the canvas element by its correct ID
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

// Set canvas size to the window size
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// Characters for the Matrix rain effect
const letters = "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि 汝の権利はただ行為にのみあり、果実には決してあらず。行為の果実の原因となるなかれ、また不行為に執着することなかれ。" ;

const lettersArr = letters.split("");

const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = [];

// Initialize the drops for each column
for (let x = 0; x < columns; x++) {
  drops[x] = 1;
}

function draw() {
  // Semi-transparent black rectangle to fade the old characters
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Set the color and font for the new characters
  ctx.fillStyle = "#52d053";
  ctx.font = fontSize + "px monospace";

  // Loop through each drop to draw a new character
  for (let i = 0; i < drops.length; i++) {
    // Get a random character from the 'letters' string
    const text = lettersArr[Math.floor(Math.random() * lettersArr.length)];
    
    // Draw the character at the correct position
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    // Reset the drop to the top if it's off-screen
    // The random check adds a more scattered, "rainy" effect
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

// Call the draw function at a set interval
setInterval(draw, 33);

// Resize the canvas when the window is resized
window.addEventListener("resize", () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
});

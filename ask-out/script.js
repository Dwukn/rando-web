const foodEmojis = ['🍜', '🍣', '🍱', '🍕', '🍔', '🍖', '🍗', '🍝', '🌮', '🍩', '🍪', '🧁', '🍰'];
const foodContainer = document.querySelector('.food-container');

// Track how many times the "No" button is clicked
let noClickCount = 0;

// Add an event listener for the "No" button
document.getElementById('noBtn').addEventListener('click', () => {
    // Increase the "No" click count
    noClickCount++;

    // Make the "Yes" button bigger each time
    const yesBtn = document.getElementById('yesBtn');
    let currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
    let newSize = currentSize + (5 * noClickCount); // Increase the size by 5px per click

    // Set a maximum size limit (let's say 60px max)
    if (newSize > 60) newSize = 60;

    yesBtn.style.fontSize = `${newSize}px`;

    // Call the function to add food emojis to the background
    addFoodEmojisToBackground();
});

function addFoodEmojisToBackground() {
    // List of food emojis to randomly add
    // Function to add a food emoji to the background
    for (let i = 0; i < 10; i++) { // Add 10 food emojis randomly inside the container
        const foodEmoji = foodEmojis[Math.floor(Math.random() * foodEmojis.length)];

        // Ensure food items stay within the viewport by adjusting randomX and randomY
        const randomX = Math.floor(Math.random() * (window.innerWidth - 40)); // Avoid going out of bounds on the X axis
        const randomY = Math.floor(Math.random() * (window.innerHeight - 40)); // Avoid going out of bounds on the Y axis

        const emojiElement = document.createElement('div');
        emojiElement.style.position = 'absolute';
        emojiElement.style.top = `${randomY}px`; // Use px to ensure positioning within the viewport
        emojiElement.style.left = `${randomX}px`;
        emojiElement.style.fontSize = `${Math.random() * (4 - 1) + 1}em`; // Random size between 1em and 3em
        emojiElement.textContent = foodEmoji;

        // Append the emoji to the container
        document.querySelector('.container').appendChild(emojiElement);
    }
}


const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
let yesBtnSize = 1;

yesBtn.addEventListener('click', () => {
    // Create celebration effect with food
    const interval = setInterval(() => {
        createFoodParticle(
            Math.random() * window.innerWidth,
            Math.random() * window.innerHeight
        );
    }, 50);

    document.body.innerHTML = `
        <div style="height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;
                     background: #FFF5F5; font-family: 'Nunito', sans-serif;">
            <h1 style="color: #FF6B6B; font-size: 3em; text-align: center;">
                Yay! 🎉<br>
                First Stop: All You Can Eat! 🍜<br>
                <span style="font-size: 0.8em">P.S. You're the Perfect Snack! 🍪</span>
            </h1>
        </div>
    `;

    setTimeout(() => clearInterval(interval), 3000);
});

// Add floating food background
function createFloatingFood() {
    const food = document.createElement('div');
    food.className = 'food-item';
    food.textContent = foodEmojis[Math.floor(Math.random() * foodEmojis.length)];
    food.style.fontSize = '40px';

    // Randomize the starting X position to be within the viewport width (not off the screen)
    food.style.left = Math.random() * (window.innerWidth - 40) + 'px';  // -40 to prevent going off the screen on the right side

    // Set the initial Y position to be above the screen (negative value), and animate downward
    food.style.top = -40 + 'px';  // Start from just above the viewport

    // Set initial opacity to slightly transparent
    food.style.opacity = '0.6';

    // Add the food item to the container
    foodContainer.appendChild(food);

    const speed = 1 + Math.random();  // Randomize vertical speed
    const wobbleSpeed = 0.05;  // Speed of wobbling side to side
    let wobble = 0;
    let y = -40;  // Start at the top (above the screen)

    function animate() {
        y += speed;  // Move food item downwards over time
        wobble += wobbleSpeed;  // Wobble side to side

        const x = parseFloat(food.style.left) + Math.sin(wobble) * 2;  // Side-to-side wobble effect
        food.style.left = x + 'px';  // Update horizontal position
        food.style.top = y + 'px';  // Update vertical position

        // Apply rotation effect based on wobble
        food.style.transform = `rotate(${wobble * 10}deg)`;

        // Continue the animation as long as the food item is within the visible area
        if (y < window.innerHeight + 50) {  // Stop animating when it goes past the bottom
            requestAnimationFrame(animate);
        } else {
            food.remove();  // Remove the food item once it goes off-screen
        }
    }

    animate();
}

setInterval(createFloatingFood, 2000);

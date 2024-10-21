const adjectives = []; // Load from adjectives.txt
const nouns = []; // Load from nouns.txt

document.addEventListener("DOMContentLoaded", async () => {
    await loadWords();
    document.getElementById("generate").addEventListener("click", generatePassword);
    document.getElementById("copy").addEventListener("click", copyPassword);
    document.getElementById("copyFormat").addEventListener("click", copyFormattedPassword);
    document.getElementById("generate-api").addEventListener("click", generatePasswordViaAPI);
    // Set the default password length to 14
    document.getElementById("length").value = 14;
});

async function loadWords() {
    // Load words from the text files
    try {
        const [adjectiveResponse, nounResponse] = await Promise.all([
            fetch('adjectives.txt'),
            fetch('nouns.txt')
        ]);
        
        adjectives.push(...(await adjectiveResponse.text()).split('\n'));
        nouns.push(...(await nounResponse.text()).split('\n'));
    } catch (error) {
        console.error('Error loading words:', error);
    }
}

function generatePassword() {
    const length = parseInt(document.getElementById("length").value);
    const passwordParts = [];
    let totalLength = 0;
    
    while (totalLength < length - 3) { // Leave space for numbers and a symbol
        const word = getRandomWord();
        if (word) {
            passwordParts.push(capitalizeFirstLetter(word));
            totalLength += word.length;
        }
    }

    // Ensure at least 1 symbol and 2 numbers
    if (passwordParts.length < 8) {
        alert("Please increase the length to accommodate at least one word.");
        return;
    }
    
    const symbols = "!@#$%^&*()-_=+[]{}|;:,.<>?";
    const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
    const randomNumbers = generateRandomNumbers(2);
    
    const password = passwordParts.join('') + randomSymbol + randomNumbers;
    document.getElementById("password").value = password;

    addToHistory(password);
}

function generatePasswordViaAPI() {
    const length = document.getElementById("length").value || 12;  // Default to 12 if not provided
    const apiURL = `https://api.psswd.org/?length=${length}`;

    if (passwordParts.length < 8) {
        alert("Please increase the length to accommodate at least one word.");
        return;
    }

    // Fetch the password from the API
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            // Display the password in the result area
            document.getElementById("password").value = data;
        })
        .catch(error => {
            console.error('Error generating password via API:', error);
        });
}

function getRandomWord() {
    const allWords = [...adjectives, ...nouns];
    return allWords[Math.floor(Math.random() * allWords.length)].trim();
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function generateRandomNumbers(count) {
    let numbers = '';
    for (let i = 0; i < count; i++) {
        numbers += Math.floor(Math.random() * 10);
    }
    return numbers;
}

function addToHistory(password) {
    const historyContainer = document.getElementById("passwordHistory");

    // Check if the maximum number of history items has been reached
    if (historyContainer.children.length >= 5) {
        historyContainer.removeChild(historyContainer.lastChild); // Remove the oldest entry
    }

    // Create the new password entry
    const historyEntry = document.createElement("div");
    historyEntry.classList.add("history-entry");
    historyEntry.innerHTML = `
        <span>${password}</span>
        <div class="button-group">
            <button class="copyHistory">Copy</button>
            <button class="copyFormatHistory">Copy & Format</button>
        </div>
    `;

    // Prepend the new password entry to the top
    historyContainer.prepend(historyEntry);

    // Add event listeners for the new buttons
    historyEntry.querySelector('.copyHistory').addEventListener('click', () => copyPassword(password, historyEntry.querySelector('.copyHistory')));
    historyEntry.querySelector('.copyFormatHistory').addEventListener('click', () => copyFormattedPassword(password));
}

// Copy regular password
function copyPassword() {
    const password = document.getElementById("password").value;

    // Check if the Clipboard API is supported
    if (navigator.clipboard) {
        navigator.clipboard.writeText(password).then(() => {
            changeButtonText("copy"); // Show tick on Copy button
        }).catch(err => {
            console.error("Error copying password: ", err);
        });
    } else {
        fallbackCopyText(password, "copy");
    }
}

// Copy formatted password
function copyFormattedPassword() {
    const password = document.getElementById("password").value;
    const formattedText = `Login Details\nUsername: \nPassword: ${password}`;

    if (navigator.clipboard) {
        navigator.clipboard.writeText(formattedText).then(() => {
            changeButtonText("copyFormat"); // Show tick on Copy & Format button
        }).catch(err => {
            console.error("Error copying formatted password: ", err);
        });
    } else {
        fallbackCopyText(formattedText, "copyFormat");
    }
}

// Fallback method for older browsers without Clipboard API
function fallbackCopyText(text, buttonId) {
    const tempTextarea = document.createElement("textarea");
    tempTextarea.value = text;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextarea);

    // Show tick
    changeButtonText(buttonId);
}

function changeButtonText(buttonId) {
    const button = document.getElementById(buttonId);
    const originalText = button.getAttribute('data-original-text'); // Store original text

    // Save the original button text if not already saved
    if (!originalText) {
        button.setAttribute('data-original-text', button.textContent.trim());
    }

    // Hide the original text and show the tick
    button.textContent = ''; // Clear the button text temporarily

    // Create a tick element and append it to the button
    const tick = document.createElement('span');
    tick.innerHTML = '✓'; // Text tick
    button.appendChild(tick); // Append the tick to the button

    // After 1 second, remove the tick and restore the original text
    setTimeout(() => {
        tick.remove(); // Remove the tick
        button.textContent = button.getAttribute('data-original-text'); // Restore original text
    }, 1000); // Show the tick for 1 second
}
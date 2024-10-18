// frontend/script.js

const apiUrl = 'http://localhost:5000'; // Ensure your backend server is running
let userId = null; // Keep track of the logged-in user

// Register function
async function register() {
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;

    const response = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
        alert('Registration Successful! Please login.');
    } else {
        alert(`Error: ${data.error}`);
    }
}

// Login function
async function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
        alert('Login Successful!');
        userId = data.userId; // Capture the logged-in user's ID
        document.getElementById('mood-tracker').style.display = 'block';
        document.getElementById('expense-logger').style.display = 'block';
        document.getElementById('chatbot-section').style.display = 'block'; // Show the chatbot
        loadMoodHistory(); // Load previous moods
        loadExpenseHistory(); // Load previous expenses
    } else {
        alert(`Error: ${data.error}`);
    }
}

// Track Mood
async function trackMood() {
    const mood = document.getElementById('mood-input').value;

    const response = await fetch(`${apiUrl}/moods`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, mood }),
    });

    const data = await response.json();

    if (response.ok) {
        alert('Mood Tracked Successfully!');
        loadMoodHistory(); // Refresh mood history
    } else {
        alert(`Error: ${data.error}`);
    }
}

// Log Expense
async function logExpense() {
    const expense = document.getElementById('expense-input').value;

    const response = await fetch(`${apiUrl}/expenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, expense }),
    });

    const data = await response.json();

    if (response.ok) {
        alert('Expense Logged Successfully!');
        loadExpenseHistory(); // Refresh expense history
    } else {
        alert(`Error: ${data.error}`);
    }
}

// Load Mood History
async function loadMoodHistory() {
    const response = await fetch(`${apiUrl}/moods/${userId}`);
    const moods = await response.json();

    const moodHistoryDiv = document.getElementById('mood-history');
    moodHistoryDiv.innerHTML = '';
    moods.forEach(mood => {
        const moodItem = document.createElement('p');
        moodItem.textContent = `${mood.mood} (on ${new Date(mood.createdAt).toLocaleString()})`;
        moodHistoryDiv.appendChild(moodItem);
    });
}

// Load Expense History
async function loadExpenseHistory() {
    const response = await fetch(`${apiUrl}/expenses/${userId}`);
    const expenses = await response.json();

    const expenseHistoryDiv = document.getElementById('expense-history');
    expenseHistoryDiv.innerHTML = '';
    expenses.forEach(expense => {
        const expenseItem = document.createElement('p');
        expenseItem.textContent = `${expense.expense} (on ${new Date(expense.createdAt).toLocaleString()})`;
        expenseHistoryDiv.appendChild(expenseItem);
    });
}

// Chat with the Bot
async function chatWithBot() {
    const userMessage = document.getElementById('chat-input').value;
    const chatOutput = document.getElementById('chat-output');
  
    // Simulate chatbot response with predefined advice
    let botResponse = '';

    if (userMessage.toLowerCase().includes('stress')) {
        botResponse = "It sounds like you're stressed. Try taking deep breaths and giving yourself a break.";
    } else if (userMessage.toLowerCase().includes('anxiety')) {
        botResponse = "Anxiety can be tough. Consider practicing mindfulness or speaking to someone you trust.";
    } else if (userMessage.toLowerCase().includes('expense')) {
        botResponse = "It’s important to budget wisely. Try to track your expenses and focus on necessary items.";
    } else if (userMessage.toLowerCase().includes('mood')) {
        botResponse = "Mood swings happen to everyone. Maintaining a routine and getting enough sleep can help stabilize your mood.";
    } else {
        botResponse = "I’m here for you. It's okay to feel this way. Let’s focus on one step at a time.";
    }

    // Display both user message and bot response
    chatOutput.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
    chatOutput.innerHTML += `<p><strong>Chatbot:</strong> ${botResponse}</p>`;
    
    // Clear input
    document.getElementById('chat-input').value = '';
}

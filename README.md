
STAN Bot

STAN Bot is a simple chatbot demo built with Node.js, Express, and plain HTML/CSS/JavaScript.
It features a clean chat interface with a vertical gradient background (light blue and light pink), a single input box for messages, and styled chat bubbles for both user and bot responses.

---

Features

* Vertical gradient background (light blue top to light pink bottom)
* Single input box for messages
* Press Enter or click Send to submit
* User and bot messages displayed in chat bubbles
* Node.js and Express backend serving the frontend
* Simple /chat API endpoint returning a mock response

---

Screenshots

Chat Interface

[![Chat UI](https://raw.githubusercontent.com/SiddareddygariNavyasree/stan-bot/main/assets/Screenshot%201.png)](https://raw.githubusercontent.com/SiddareddygariNavyasree/stan-bot/main/assets/Screenshot%201.png)

Example Conversation

[![Conversation Example](https://raw.githubusercontent.com/SiddareddygariNavyasree/stan-bot/main/assets/Screenshot%202.png)](https://raw.githubusercontent.com/SiddareddygariNavyasree/stan-bot/main/assets/Screenshot%202.png)

----

Project Structure

stan-bot/
├── public/
│   └── index.html     (Frontend chat interface)
├── server.js          (Backend Express server with /chat route)
├── package.json       (Node.js dependencies)
├── assets/
│   ├── Screenshot 1.png (Chat UI screenshot)
│   └── Screenshot 2.png (Conversation example)
└── README.md          (Project documentation)

---

Setup Instructions

1. Clone the Repository
   git clone [https://github.com/SiddareddygariNavyasree/stan-bot.git](https://github.com/SiddareddygariNavyasree/stan-bot.git)
   cd stan-bot

2. Install Dependencies
   npm install

3. Run Locally
   node server.js

4. Open in Browser
   [http://localhost:3000](http://localhost:3000)

---

Usage

1. Open the chat app in your browser
2. Type a message in the single input box
3. Press Enter or click Send
4. Your message appears as a user bubble, and the bot replies in a bot bubble

---

Deployment
This project can be hosted on platforms such as:

* Render
* Vercel
* Heroku
* Any Node.js hosting platform

---


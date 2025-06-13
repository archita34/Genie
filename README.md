# Genie
A voice-activated shopping assistant built with Node.js, PostgreSQL, and Google Dialogflow.

## Features
- Add items to a shopping list via API (`POST /list`).
- Check inventory stock (`GET /inventory/:item`).
- User management (`POST /users`).

## Tech Stack
- Backend: Node.js, Express, Sequelize, PostgreSQL
- Tools: VS Code, Postman, Git

## Setup
1. Clone the repository: `git clone https://github.com/yourusername/Genie.git`
2. Install dependencies: `npm install`
3. Set up `.env` with database credentials.
4. Run the server: `npm run dev`
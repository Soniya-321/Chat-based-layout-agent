# Layout Agent

A chat-based AI layout agent that lets you transform design JSON using natural language.

## Prerequisites
- Node.js v18+
- An Groq API key (get one at https://console.groq.com)

## Setup

### 1. Clone the repo
git clone [https://github.com/Soniya-321/Chat-based-layout-agent.git](https://github.com/Soniya-321/Chat-based-layout-agent.git)

cd layout-agent

### 2. Backend
cd server

npm install

cp .env.example .env        # then add your API key inside

npm run dev

### 3. Frontend (new terminal)
cd client

npm install

npm run dev

### 4. Open the app
Visit http://localhost:5173

## Example Instructions to Try
- "Convert this design to 9:16"
- "Move the headline to the top"
- "Make the headline smaller"
- "Move the offer badge higher"
- "Keep the product large"
- "Make the discount badge bigger"
- "Center the product"
# AI Expense Categorizer (Gemini + React + Node.js)

This is a simple AI-powered expense categorizer. Users enter natural language like:

> "Paid ₹850 for Zomato dinner"

And the app returns:
- amount: ₹850
- category: Food
- summary: Zomato dinner

## Tech Stack
- React (frontend)
- Express (backend)
- Gemini API (LLM)
- Tailwind CSS

## How to Run
1. Clone the repo
2. Add `.env` in the server folder:
  GEMINI_API_KEY=your_google_api_key_here
3. Run backend:
```bash
cd server && npm install && node server.js
```
4. Run Frontend:
```bash
   cd client && npm install && npm run dev
```

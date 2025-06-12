InvestorBot – Minimal AI-Powered Startup Pitch Evaluator (Chat UI)

## 🧠 Overview

**InvestorBot** is a playful AI agent that simulates a startup investor.

> Users pitch their startup → AI asks 4–5 smart follow-up questions in a chat → if the idea scores well, it sends **TSD (test dollars)** via **Payman test wallet**.

- 🔥 Built with Node.js + React (chat interface)
- 💬 Powered by Google Gemini Pro for Q&A + evaluation
- 💳 Uses Payman SDK for secure test payments
- ⚡️ Deployed on Vercel using frontend + serverless API routes

---

## ✨ Features

- Chat-style UI for pitching your startup
- AI asks 4–5 dynamic follow-up questions
- User replies in a single smooth chat thread
- AI evaluates idea and scores it out of 10
- If score is high enough, bot sends $50–$100 TSD (test money)
- Shows transaction ID and confirmation using Payman SDK

---

## 🧱 Tech Stack

| Layer       | Tech Used                  |
|-------------|----------------------------|
| Frontend    | React + Vite + Tailwind    |
| Backend     | Node.js (API via Vercel)   |
| AI Model    | Google Gemini Pro          |
| Payments    | Payman SDK (test mode)     |
| Hosting     | Vercel (full-stack deploy) |
| State Mgmt  | React state / hooks        |

## 🔌 API Routes (Vercel Serverless)

- `POST /api/ask`  
  → Input: pitch text  
  → Output: 4–5 follow-up questions (Gemini)

- `POST /api/evaluate`  
  → Input: full Q&A thread  
  → Output: score + feedback (Gemini)

- `POST /api/pay`  
  → Input: user wallet + amount  
  → Output: transaction ID (Payman)

---

## 💳 Payman Integration

- Uses Payman **test mode** only (`PAYMAN_ENVIRONMENT=test`)
- Sends TSD from a fixed system wallet
- User must input their Payman test wallet address
- Shows transaction ID + status
- Fully secure, no real money
- **Official docs:** [Payman Quickstart](https://docs.paymanai.com/overview/quickstart)

## ⚙️ .env Example

```env
GEMINI_API_KEY=your_gemini_api_key
PAYMAN_CLIENT_ID=your_payman_client_id
PAYMAN_CLIENT_SECRET=your_payman_client_secret
PAYMAN_ENVIRONMENT=test
FROM_WALLET_ID=your_test_wallet_id
```

---

## 🚀 Deploy on Vercel

1. Clone repo to GitHub
2. Import to [vercel.com](https://vercel.com/)
3. Set environment variables in Vercel dashboard
4. Deploy project (both frontend and `/api` handled automatically)
5. Open app and start pitching!

---

## 🧪 Demo Chat Flow

1. **User**:

   > "A mental health companion that uses AI to check in with me and give support."

2. **InvestorBot (AI)**:

   > "How would you collect feedback to improve user experience?"
   > "What makes this different from existing AI therapists?"
   >
   > * 3 more

3. **User** answers all 5.

4. **InvestorBot (AI)**:

   > "8.5/10 – Good emotional value and niche targeting. Could scale well."

5. **Payment Sent**:
   `✅ $75 TSD sent to wallet 0x123...abc – Txn ID: 0xABCDEF123456`

## 🔐 Compliance & Safety

* 💵 All payments use **TSD (test sandbox money)** only
* 🔐 Payman test environment (SOC2/PCI-compliant)
* 🧠 Gemini prompts sanitized
* ⚠️ No autonomous access to real funds

---

## ✅ Summary

**InvestorBot** is a simple, chat-based AI project where creativity meets commerce. Users pitch their ideas, AI responds like an investor, and if impressed—sends money using Payman.

> 💡 A perfect blend of fun, function, and fintech—built to win hackathons.


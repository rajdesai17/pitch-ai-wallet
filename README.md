# AgentVC

A playful AI VC that evaluates your startup pitch, gives you blunt feedback, and (if it loves your idea) mock-funds you instantly with Payman.

---

## How it works

1. **Pitch your startup**  
   AgentVC asks you smart, spicy follow-up questions—just like a real VC.

2. **Get a score & feedback**  
   Receive a score out of 10 and honest, actionable feedback to help you improve.

3. **Mock funding with Payman**  
   If your idea scores 6 or higher, AgentVC sends you mock startup money (TSD) using the Payman SDK.

---

## How Payman is used

- The app uses the [Payman SDK](https://www.paymanai.com/) to simulate sending funds to your wallet.
- When your pitch is evaluated and scores 6+, you'll be prompted to enter a wallet address.
- The app calls Payman like this:

  ```js
  import { PaymanClient } from "@paymanai/payman-ts";

  const payman = PaymanClient.withCredentials({
    clientId: import.meta.env.VITE_PAYMAN_CLIENT_ID,
    clientSecret: import.meta.env.VITE_PAYMAN_CLIENT_SECRET,
  });

  // Later, when sending funds:
  const response = await payman.ask(`Send 100 TSD to <walletAddress>`);
  ```

- This is a mock/fake transaction for demo purposes.

---

## Getting started

1. **Install dependencies**

   ```sh
   npm install
   ```

2. **Set up your environment variables**

   Create a `.env` file with your Payman credentials:

   ```
   VITE_PAYMAN_CLIENT_ID=your_client_id
   VITE_PAYMAN_CLIENT_SECRET=your_client_secret
   ```

3. **Run the app**

   ```sh
   npm run dev
   ```

---

## Tech stack

- React + Vite
- TypeScript
- Tailwind CSS
- shadcn/ui
- Payman SDK

---

**Built with Payman SDK  
by @rajoninternet**

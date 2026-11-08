# Peer Skill Swap

This is a full-stack campus micro-mentorship platform we built for our Design Thinking for Innovation and Entrepreneurship (DTIE) course at REVA University. It lets college students connect with peers on campus for quick, focused skill-sharing sessions. <!--[cite: 1, 11] -->

## Try it out

*(Live Link: Coming soon once deployed!)*

## What it does

* **Accounts:** You can sign up and log in (passwords are hashed using bcrypt so they are secure).
* **Find Peers:** Search for students by specific skills (like C++, Python, or Figma) or browse by department. <!--[cite: 2, 3] -->
* **Micro Sessions:** You can book short 15–45 minute help sessions (on campus or online) instead of committing to long tutoring programs. <!--[cite: 2, 22] -->
* **Credit Economy:** Students start with 10 free credits. You spend 1 credit to request help, and earn credits back when you teach others. <!--[cite: 2] -->
* **Fast Updates:** Your dashboard instantly tracks your pending and accepted session requests.

## Stuff I used

* **Frontend:** React, Vite, Lucide Icons
* **Backend:** Node.js, Express
* **Database:** MongoDB (Mongoose)
* **Auth:** JSON Web Tokens (JWT)

## The Team 

* **Devansh Arora** – CEO <!--[cite: 9] -->
* **Jagannati Shauryavardhan** – CFO / CMO <!--[cite: 9] -->
* **Abhishek Donkennavavar** – COO / CTO <!--[cite: 9] -->
* **Atul Kumar Mishra** – Research & Documentation Lead <!--[cite: 9] -->
*(Faculty Mentor: Prof. Arati C.)* <!--[cite: 1] -->

## How to run it locally

1. Clone this repo.
2. Open a terminal, go into the `backend` folder, and run `npm install`.
3. Make a `.env` file in the `backend` folder and add your `MONGO_URI`, `PORT=5000`, and a `JWT_SECRET`.
4. Run `node seed.js` to populate test mentors, then run `npm run dev` to start the backend.
5. Open a second terminal, go into the `frontend` folder, and run `npm install`.
6. Run `npm run dev` and open `http://localhost:5173` in your browser.

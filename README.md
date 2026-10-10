# Task Manager App

This is a simple full-stack task manager I built while learning web development. It lets you create an account, log in, and keep track of your daily tasks.

## Try it out
Live Link: **https://dev-task-manager-71x9.onrender.com**

## What it does
* **Accounts:** You can sign up and log in (passwords are hashed so they are secure).
* **Manage Tasks:** You can add, edit, cross off, and delete your tasks.
* **Fast Updates:** The page updates instantly without needing to reload when you add or delete something.

## Stuff I used
* **Frontend:** HTML, CSS, Vanilla JS
* **Backend:** Node.js, Express
* **Database:** MongoDB
* **Hosting:** Render

## How to run it locally
1. Clone this repo.
2. Run `npm install` to download the packages.
3. Make a `.env` file and add your `MONGO_URI`, `PORT=5000`, and a `JWT_SECRET`.
4. Run `npm run dev` and open `http://localhost:5000` in your browser.

import { initializeApp } from
"https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";

import {
getAuth,
sendSignInLinkToEmail,
isSignInWithEmailLink,
signInWithEmailLink
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

const OWNER_EMAIL = "sushantyt6769@gmail.com";

const firebaseConfig = {
apiKey: "YOUR_API_KEY",
authDomain: "YOUR_PROJECT.firebaseapp.com",
projectId: "YOUR_PROJECT_ID",
appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const settings = {
url: window.location.origin,
handleCodeInApp: true
};

window.ownerLogin = async function () {
const email = document
  .getElementById("ownerEmail").value.trim().toLowerCase();

if (email !== OWNER_EMAIL) {
  alert("This Gmail is not authorized.");
  return;
}

try {
  await sendSignInLinkToEmail(auth, email, settings);
  window.localStorage.setItem("ownerEmailForSignIn", email);
  alert("Login link sent! Check your Gmail.");
} catch (error) {
  alert(error.message);
}
};

async function completeOwnerLogin() {
if (!isSignInWithEmailLink(auth, window.location.href)) return;

const email = window.localStorage.getItem("ownerEmailForSignIn");

if (!email) return;

try {
  const result = await signInWithEmailLink(
    auth, email, window.location.href
  );

  window.localStorage.removeItem("ownerEmailForSignIn");

  const token = await result.user.getIdToken();

  const response = await fetch("/api/me", {
    headers: { Authorization: "Bearer " + token }
  });

  const data = await response.json();

  alert(data.role === "OWNER"
    ? "Welcome, NexoraAI Owner! 👑"
    : "Access denied.");
} catch (error) {
  alert(error.message);
}
}

completeOwnerLogin();

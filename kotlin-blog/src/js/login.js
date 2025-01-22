import { auth } from './app.js';
import { signInWithEmailAndPassword } from 'firebase/auth';

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert('Login successful!');
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Login failed:', error);
        alert('Invalid email or password.');
    }
});

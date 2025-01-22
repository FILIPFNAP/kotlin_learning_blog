import { db } from './app.js';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const postForm = document.getElementById('post-form');

postForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = postForm.title.value;
    const content = postForm.content.value;
    const createdAtInput = document.getElementById('created-at').value;

    // Convert the datetime-local value to a Firebase Timestamp
    const createdAt = createdAtInput ? Timestamp.fromDate(new Date(createdAtInput)) : Timestamp.now();

    try {
        await addDoc(collection(db, 'posts'), {
            title,
            content,
            createdAt,
        });
        alert('Post added successfully!');
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Error adding post:', error);
        alert('Failed to add post. Please try again.');
    }
});
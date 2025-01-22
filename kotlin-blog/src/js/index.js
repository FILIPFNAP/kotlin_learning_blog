import { db } from './app.js';
import { collection, getDocs } from 'firebase/firestore';

const postList = document.getElementById('post-list');

async function loadPosts() {
    try {
        const querySnapshot = await getDocs(collection(db, 'posts'));
        postList.innerHTML = ''; // Clear existing posts
        querySnapshot.forEach(doc => {
            const post = doc.data();
            const postLink = document.createElement('a');
            postLink.href = `post.html?id=${doc.id}`;
            postLink.innerText = post.title;
            postList.appendChild(postLink);
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
        alert('Failed to load posts.');
    }
}

loadPosts();


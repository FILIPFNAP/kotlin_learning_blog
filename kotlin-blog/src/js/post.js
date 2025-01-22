import { db } from './app.js';
import { doc, getDoc } from 'firebase/firestore';

const params = new URLSearchParams(window.location.search);
const postId = params.get('id');
const postTitle = document.getElementById('post-title');
const postContent = document.getElementById('post-content');

async function loadPost() {
    if (postId) {
        const postRef = doc(db, 'posts', postId);
        const postSnap = await getDoc(postRef);
        if (postSnap.exists()) {
            const post = postSnap.data();
            postTitle.innerText = post.title;
            postContent.innerHTML = `
                <p>${post.content}</p>
                <p class="text-gray-400 text-sm mt-4">Created At: ${post.createdAt.toDate().toLocaleString()}</p>
            `;
        } else {
            alert('Post not found!');
        }
    }
}

loadPost();

import React, { useEffect, useState } from 'react';
import { db } from './js/app';
import { collection, getDocs } from 'firebase/firestore';

function App() {
    const [posts, setPosts] = useState([]); // State to store posts
    const [error, setError] = useState(null); // State to store errors

    useEffect(() => {
        async function fetchPosts() {
            try {
                const querySnapshot = await getDocs(collection(db, 'posts'));
                const fetchedPosts = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setPosts(fetchedPosts);
            } catch (err) {
                console.error('Error fetching posts:', err);
                setError('Failed to load posts.');
            }
        }

        fetchPosts();
    }, []); // Empty dependency array ensures this runs once after component mounts

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-6">
            <div className="w-full max-w-4xl">
                <h1 className="text-4xl font-extrabold text-center text-blue-400 mb-8">
                    My Kotlin Learning Journey
                </h1>
                <ul className="space-y-6">
                    {posts.map(post => (
                        <li
                            key={post.id}
                            className="bg-gray-800 p-6 shadow-lg rounded-lg border border-gray-700 mx-auto w-full sm:w-3/4 md:w-2/3 hover:shadow-xl transition-shadow"
                        >
                            <a
                                href={`post.html?id=${post.id}`}
                                className="text-blue-300 font-medium hover:underline hover:text-blue-500 block text-center"
                            >
                                {post.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
    
    
}

export default App;

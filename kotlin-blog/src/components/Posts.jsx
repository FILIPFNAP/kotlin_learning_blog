import React, { useEffect, useState } from 'react';
import { db, auth } from '../js/app'; // Import auth from your app.js
import { collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch posts from Firestore
        async function fetchPosts() {
            try {
                const querySnapshot = await getDocs(collection(db, 'posts'));
                const fetchedPosts = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setPosts(fetchedPosts);
            } catch (err) {
                console.error('Error fetching posts:', err);
                setError('Failed to load posts.');
            }
        }

        fetchPosts();

        // Listen for authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAuthenticated(!!user); // Set authentication state
        });

        return () => unsubscribe(); // Cleanup listener on component unmount
    }, []);

    const handleAddPostClick = () => {
        console.log('Button clicked, isAuthenticated:', isAuthenticated);
        if (isAuthenticated) {
            navigate('/admin'); // Redirect to admin page
        } else {
            navigate('/login'); // Redirect to login page
        }
    };

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
                    {posts.map((post) => (
                        <li
                            key={post.id}
                            className="bg-gray-800 p-6 shadow-lg rounded-lg border border-gray-700 mx-auto w-full sm:w-3/4 md:w-2/3 hover:shadow-xl transition-shadow"
                        >
                            <Link
                                to={`/post/${post.id}`} // Use `to` for React Router navigation
                                className="text-blue-300 font-medium hover:underline hover:text-blue-500 block text-center"
                            >
                                {post.title}
                            </Link>
                        </li>   
                    ))}
                </ul>
            </div>

            {/* Floating Plus Button */}
            <button
                onClick={handleAddPostClick}
                style={{ zIndex: 100, backgroundColor: 'red' }}
                className="fixed bottom-6 left-6 bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl shadow-lg hover:bg-blue-600 transition-colors"
            >
                +
            </button>
        </div>
    );
};

export default Posts;

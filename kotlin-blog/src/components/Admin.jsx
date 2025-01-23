import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../js/app'; // Adjust paths as needed
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Admin = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [error, setError] = useState(null);

    // Check if the user is authenticated
    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate('/login'); // Redirect to login if not authenticated
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const createdTimestamp = createdAt
                ? Timestamp.fromDate(new Date(createdAt))
                : Timestamp.now();

            await addDoc(collection(db, 'posts'), {
                title,
                content,
                createdAt: createdTimestamp,
            });

            alert('Post added successfully!');
            navigate('/'); // Redirect to the home page
        } catch (err) {
            console.error('Error adding post:', err);
            setError('Failed to add post. Please try again.');
        }
    };

    // Handle logout
    const handleLogout = async () => {
        try {
            await signOut(auth);
            alert('You have been logged out.');
            navigate('/login'); // Redirect to login page
        } catch (err) {
            console.error('Error during logout:', err);
            setError('Failed to log out. Please try again.');
        }
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-6">
            <div className="w-full max-w-4xl">
                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="absolute top-6 right-6 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                >
                    Logout
                </button>
                <h1 className="text-4xl font-extrabold text-center text-blue-400 mb-8">
                    Add a New Blog Post
                </h1>
                <form
                    onSubmit={handleSubmit}
                    className="bg-gray-800 p-6 shadow-lg rounded-lg border border-gray-700 space-y-4"
                >
                    <div>
                        <label htmlFor="title" className="block text-blue-300 font-medium">
                            Title:
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="content" className="block text-blue-300 font-medium">
                            Content:
                        </label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows="10"
                            className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="created-at" className="block text-blue-300 font-medium">
                            Created At:
                        </label>
                        <input
                            type="datetime-local"
                            id="created-at"
                            value={createdAt}
                            onChange={(e) => setCreatedAt(e.target.value)}
                            className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Add Post
                    </button>
                </form>
                {error && <p className="text-red-500 mt-4">{error}</p>}
                <button
                    onClick={() => navigate('/')}
                    className="block mt-6 text-blue-400 hover:underline text-center"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default Admin;

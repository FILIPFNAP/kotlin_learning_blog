import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../js/app';

const Post = () => {
    const { id } = useParams(); // Retrieve the post ID from the URL
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const postRef = doc(db, 'posts', id);
                const postSnap = await getDoc(postRef);
                if (postSnap.exists()) {
                    setPost(postSnap.data());
                } else {
                    setError('Post not found!');
                }
            } catch (err) {
                console.error('Error fetching post:', err);
                setError('Failed to load post.');
            }
        };

        if (id) {
            fetchPost();
        }
    }, [id]);

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!post) {
        return <p>Loading...</p>;
    }

    return (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-6">
            <div className="w-full max-w-4xl">
                <h1 className="text-4xl font-extrabold text-center text-blue-400 mb-8">
                    {post.title}
                </h1>
                <div className="bg-gray-800 p-6 shadow-lg rounded-lg border border-gray-700">
                    <p className="text-lg text-gray-200">{post.content}</p>
                    <p className="text-gray-400 text-sm mt-4">
                        Created At: {post.createdAt ? post.createdAt.toDate().toLocaleString() : 'Unknown'}
                    </p>
                </div>
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

export default Post;

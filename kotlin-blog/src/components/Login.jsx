import React, { useState } from 'react';
import { auth } from '../js/app';// Adjust the path based on your Firebase setup
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate(); // Initialize navigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert('Login successful!');
            navigate('/'); // Redirect to the posts page
        } catch (error) {
            console.error('Login failed:', error);
            alert('Invalid email or password.');
        }
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen w-full flex items-center justify-center p-4">
            <div className="bg-gray-800 shadow-xl rounded-2xl border border-gray-700 p-10 flex flex-col items-center w-full max-w-2xl mx-auto">
                <div className="mb-6">
                    <i className="fas fa-user-circle text-blue-400 text-7xl"></i>
                </div>
                <h1 className="text-2xl font-bold text-center text-white mb-6">Admin Login</h1>
                <form onSubmit={handleSubmit} className="w-full space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm text-blue-300 font-medium mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            className="w-full p-4 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="relative">
                        <label htmlFor="password" className="block text-sm text-blue-300 font-medium mb-2">Password</label>
                        <div className="relative w-full">
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                id="password"
                                placeholder="Enter your password"
                                className="w-full p-4 pr-12 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400"
                                onClick={() => setPasswordVisible(!passwordVisible)}
                            >
                                <i className={`fas ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-medium py-3 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;

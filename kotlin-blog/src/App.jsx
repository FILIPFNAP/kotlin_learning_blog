import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Posts from './components/Posts';
import Post from './components/Post';
import Login from './components/Login';
import Admin from './components/Admin';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Posts />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/post/:id" element={<Post />} />
            </Routes>
        </Router>
    );
};

export default App;

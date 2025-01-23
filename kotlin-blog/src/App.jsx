import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Posts from './components/Posts';
import Login from './components/Login';
import Admin from './components/Admin';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Posts />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </Router>
    );
};

export default App;

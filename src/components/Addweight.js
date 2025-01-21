// AddWeight Component
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function AddWeight() {
    const [weight, setWeight] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
            navigate('/login');
        }
    }, [navigate]);

    const handleAddWeight = (e) => {
        e.preventDefault();

        if (weight <= 0) {
            setMessage('Weight must be a positive number!');
            return;
        }

        const email = localStorage.getItem('loggedInUser');
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find((u) => u.email === email);

        const today = new Date().toISOString().split('T')[0]; // ISO 8601 date (YYYY-MM-DD)

        const existingEntry = user.weights.find((entry) => entry.date === today);

        if (existingEntry) {
            setMessage('Weight for today is already recorded!');
            return;
        }

        user.weights.push({ date: today, weight: parseFloat(weight) });
        localStorage.setItem('users', JSON.stringify(users));
        setMessage('Weight added successfully!');
        navigate('/dashboard');
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <h2 className="text-center mb-4">Add Weight</h2>
                <form onSubmit={handleAddWeight} className="d-flex flex-column align-items-center">
                    <div className="mb-3 w-50">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Weight (kg)"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-50">
                        Add Weight
                    </button>
                </form>
                {message && (
                    <div className={`alert mt-3 w-100 text-center ${message.includes('successfully') ? 'alert-success' : 'alert-danger'}`}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AddWeight;




























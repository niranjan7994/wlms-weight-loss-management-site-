import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';

function EditWeight() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [weight, setWeight] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
            navigate('/login');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find((u) => u.email === loggedInUser);

        if (!user) {
            setErrorMessage('User data not found.');
            return;
        }

        
        const weightEntry = user.weights.find((entry, index) => index === parseInt(id, 10));

        if (!weightEntry) {
            setErrorMessage('Weight entry not found.');
            return;
        }

        setWeight(weightEntry.weight); 
    }, [id, navigate]);

    const handleUpdate = (e) => {
        e.preventDefault();
        const loggedInUser = localStorage.getItem('loggedInUser');
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex((u) => u.email === loggedInUser);

        if (userIndex === -1) {
            setErrorMessage('User not found.');
            return;
        }

        
        users[userIndex].weights[parseInt(id, 10)].weight = parseFloat(weight);
        localStorage.setItem('users', JSON.stringify(users));
        navigate('/dashboard'); 
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <h2 className="text-center mb-4">Edit Weight</h2>
                {errorMessage ? (
                    <div className="alert alert-danger text-center">{errorMessage}</div>
                ) : (
                    <form onSubmit={handleUpdate} className="d-flex flex-column align-items-center">
                        <div className="mb-3 w-50">
                            <label className="form-label">Weight (kg)</label>
                            <input
                                type="number"
                                className="form-control"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                step="0.1"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-50">
                            Update
                        </button>
                    </form>
                )}
                <div className="text-center mt-4">
                    <button
                        className="btn btn-secondary"
                        onClick={() => navigate('/dashboard')}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditWeight;















































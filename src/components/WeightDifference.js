import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function WeightDifference() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [difference, setDifference] = useState(null);
    const [changeMessage, setChangeMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [minStartDate, setMinStartDate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
            navigate('/login');
        } else {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find((u) => u.email === loggedInUser);

            if (user && user.weights.length > 0) {
                const earliestDate = user.weights.reduce((earliest, current) => {
                    const currentDate = new Date(current.date);
                    return currentDate < earliest ? currentDate : earliest;
                }, new Date());

                const formattedDate = earliestDate.toISOString().split('T')[0];
                setMinStartDate(formattedDate);
            }
        }
    }, [navigate]);

    const calculateDifference = (e) => {
        e.preventDefault();
        const email = localStorage.getItem('loggedInUser');
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find((u) => u.email === email);
    
        if (!user) {
            setErrorMessage('User data not found.');
            setChangeMessage('');
            setDifference(null);
            return;
        }
    
        const parseDate = (dateString) => {
            return new Date(dateString); 
        };
    
        
        const weightsInRange = user.weights.filter((entry) => {
            const entryDate = parseDate(entry.date);
            const start = new Date(startDate);
            const end = new Date(endDate);
            return entryDate >= start && entryDate <= end;
        });
    
        
        const startWeightEntry = weightsInRange.find(
            (entry) => parseDate(entry.date).toISOString().split('T')[0] === startDate
        );
    
        if (!startWeightEntry) {
            setErrorMessage('No data recorded for the start date.');
            setChangeMessage('');
            setDifference(null);
            return;
        }
    
        
        if (weightsInRange.length < 2) {
            setErrorMessage('Not enough data to calculate weight difference.');
            setChangeMessage('');
            setDifference(null);
            return;
        }
    
        
        weightsInRange.sort((a, b) => {
            return parseDate(a.date) - parseDate(b.date);
        });
    
        const startWeight = parseFloat(weightsInRange[0].weight);
        const endWeight = parseFloat(weightsInRange[weightsInRange.length - 1].weight);
    
        const diff = endWeight - startWeight;
        setDifference(Math.abs(diff).toFixed(1)); 
    
        if (diff > 0) {
            setChangeMessage(`Your weight increased by ${Math.abs(diff).toFixed(1)} kg.`);
        } else if (diff < 0) {
            setChangeMessage(`Your weight decreased by ${Math.abs(diff).toFixed(1)} kg.`);
        } else {
            setChangeMessage(`Your weight stayed the same.`);
        }
    
        setErrorMessage('');
    };
    
    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <h2 className="text-center mb-4">Weight Difference</h2>
                <form onSubmit={calculateDifference} className="d-flex flex-column align-items-center">
                    <div className="mb-3 w-50">
                        <label className="form-label">Start Date</label>
                        <input
                            type="date"
                            className="form-control"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                            min={minStartDate}
                        />
                    </div>
                    <div className="mb-3 w-50">
                        <label className="form-label">End Date</label>
                        <input
                            type="date"
                            className="form-control"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                            min={startDate || minStartDate}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-50">
                        Calculate
                    </button>
                </form>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                {difference && <div className="alert alert-info">Weight Difference is {difference} kg</div>}
                {changeMessage && <div className="alert alert-success">{changeMessage}</div>}
            </div>
        </div>
    );
}

export default WeightDifference;






























import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { NavLink } from 'react-router-dom';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const existingUser = users.find(user => user.email === email);

        if (existingUser) {
            setMessage('User already exists!');
            return;
        }

        users.push({ email, password, weights: [] });
        localStorage.setItem('users', JSON.stringify(users));
        setMessage('Signup successful!');
        navigate('/login');
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title text-center mb-4">Signup</h2>
                                {message && (
                                    <div className={`alert ${message === 'Signup successful!' ? 'alert-success' : 'alert-danger'}`} role="alert">
                                        {message}
                                    </div>
                                )}
                                <form onSubmit={handleSignup}>
                                    <div className="form-group mb-3">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="form-control"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            id="password"
                                            className="form-control"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="d-grid">
                                        <button type="submit" className="btn btn-primary w-100">Signup</button>
                                    </div>
                                </form>
                                <p className="mt-3 text-center">
                                    Already have an account?{' '}
                                    <NavLink to={"/login"} className={ 'nav-link '+(status => status.isActive ? 'active' : '')}> Login
               </NavLink>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;

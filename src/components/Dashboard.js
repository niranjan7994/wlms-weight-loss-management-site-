import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function Dashboard() {
    const [weights, setWeights] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const weightsPerPage = 3;
    const navigate = useNavigate();

    useEffect(() => {
        const email = localStorage.getItem('loggedInUser');
        if (!email) {
            navigate('/login');
            return;
        }
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find((u) => u.email === email);

        
        setWeights(user?.weights ? [...user.weights].reverse() : []);
    }, [navigate]);

    const handleDelete = (index) => {
        if (window.confirm('Are you sure you want to delete this entry?')) {
            const email = localStorage.getItem('loggedInUser');
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find((u) => u.email === email);
            user.weights.splice(weights.length - 1 - index, 1); 
            localStorage.setItem('users', JSON.stringify(users));

            
            setWeights([...user.weights].reverse());
        }
    };

    const indexOfLastWeight = currentPage * weightsPerPage;
    const indexOfFirstWeight = indexOfLastWeight - weightsPerPage;
    const currentWeights = weights.slice(indexOfFirstWeight, indexOfLastWeight);

    const totalPages = Math.ceil(weights.length / weightsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-4 text-center">
                <h2 className="mb-4">Dashboard</h2>

                {weights.length === 0 ? (
                    <div className="alert alert-info">
                        <p>No weights found. Start adding some weight!</p>
                    </div>
                ) : (
                    <>
                        <ul className="list-group mb-4">
                            {currentWeights.map((entry, index) => (
                                <li
                                    key={index}
                                    className="list-group-item d-flex justify-content-between align-items-center"
                                >
                                    <span>{entry.date}: {entry.weight} kg</span>
                                    <div>
                                        <button
                                            className="btn btn-warning btn-sm mx-2"
                                            onClick={() =>
                                                navigate(`/edit-weight/${weights.length - 1 - (indexOfFirstWeight + index)}`)
                                            }
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(indexOfFirstWeight + index)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="d-flex justify-content-center align-items-center mb-4">
                            <button
                                className="btn btn-outline-secondary me-2"
                                onClick={handlePrev}
                                disabled={currentPage === 1}
                            >
                                Prev
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    className={`btn ${
                                        currentPage === i + 1 ? 'btn-primary' : 'btn-outline-primary'
                                    } mx-1`}
                                    onClick={() => paginate(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                className="btn btn-outline-secondary ms-2"
                                onClick={handleNext}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}

                <div className="mt-3">
                    <button className="btn btn-success mx-2" onClick={() => navigate('/add-weight')}>
                        Add Weight
                    </button>
                    <button className="btn btn-info mx-2" onClick={() => navigate('/weight-difference')}>
                        Weight Difference
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;


































// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navbar from './Navbar';

// function Dashboard() {
//     const [weights, setWeights] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const weightsPerPage = 3;
//     const navigate = useNavigate();

//     useEffect(() => {
//         const email = localStorage.getItem('loggedInUser');
//         if (!email) {
//             navigate('/login');
//             return;
//         }
//         const users = JSON.parse(localStorage.getItem('users')) || [];
//         const user = users.find(u => u.email === email);
//         setWeights(user.weights);
//     }, [navigate]);

//     // const handleLogout = () => {
//     //     localStorage.removeItem('loggedInUser');
//     //     navigate('/login');
//     // };

//     // const handleEdit = (index) => {
//     //     const newWeight = prompt('Enter the new weight:');
//     //     if (newWeight) {
//     //         const email = localStorage.getItem('loggedInUser');
//     //         const users = JSON.parse(localStorage.getItem('users')) || [];
//     //         const user = users.find(u => u.email === email);
//     //         user.weights[index].weight = newWeight;
//     //         localStorage.setItem('users', JSON.stringify(users));
//     //         setWeights([...user.weights]);
//     //     }
//     // };

//     const handleDelete = (index) => {
//         if (window.confirm('Are you sure you want to delete this entry?')) {
//             const email = localStorage.getItem('loggedInUser');
//             const users = JSON.parse(localStorage.getItem('users')) || [];
//             const user = users.find(u => u.email === email);
//             user.weights.splice(index, 1);
//             localStorage.setItem('users', JSON.stringify(users));
//             setWeights([...user.weights]);
//         }
//     };

//     const indexOfLastWeight = currentPage * weightsPerPage;
//     const indexOfFirstWeight = indexOfLastWeight - weightsPerPage;
//     const currentWeights = weights.slice(indexOfFirstWeight, indexOfLastWeight);

//     const totalPages = Math.ceil(weights.length / weightsPerPage);

//     const paginate = (pageNumber) => setCurrentPage(pageNumber);

//     const handlePrev = () => {
//         if (currentPage > 1) setCurrentPage(currentPage - 1);
//     };

//     const handleNext = () => {
//         if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//     };

//     return (
//         <div>
//             <Navbar />
//             <div className="container mt-4 text-center">
//                 <h2 className="mb-4">Dashboard</h2>
                
//                 <ul className="list-group mb-4">
//                     {currentWeights.map((entry, index) => (
//                         <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
//                             <span>{entry.date}: {entry.weight} kg</span>
//                             <div>
//                                 <button className="btn btn-warning btn-sm mx-2" onClick={() => navigate(`/edit-weight/${index}`)}>Edit</button>
//                                 <button className="btn btn-danger btn-sm" onClick={() => handleDelete(indexOfFirstWeight + index)}>Delete</button>
//                             </div>
//                         </li>
//                     ))}
//                 </ul>

//                 <div className="d-flex justify-content-center align-items-center mb-4">
//                     <button
//                         className="btn btn-outline-secondary me-2"
//                         onClick={handlePrev}
//                         disabled={currentPage === 1}
//                     >
//                         Prev
//                     </button>
//                     {Array.from({ length: totalPages }, (_, i) => (
//                         <button
//                             key={i}
//                             className={`btn ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline-primary'} mx-1`}
//                             onClick={() => paginate(i + 1)}
//                         >
//                             {i + 1}
//                         </button>
//                     ))}
//                     <button
//                         className="btn btn-outline-secondary ms-2"
//                         onClick={handleNext}
//                         disabled={currentPage === totalPages}
//                     >
//                         Next
//                     </button>
//                 </div>

//                 <div className="mt-3">
//                     <button className="btn btn-success mx-2" onClick={() => navigate('/add-weight')}>Add Weight</button>
//                     <button className="btn btn-info mx-2" onClick={() => navigate('/weight-difference')}>Weight Difference</button>
//                     {/* <button className="btn btn-danger mx-2" onClick={handleLogout}>Logout</button> */}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Dashboard;

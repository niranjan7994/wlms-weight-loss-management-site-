import React from 'react';
import Navbar from './components/Navbar';


function App() {
    
    return (
        <div>
            <Navbar />
            <div className="container text-center d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
                <h1 className="display-4 fw-bold mb-3">DIETZONE</h1>
                <p className="lead mb-4">Your Personal Partner in Weight Loss Management</p>
            </div>
        </div>
    );
}

export default App;































// import React, { useState, useEffect } from 'react';
// import Navbar from './components/Navbar';
// import { useNavigate } from 'react-router-dom';

// function App() {
//     // const navigate = useNavigate();
//     // // const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

//     // // // Check if a user is logged in on component mount
//     // // useEffect(() => {
//     // //     const loggedInUser = localStorage.getItem('loggedInUser');
//     // //     setIsLoggedIn(!!loggedInUser); // Set state to true if a user is logged in
//     // // }, []);

//     // // // Handle logout action
//     // // const handleLogout = () => {
//     // //     localStorage.removeItem('loggedInUser'); // Remove user data from localStorage
//     // //     setIsLoggedIn(false); // Update state
//     // //     navigate('/'); // Redirect to the home page
//     // // };

//     return (
//         <div>
//             <Navbar />
//             <div className="container text-center d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
//                 <h1 className="display-4 fw-bold mb-3">DIETZONE</h1>
//                 <p className="lead mb-4">Your Personal Partner in Weight Loss Management</p>
//                 {/* <div>
//                     {!isLoggedIn ? (
//                         <>
//                             <button
//                                 className="btn btn-primary btn-lg mx-2"
//                                 onClick={() => navigate('/login')}
//                             >
//                                 Login
//                             </button>
//                             <button
//                                 className="btn btn-secondary btn-lg mx-2"
//                                 onClick={() => navigate('/signup')}
//                             >
//                                 Signup
//                             </button>
//                         </>
//                     ) : (
//                         <button
//                             className="btn btn-danger btn-lg mx-2"
//                             onClick={handleLogout}
//                         >
//                             Logout
//                         </button>
//                     )}
//                 </div> */}
//             </div>
//         </div>
//     );
// }

// export default App;

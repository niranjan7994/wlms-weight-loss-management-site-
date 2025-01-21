import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard"
import Addweight from "./components/Addweight"
import WeightDifference  from "./components/WeightDifference"
import EditWeight from "./components/EditWeight";


const router = createBrowserRouter([
    { path: '', element: <App/> },
    { path: 'signup', element: <Signup/> },
    { path: 'login', element: <Login/> },
    { path: 'dashboard', element: <Dashboard/> },
    { path: 'add-weight', element: <Addweight/> },
    {path:'weight-difference',element:<WeightDifference/>},
    {path:'edit-weight/:id',element:<EditWeight/>}
    
]);

export default router;
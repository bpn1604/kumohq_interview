import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from './Product';
import "../index.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check local storage for logged-in state when component mounts
        const loggedIn = localStorage.getItem('isLoggedIn');
        if (loggedIn === 'true') {
            setIsLoggedIn(true);
        }
    }, [isLoggedIn]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("https://visually-real-seal.ngrok-free.app/api/auth/sign_in", {
            email,
            password
        }).then((res) => {
            if (res.data.status === 200) {
                setIsLoggedIn(true);
                setErrors(false);
                localStorage.setItem('isLoggedIn', 'true'); // Save login state in local storage
            } else {
                setErrors(true);
                setIsLoggedIn(false);
                localStorage.setItem('isLoggedIn', 'false');
            }
        }).catch((error) => {
            setErrors(true);
            setIsLoggedIn(false);
            localStorage.setItem('isLoggedIn', 'false');
        });
    };

    // Render the product page if logged in
    if (isLoggedIn) {
        return <Product />;
    }

    // Render the login form otherwise
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100" style={{width:"40%", margin:"15%", marginLeft:"500px"}}>
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md" style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}>
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <p className="block text-gray-700">Email</p>
                        <input
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            type='email'
                            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="email"
                            style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}
                        />
                    </div>
                    <div>
                        <p className="block text-gray-700">Password</p>
                        <input
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            type='password'
                            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="password"
                        />
                    </div>
                    <button
                        type="submit"
                        style={{background:"blue" , color:"white", margin:"20px", borderRadius:'5px', fontFamily:"sans-serif" ,fontWeight:'bold', fontSize:"20px"}} 
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition duration-300 transform hover:scale-105"
                    >
                        Submit
                    </button>
                </form>
                {errors && <p className="mt-4 text-red-600">Invalid login credentials. Please try again.</p>}
            </div>
        </div>
    );
};

export default Login;

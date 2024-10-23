import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { ClipLoader } from 'react-spinners'; 

export default function SignUp() {
    const [signupCredentials, setSignupCredentials] = useState({ name: "", email: "", password: "" });
    const [visible, setVisible] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState(""); // Password validation message
    const [isPasswordValid, setIsPasswordValid] = useState(false); // Track password validity
    const [loading, setLoading] = useState(false); 

    const navigate = useNavigate();

    const onChange = (e) => {
        const { name, value } = e.target;
        setSignupCredentials({ ...signupCredentials, [name]: value });

        if (name === "password") {
            validatePassword(value); // Validate password as user types
        }
    };

    // Password validation logic
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{6,}$/;

        if (!passwordRegex.test(password)) {
            setPasswordMessage("Password must be at least 6 characters long, include a digit, and a special character.");
            setIsPasswordValid(false);
        } else {
            setPasswordMessage(""); 
            setIsPasswordValid(true);
        }
    };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        if (!isPasswordValid) {
            alert("Please provide a valid password");
            return;
        }

        setLoading(true); 

        try {
            const response = await axios.post('http://localhost:5000/user/signup', signupCredentials);

            if (response.status === 201) {
                if (response.data.token) {
                    localStorage.setItem("token", response.data.token);
                    axios.defaults.headers.common[
                      "Authorization"
                    ] = `Bearer ${response.data.token}`;
                    navigate("/loan-application");
                }
                alert("Sign up successful");
                navigate('/loan-application', { state: { email: signupCredentials.email } });
            } else if (response.data.message === 'User already exists') {
                alert("User already exists");
            } else {
                alert("Cannot sign up: " + response.data.message);
            }
        } catch (error) {
            console.error("Error during sign-up:", error);
            alert(error.response?.data?.message || "An error occurred during sign-up");
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className='font-primary w-[100vw] h-[100vh] flex justify-center items-center'>
            <div className='bg-white w-[80vw] h-[60vh] shadow-lg rounded-lg flex justify-around px-12 py-20 gap-12'>
                <div className='signin-left flex flex-1 flex-col items-start justify-start gap-2'>
                    <h1 className='font-bold text-3xl'>Welcome to Techdome Loan</h1>
                    <p className='text-sm'>Welcome! Please sign up to continue</p>
                </div>
                <div className='signin-right text-sm flex-1 flex justify-end items-end relative'>
                    <form className='w-full pl-6' onSubmit={handleSignUpSubmit}>
                        <div className="mb-4 relative">
                            <input
                                type="text"
                                name="name"
                                className="w-full text-sm bg-white px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="Enter your name"
                                value={signupCredentials.name}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="mb-4 relative">
                            <input
                                type="email"
                                name="email"
                                className="w-full text-sm bg-white px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="Enter Email"
                                value={signupCredentials.email}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="mb-4 relative">
                            <input
                                type={visible ? "text" : "password"}
                                name="password"
                                className="w-full relative text-sm bg-white px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="Enter Password"
                                value={signupCredentials.password}
                                onChange={onChange}
                                required
                            />
                            <span
                                onClick={() => setVisible(!visible)}
                                className="absolute right-2 top-3 cursor-pointer text-gray-500 mt-1"
                            >
                                {visible ? <EyeOff /> : <Eye />}
                            </span>
                            {/* Display password validation message */}
                            {passwordMessage && (
                                <p className="text-red-500 text-xs mt-2">{passwordMessage}</p>
                            )}
                        </div>

                        <div className="flex items-center justify-end gap-6 mt-10">
                            <button
                                type="submit"
                                className={`btn font-bold shadow-lg w-[8rem] hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 ${!isPasswordValid || loading ? 'cursor-not-allowed opacity-50' : ''}`}
                                disabled={!isPasswordValid || loading} // Disable button if password is invalid or loading
                            >
                                {loading ? <ClipLoader color="#fff" size={20} /> : 'Sign Up'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { FaSpinner } from "react-icons/fa";

interface User {
    username: string;
    email: string;
    password: string;
}

const SignUpPage = () => {
    const router = useRouter();

    // State variables
    const [user, setUser] = useState<User>({ username: "", email: "", password: "" });
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);

    /**
     * Handles user sign-up by making an API call.
     */
    const handleSignUp = async () => {
        try {
            setLoading(true);

            // Make API request
            const response = await axios.post("/api/user/signup", user);

            if (response.status === 200) {
                toast.success("Sign up successful!", { position: "top-right", autoClose: 2000 });
                router.push("/login");
            }
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.message || "An error occurred during sign-up.";
            toast.error(errorMessage);
            console.error("SignUp Error:", error);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Enables or disables the sign-up button based on input validation.
     */
    useEffect(() => {
        setButtonDisabled(!(user.username.trim() && user.email.trim() && user.password.trim()));
    }, [user]);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                {/* Title */}
                <h1 className="text-3xl font-semibold bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-transparent bg-clip-text text-center mb-6">
                    Sign Up
                </h1>

                {/* Subtitle */}
                <h2 className="text-gray-600 text-center mb-6">
                    {loading ? "Processing..." : "Create Your Account"}
                </h2>

                {/* Username Input */}
                <div className="flex items-center border p-2 text-black border-gray-300 rounded-md mb-4">
                    <FiUser className="text-gray-500 mr-2" size={20} />
                    <input
                        type="text"
                        placeholder="Username"
                        id="username"
                        className="flex-1 outline-none"
                        value={user.username}
                        onChange={(e) =>
                            setUser((prevUser) => ({ ...prevUser, username: e.target.value }))
                        }
                    />
                </div>

                {/* Email Input */}
                <div className="flex items-center border p-2 text-black border-gray-300 rounded-md mb-4">
                    <FiMail className="text-gray-500 mr-2" size={20} />
                    <input
                        type="email"
                        placeholder="Email"
                        id="email"
                        className="flex-1 outline-none"
                        value={user.email}
                        onChange={(e) =>
                            setUser((prevUser) => ({ ...prevUser, email: e.target.value }))
                        }
                    />
                </div>

                {/* Password Input */}
                <div className="flex items-center border p-2 text-black border-gray-300 rounded-md mb-6">
                    <FiLock className="text-gray-500 mr-2" size={20} />
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        className="flex-1 outline-none"
                        value={user.password}
                        onChange={(e) =>
                            setUser((prevUser) => ({ ...prevUser, password: e.target.value }))
                        }
                    />
                </div>

                {/* Sign Up Button */}
                <button
                    className={`flex items-center justify-center gap-2 p-2 w-full rounded-md text-white ${buttonDisabled || loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 hover:opacity-90"
                        }`}
                    onClick={handleSignUp}
                    disabled={buttonDisabled || loading}
                >
                    {loading ? <FaSpinner className="animate-spin" /> : "Sign Up"}
                </button>

                {/* Divider */}
                <div className="text-center text-gray-500 my-4">or</div>

                {/* Login Link */}
                <Link
                    href="/login"
                    className="block text-center p-2 w-full bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white rounded-md hover:opacity-90"
                >
                    Login
                </Link>
            </div>
        </div>
    );
};

export default SignUpPage;

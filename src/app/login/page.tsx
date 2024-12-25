'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiMail, FiLock } from "react-icons/fi";
import { FaSpinner } from "react-icons/fa";

interface User {
    email: string;
    password: string;
}

const LoginPage = () => {
    const router = useRouter();

    // State variables
    const [user, setUser] = useState<User>({ email: "", password: "" });
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);

    /**
     * Handles user login by making an API call.
     */
    const handleLogin = async () => {
        try {
            setLoading(true);

            // Make API request
            const response = await axios.post("/api/user/login", user);

            if (response.status === 200) {
                toast.success("Login successful!", { position: "top-right", autoClose: 2000 });
                router.push("/dashboard");
            }
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.message || "An error occurred during login.";
            toast.error(errorMessage);
            console.error("Login Error:", error);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Enables or disables the login button based on input validation.
     */
    useEffect(() => {
        setButtonDisabled(!(user.email.trim() && user.password.trim()));
    }, [user]);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                {/* Title */}
                <h1 className="text-3xl font-semibold bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-transparent bg-clip-text text-center mb-6">
                    Login
                </h1>

                {/* Subtitle */}
                <h2 className="text-gray-600 text-center mb-6">
                    {loading ? "Processing..." : "Login to Your Account"}
                </h2>

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

                {/* Login Button */}
                <button
                    className={`flex items-center justify-center gap-2 p-2 w-full rounded-md text-white ${buttonDisabled || loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 hover:opacity-90"
                        }`}
                    onClick={handleLogin}
                    disabled={buttonDisabled || loading}
                >
                    {loading ? <FaSpinner className="animate-spin" /> : "Login"}
                </button>

                {/* Divider */}
                <div className="text-center text-gray-500 my-4">or</div>

                {/* Register Link */}
                <Link
                    href="/sign-up"
                    className="block text-center p-2 w-full bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white rounded-md hover:opacity-90"
                >
                    Register
                </Link>
            </div>
        </div>
    );
};

export default LoginPage;

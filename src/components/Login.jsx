import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaGoogle } from "react-icons/fa";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import { Slide } from "react-awesome-reveal";
import { AuthContext } from "../provider/AuthProvider";

const Login = () => {
    useEffect(() => {
        document.title = "Login | ScarletTable";
        window.scrollTo(0, 0);
    }, []);

    const { userLogin, setUser, googleSignIn } = useContext(AuthContext);
    const [error, setError] = useState({});
    const [email, setEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        userLogin(email, password)
            .then((result) => {
                const user = result.user;
                setUser(user);
                toast.success("Login successful!", {
                    style: { background: "#ffe8e0", color: "#b33f29" },
                });
                setTimeout(() => {
                    navigate(location?.state ? location.state : "/");
                }, 2000);
            })
            .catch((err) => {
                setError({ ...error, login: err.code });
                toast.error("Login failed: " + err.message, {
                    style: { background: "#ffe8e0", color: "#b33f29" },
                });
            });
    };

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((result) => {
                const user = result.user;
                setUser(user);
                toast.success("Google Sign-In successful!", {
                    style: { background: "#ffe8e0", color: "#b33f29" },
                });
                setTimeout(() => {
                    navigate(location?.state || "/");
                }, 2000);
            })
            .catch((err) => {
                toast.error("Google Sign-In failed: " + err.message, {
                    style: { background: "#ffe8e0", color: "#b33f29" },
                });
            });
    };

    return (
        <div className="min-h-screen flex justify-center items-center text-white py-10">
            <ToastContainer position="top-center" />

            <Slide>
                <div className="bg-red-100 shadow-lg rounded-lg p-10 max-w-lg w-full border border-orange-600">
                    <h2 className="text-center text-orange-700 font-bold text-4xl mb-5">
                        Welcome to <span className="text-red-800">ScarletTable</span>
                    </h2>

                    <p className="text-center text-red-600 mb-8">
                        Log in to savor your personalized dining experience.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="form-control">
                            <label className="label text-red-700">
                                <span className="label-text text-lg text-red-700">Email</span>
                            </label>
                            <input
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                className="input input-bordered bg-white text-red-900 border-red-600 focus:outline-none focus:ring focus:ring-orange-500"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-control relative">
                            <label className="label text-red-700">
                                <span className="label-text text-lg text-red-700">Password</span>
                            </label>
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="input input-bordered bg-white text-red-900 border-red-600 focus:outline-none focus:ring focus:ring-orange-500"
                                required
                            />
                            <button
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-12 text-orange-600 hover:text-red-800"
                                type="button"
                            >
                                {showPassword ? <IoEyeSharp /> : <IoEyeOffSharp />}
                            </button>
                            {error.login && (
                                <label className="label text-sm text-red-500 mt-2">
                                    {error.login}
                                </label>
                            )}
                            <label className="text-left">
                                <Link
                                    to="/auth/forgot-password"
                                    state={{ email }}
                                    className="label-text-alt link link-hover underline text-orange-700 hover:text-red-800"
                                >
                                    Forgot password?
                                </Link>
                            </label>
                        </div>

                        <div className="form-control mt-6">
                            <button
                                type="submit"
                                className="btn bg-orange-600 text-white hover:bg-red-700 w-full"
                            >
                                Login
                            </button>
                        </div>
                    </form>

                    <div className="divider text-red-500">OR</div>

                    <button
                        onClick={handleGoogleSignIn}
                        className="btn bg-transparent border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white w-full flex justify-center items-center space-x-2"
                    >
                        <FaGoogle className="mr-2" /> Login with Google
                    </button>

                    <p className="text-center text-red-700 mt-5">
                        Don't have an account?{" "}
                        <Link
                            className="underline hover:text-red-800"
                            to="/auth/register"
                        >
                            Register
                        </Link>
                    </p>
                </div>
            </Slide>
        </div>
    );
};

export default Login;
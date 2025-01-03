import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaGoogle } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";
import { Slide } from "react-awesome-reveal";
import { AuthContext } from "../provider/AuthProvider";

const Register = () => {
    useEffect(() => {
        document.title = "Register | ScarletTable";
        window.scrollTo(0, 0);
    }, []);

    const { createNewUser, setUser, updateUserProfile, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        const passwordError = {};
        if (!/[A-Z]/.test(value)) {
            passwordError.uppercase = "Must include at least one uppercase letter.";
        }
        if (!/[a-z]/.test(value)) {
            passwordError.lowercase = "Must include at least one lowercase letter.";
        }
        if (value.length < 6) {
            passwordError.length = "Must be at least 6 characters long.";
        }

        setError((prev) => ({
            ...prev,
            password: Object.keys(passwordError).length ? passwordError : null,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = new FormData(e.target);
        const name = form.get("name");
        const email = form.get("email");
        const photo = form.get("photo");
        const password = form.get("password");

        if (name.length < 4) {
            setError({ ...error, name: "Name must be more than 4 characters long." });
            toast.error("Name must be more than 4 characters long!");
            return;
        }

        if (error.password) {
            toast.error("Please fix the password errors before submitting.");
            return;
        }

        createNewUser(email, password)
            .then((result) => {
                const user = result.user;
                setUser(user);
                updateUserProfile({ displayName: name, photoURL: photo })
                    .then(() => {
                        toast.success("Registration successful!", { autoClose: 3000 });
                        setTimeout(() => {
                            navigate("/");
                        }, 2000);
                    })
                    .catch((err) => {
                        toast.error("Error updating profile: " + err.message);
                    });
            })
            .catch((err) => {
                toast.error("Registration failed: " + err.message);
            });
    };

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((result) => {
                const user = result.user;
                setUser(user);
                toast.success("Google Sign-In successful!");
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            })
            .catch((err) => {
                toast.error("Google Sign-In failed: " + err.message);
            });
    };

    return (
        <div className="min-h-screen flex justify-center items-center text-[#4A2715] py-10">
            <ToastContainer position="top-center" />
            <Slide>
                <div className="bg-[#FFFBF5] shadow-lg rounded-lg p-10 max-w-lg w-full border-2 border-[#FFA07A]">
                    <h2 className="text-center text-[#FF4500] font-bold text-4xl mb-5">
                        Register for <span className="text-[#4A2715]">ScarletTable</span>
                    </h2>
                    <p className="text-center text-[#8B4513] mb-8">
                        Join us and start managing your restaurant seamlessly!
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="form-control">
                            <label className="label text-[#8B4513]">
                                <span className="label-text text-lg text-red-700">Name</span>
                            </label>
                            <input
                                name="name"
                                type="text"
                                placeholder="Enter your full name"
                                className="input input-bordered bg-[#FFF2E6] focus:border-[#FF7F50]"
                                required
                            />
                        </div>
                        {error.name && (
                            <label className="label text-xs text-[#FF6347]">
                                {error.name}
                            </label>
                        )}
                        <div className="form-control">
                            <label className="label text-[#8B4513]">
                                <span className="label-text text-lg text-red-700">Photo URL</span>
                            </label>
                            <input
                                name="photo"
                                type="text"
                                placeholder="Provide your profile picture URL"
                                className="input input-bordered bg-[#FFF2E6] focus:border-[#FF7F50]"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label text-[#8B4513]">
                                <span className="label-text text-lg text-red-700">Email</span>
                            </label>
                            <input
                                name="email"
                                type="email"
                                placeholder="Enter your email address"
                                className="input input-bordered bg-[#FFF2E6] focus:border-[#FF7F50]"
                                required
                            />
                        </div>
                        <div className="form-control relative">
                            <label className="label text-[#8B4513]">
                                <span className="label-text text-lg text-red-700">Password</span>
                            </label>
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a strong password"
                                className="input input-bordered bg-[#FFF2E6] focus:border-[#FF7F50]"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                            <button
                                onClick={() => setShowPassword(!showPassword)}
                                type="button"
                                className="absolute right-2 top-12 text-[#8B4513] hover:text-[#FF4500]"
                            >
                                {showPassword ? <IoEyeSharp /> : <IoEyeOffSharp />}
                            </button>
                            {error.password && (
                                <div className="text-xs text-[#FF6347] mt-1">
                                    {Object.values(error.password).map((err, index) => (
                                        <p key={index}>{err}</p>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="form-control mt-6">
                            <button
                                className="btn bg-[#FF6347] hover:bg-[#FF4500] text-white border-none w-full"
                                disabled={!!error.password}
                            >
                                Register
                            </button>
                        </div>
                    </form>
                    <div className="divider text-[#8B4513]">OR</div>
                    <div className="form-control">
                        <button
                            className="btn btn-outline border-[#FF4500] text-[#FF4500] hover:bg-[#FF4500] hover:text-white w-full"
                            onClick={handleGoogleSignIn}
                        >
                            Login with Google <FaGoogle className="ml-2" />
                        </button>
                    </div>
                    <p className="text-center text-[#8B4513] mt-5">
                        Already have an account?{" "}
                        <Link
                            to="/auth/login"
                            className="text-[#FF4500] underline hover:text-[#FF6347]"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </Slide>
        </div>
    );
};

export default Register;

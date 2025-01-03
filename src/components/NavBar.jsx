import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";
import Fries from "../assets/Fries.json";
import Lottie from "lottie-react";
import { AuthContext } from "../provider/AuthProvider";

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const { user, logOut } = useContext(AuthContext);

    const toggleProfileMenu = () => {
        setIsProfileMenuOpen((prev) => !prev);
    };

    return (
        <div className="navbar top-0">
            <div className="flex-1 text-4xl font-bold font-charm flex items-center">
                <div className="flex items-center">
                    <div className="w-16 h-16">
                        <Lottie animationData={Fries} />
                    </div>
                    <Link to="/" className="text-4xl font-bold">
                        <span className="text-red-600">Scarlet</span>
                        <span className="text-orange-500">Table</span>
                    </Link>
                </div>
                <ThemeToggle />
            </div>

            <div className="hidden lg:flex flex-none items-center space-x-4">
                <ul className="menu menu-horizontal px-1 space-x-4 flex items-center">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-orange-600 underline decoration-2 text-2xl font-charm"
                                    : "hover:text-red-500 transition-all text-xl font-charm"
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/allEateries"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-orange-600 underline decoration-2 text-2xl font-charm"
                                    : "hover:text-red-600 transition-all text-xl font-charm"
                            }
                        >
                            All Foods
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/galleries"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-orange-600 underline decoration-2 text-2xl font-charm"
                                    : "hover:text-red-600 transition-all text-xl font-charm"
                            }
                        >
                            Gallery
                        </NavLink>
                    </li>
                </ul>

                <div className="flex items-center space-x-4">
                    {user && user.email ? (
                        <div className="relative flex items-center space-x-2">
                            <img
                                className="w-8 h-8 md:w-10 md:h-10 rounded-full"
                                src={user.photoURL}
                                alt="User Avatar"
                                title={user.displayName}
                                onClick={toggleProfileMenu}  // Toggle on click
                                style={{ cursor: 'pointer' }}
                            />
                            <div className="font-charm text-lg text-red-700">{user.email}</div>
                            {isProfileMenuOpen && ( // Show profile menu if state is true
                                <div className="absolute top-full right-0 mt-2 bg-white shadow-md rounded-md p-2 space-y-2 z-50">
                                    <Link to="/myEateries" className="block text-red-700 hover:text-orange-600">
                                        My Foods
                                    </Link>
                                    <Link to="/addEateries" className="block text-red-700 hover:text-orange-600">
                                        Add Food
                                    </Link>
                                    <Link to="/myOrder" className="block text-red-700 hover:text-orange-600">
                                        My Orders
                                    </Link>
                                </div>
                            )}
                            <button
                                onClick={logOut}
                                className="btn bg-red-700 hover:bg-orange-600 text-white border-none"
                            >
                                Log Out
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-2">
                            <Link
                                to="/auth/login"
                                className="btn bg-red-700 hover:bg-orange-600 text-white border-none"
                            >
                                Login
                            </Link>
                            <Link
                                to="/auth/register"
                                className="btn bg-red-700 hover:bg-orange-600 text-white border-none"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            <div className="lg:hidden flex items-center">
                <button
                    className="btn btn-ghost text-white hover:text-red-600"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke="black"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={
                                isMenuOpen
                                    ? "M6 18L18 6M6 6l12 12"
                                    : "M4 6h16M4 12h16M4 18h16"
                            }
                        />
                    </svg>
                </button>
            </div>

            {isMenuOpen && (
                <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden z-50">
                    <ul className="menu menu-vertical px-4 py-2 space-y-2">
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-orange-600 font-bold underline decoration-2"
                                        : "hover:text-gray-300 transition-all"
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/allEateries"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-orange-600 font-bold underline decoration-2"
                                        : "hover:text-gray-300 transition-all"
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                All Foods
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/myEateries"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-orange-600 font-bold underline decoration-2"
                                        : "hover:text-gray-300 transition-all"
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                               My Foods
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/addEateries"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-orange-600 font-bold underline decoration-2"
                                        : "hover:text-gray-300 transition-all"
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                               Add Food
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/myOrder"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-orange-600 font-bold underline decoration-2"
                                        : "hover:text-gray-300 transition-all"
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                               My Orders
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/galleries"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-orange-600 font-bold underline decoration-2"
                                        : "hover:text-gray-300 transition-all"
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Gallery
                            </NavLink>
                        </li>

                        <li className="pt-4">
                            <div className="flex flex-col items-center">
                                <div className="font-charm text-lg mb-2">
                                    {user && user.email}
                                </div>
                                {user && user?.email ? (
                                    <div className="mb-2">
                                        <img
                                            className="w-8 h-8 md:w-10 md:h-10 rounded-full"
                                            src={user?.photoURL}
                                            alt="User Avatar"
                                            title={user.displayName}
                                        />
                                    </div>
                                ) : (
                                    <FaRegUserCircle className="text-orange-600 hover:text-blue-400 text-3xl md:text-4xl cursor-pointer mb-2" />
                                )}
                                {user && user?.email ? (
                                    <button onClick={logOut} className="btn btn-primary">
                                        Log Out
                                    </button>
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <Link
                                            to="/auth/login"
                                            className="btn btn-primary hover:bg-blue-500 mb-2"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            to="/auth/register"
                                            className="btn btn-primary hover:bg-blue-500"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default NavBar;

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Loading from "./Loading";
import { toast } from "react-toastify";
import { AuthContext } from "../provider/AuthProvider";
import { Fade } from "react-awesome-reveal";
import Aos from "aos";
import Swal from "sweetalert2";
import axios from "axios";

const MyFoods = () => {
    const [foods, setFoods] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    useEffect(() => {
        document.title = "My Foods | ScarletTable";
        Aos.init({ duration: 1000 });

        const timer = setTimeout(() => {
            if (user?.email) {
                // fetch(`https://restuarant-server-theta.vercel.app/userFoods?email=${user.email}`)
                //     .then((res) => res.json())
                //     .then((data) => setFoods(data))
                axios.get(`https://restuarant-server-theta.vercel.app/userFoods?email=${user.email}`, {
                    withCredentials: true
                })
                    .then(res => setFoods(res.data))
                    .catch((error) => console.error("Error fetching user foods:", error))
                    .finally(() => setIsLoading(false));
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [user?.email]);

    const handleDeleteConfirmation = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                deleteFood(id);
            }
        });
    };

    const deleteFood = (id) => {
        setIsDeleting(true);
        fetch(`https://restuarant-server-theta.vercel.app/food/${id}`, { method: "DELETE" })
            .then((res) => res.json())
            .then((data) => {
                if (data.deletedCount) {
                    toast.success("Food deleted successfully.");
                    setFoods((prev) => prev.filter((food) => food._id !== id));
                } else {
                    toast.error("Failed to delete the food.");
                }
            })
            .catch((error) => {
                console.error("Error deleting food:", error);
                toast.error("An error occurred while deleting the food.");
            })
            .finally(() => {
                setIsDeleting(false);
            });
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div>
            <NavBar />
            <div className="max-w-screen-xl mx-auto p-10 text-center">
                <Fade>
                    <h1 className="text-3xl md:text-7xl font-bold text-red-600 mb-8 font-charm">
                        My <span className="text-black">Foods</span>
                    </h1>
                    <div className="mt-4 text-lg text-gray-600">
                        <p className="text-black font-charm">
                            <span className="text-red-600 font-semibold">Username:</span> {user?.displayName || "Anonymous"}
                        </p>
                        <p className="text-black font-charm">
                            <span className="text-red-600 font-semibold">Email:</span> {user?.email || "Not logged in"}
                        </p>
                    </div>
                </Fade>

                <div className="divider text-gray-500"></div>

                {foods.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
                        {foods.map((food) => (
                            <div
                                key={food._id}
                                className="group bg-red-400 p-6 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out hover:shadow-2xl hover:scale-105"
                                data-aos="fade-up"
                            >
                                <figure>
                                    <img
                                        className="h-60 w-full object-cover group-hover:scale-105 transform transition-transform duration-300"
                                        src={food.foodImage || "https://via.placeholder.com/150"}
                                        alt={food.foodName || "Food"}
                                    />
                                </figure>

                                <div className="p-4">
                                    <h2 className="text-3xl font-semibold text-gray-800 font-charm">
                                        {food.foodName}
                                    </h2>
                                    <p className="text-xl text-gray-600 mt-2">Category: {food.foodCategory}</p>
                                    <p className="text-xl text-gray-600 mt-2">Price: ${food.price}</p>
                                    <p className="text-xl text-gray-600 mt-2">Quantity: {food.quantity}</p>
                                    <div className="flex justify-center mt-4 gap-6">
                                        <button
                                            onClick={() => navigate(`/updateEateries/${food._id}`)}
                                            className="btn bg-red-600 px-4 py-2 text-white rounded hover:bg-red-500 transition-all"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDeleteConfirmation(food._id)}
                                            className="btn bg-red-700 px-4 py-2 text-white rounded hover:bg-red-600 transition-all"
                                            disabled={isDeleting}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600 col-span-3">No food items found.</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default MyFoods;

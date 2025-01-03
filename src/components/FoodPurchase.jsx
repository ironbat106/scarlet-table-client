import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { AuthContext } from "../provider/AuthProvider";
import { FaArrowLeft } from "react-icons/fa";

const FoodPurchase = () => {
    const { id: foodId } = useParams();
    const [food, setFood] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch(`https://restuarant-server-theta.vercel.app/food/${foodId}`)
            .then((res) => res.json())
            .then((data) => setFood(data))
            .catch(() => toast.error("Failed to fetch food details"));
    }, [foodId]);

    const handlePurchase = async () => {
        if (food.quantity === 0) {
            toast.error("This item is not available for purchase.");
            return;
        }

        try {
            const response = await fetch(`https://restuarant-server-theta.vercel.app/food/${foodId}/purchase`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    quantity,
                    buyerName: user.displayName || "Anonymous",
                    buyerEmail: user.email,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                toast.success("Purchase successful!");
                setFood((prevFood) => ({
                    ...prevFood,
                    quantity: prevFood.quantity - quantity,
                }));
            } else {
                toast.error(result.message || "Purchase failed. Please try again.");
            }
        } catch (error) {
            toast.error("An unexpected error occurred.");
        }
    };

    if (!food || !user) return <div>Loading...</div>;

    return (
        <div className="min-h-screen">
            <NavBar />
            <div className="container mx-auto py-12 px-6 lg:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center shadow-lg rounded-lg overflow-hidden">
                    <div className="h-full flex items-center justify-center bg-gray-100">
                        <img
                            src={food.foodImage}
                            alt={food.foodName}
                            className="rounded-lg w-4/5 max-h-96 object-cover shadow-md"
                        />
                    </div>

                    <div className="p-6 lg:p-12 bg-red-600">
                        <h1 className="text-3xl lg:text-4xl font-bold font-charm text-red-950 mb-4">
                            {food.foodName}
                        </h1>
                        <p className="text-lg text-white mb-6">{food.description}</p>

                        <div className="space-y-4">
                            <p className="text-lg font-medium text-gray-800">
                                <span className="font-bold">Category:</span> {food.foodCategory}
                            </p>
                            <p className="text-lg font-medium text-gray-800">
                                <span className="font-bold">Price:</span> ${food.price}
                            </p>
                            <p className="text-lg font-medium text-gray-800">
                                <span className="font-bold">Available Quantity:</span> {food.quantity}
                            </p>
                        </div>

                        {food.quantity === 0 && (
                            <p className="mt-6 text-xl text-red-900 font-bold bg-yellow-300 p-3 rounded-md">
                                This item is currently out of stock and cannot be purchased.
                            </p>
                        )}

                        <form className="space-y-4 mt-8">
                            <div>
                                <label className="text-white text-lg font-semibold">Quantity</label>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                                    className="w-full p-3 mt-2 rounded-md border-none"
                                    min="1"
                                    max={food.quantity}
                                    disabled={food.quantity === 0}
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-black">User Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="userEmail"
                                        value={user?.email || ""}
                                        readOnly
                                        className="input input-bordered"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-black">User Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="userName"
                                        value={user?.displayName || ""}
                                        readOnly
                                        className="input input-bordered"
                                    />
                                </div>
                            </div>

                            <div className="flex space-x-4">
                                <button
                                    type="button"
                                    onClick={handlePurchase}
                                    className="inline-block bg-orange-500 text-white px-8 py-3 rounded-md shadow-md hover:bg-orange-400 transition duration-200"
                                    disabled={food.quantity === 0}
                                >
                                    <span className="text-lg font-semibold">Purchase</span>
                                </button>
                                <Link
                                    to={`/food/${food._id}`}
                                    className="inline-flex items-center bg-orange-600 text-white px-8 py-3 rounded-md shadow-md hover:bg-orange-500 transition duration-200"
                                >
                                    <FaArrowLeft className="mr-2 text-lg" />
                                    <span className="text-lg font-semibold">Back to Details</span>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
            <ToastContainer position="top-center" autoClose={2000} />
        </div>
    );
};

export default FoodPurchase;

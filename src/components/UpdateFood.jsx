import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { AuthContext } from "../provider/AuthProvider";
import { Slide } from "react-awesome-reveal";

const UpdateFood = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [food, setFood] = useState({});

    useEffect(() => {
        fetch(`https://restuarant-server-theta.vercel.app/food/${id}`)
            .then((res) => res.json())
            .then((data) => setFood(data))
            .catch((error) => console.error("Error fetching food:", error));
    }, [id]);

    const handleUpdateFood = (e) => {
        e.preventDefault();

        const updatedFood = {};
        Array.from(e.target.elements).forEach((element) => {
            if (element.name && element.value) {
                updatedFood[element.name] = element.value;
            }
        });

        updatedFood.UserEmail = user?.email || "Anonymous";
        updatedFood.UserName = user?.displayName || "Anonymous User";

        fetch(`https://restuarant-server-theta.vercel.app/food/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedFood),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    toast.success("Food updated successfully!", {
                        onClose: () => setTimeout(() => navigate("/allEateries"), 1000),
                    });
                } else {
                    toast.info("Food updated successfully!", {
                        onClose: () => setTimeout(() => navigate("/allEateries"), 1000),
                    });
                }
            })
            .catch((error) => {
                console.error("Error updating food:", error);
                toast.error("Failed to update the food.");
            });
    };

    return (
        <div>
            <NavBar />
            <div className="max-w-screen-xl mx-auto px-4 py-16">
                <div className="text-center mb-10">
                    <Slide>
                        <h1 className="text-3xl md:text-7xl font-bold text-red-600 font-charm">
                            Update <span className="text-black">Food</span>
                        </h1>
                        <p className="mt-4 text-lg text-gray-600">
                            Modify the food details below. Make the necessary changes and submit.
                        </p>
                    </Slide>
                </div>
                <div className="bg-white p-8 shadow-lg rounded-lg border border-gray-200">
                    <form onSubmit={handleUpdateFood} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-red-600">Food Image URL</span>
                                </label>
                                <input
                                    type="text"
                                    name="foodImage"
                                    placeholder="Image URL"
                                    className="input input-bordered"
                                    defaultValue={food.foodImage}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-red-600">Food Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="foodName"
                                    placeholder="Food Name"
                                    className="input input-bordered"
                                    defaultValue={food.foodName}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-red-600">Category</span>
                                </label>
                                <input
                                    type="text"
                                    name="foodCategory"
                                    placeholder="Category"
                                    className="input input-bordered"
                                    defaultValue={food.foodCategory}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-red-600">Price</span>
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="Price"
                                    className="input input-bordered"
                                    defaultValue={food.price}
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-red-600">Quantity</span>
                            </label>
                            <input
                                type="number"
                                name="quantity"
                                placeholder="Quantity"
                                className="input input-bordered"
                                defaultValue={food.quantity}
                            />
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn bg-red-600 hover:bg-red-500 text-white transition-all">
                                Update Food
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
            <ToastContainer position="top-center" autoClose={2000} />
        </div>
    );
};

export default UpdateFood;

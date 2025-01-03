import { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Aos from "aos";
import Loading from "./Loading";
import { Fade } from "react-awesome-reveal";
import { AuthContext } from "../provider/AuthProvider";

const AddFood = () => {
    const { user } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.title = "Add Food | ScarletTable";
        Aos.init({ duration: 1000 });
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const handleAddFood = (e) => {
        e.preventDefault();

        const foodName = e.target.foodName.value;
        const foodImage = e.target.foodImage.value;
        const foodCategory = e.target.foodCategory.value;
        const quantity = parseInt(e.target.quantity.value, 10);
        const price = parseFloat(e.target.price.value);
        const foodOrigin = e.target.foodOrigin.value;
        const description = e.target.description.value;
        const userEmail = user.email;
        const userName = user.displayName;

        const newFoodItem = {
            foodName,
            foodImage,
            foodCategory,
            quantity,
            price,
            foodOrigin,
            description,
            userEmail,
            userName,
            purchaseCount: 0,
        };

        fetch("https://restuarant-server-theta.vercel.app/food", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newFoodItem),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    toast.success("Food item added successfully!");
                    e.target.reset();
                } else {
                    toast.error("Error adding food item!");
                }
            })
            .catch(() => {
                toast.error("Something went wrong!");
            });
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div>
            <NavBar />

            <div className="max-w-screen-xl mx-auto px-4 py-16">
                <div className="text-center mb-10">
                    <Fade>
                        <h1 className="text-3xl md:text-7xl font-bold text-red-700">
                            Add <span className="text-orange-500">Food Item</span>
                        </h1>
                        <p className="mt-4 text-lg text-gray-600">
                            Fill in the details of the new food item you want to add to our menu.
                        </p>
                    </Fade>
                </div>

                <div className="bg-white p-8 shadow-lg rounded-lg border border-gray-200" data-aos="fade-up">
                    <form onSubmit={handleAddFood} className="space-y-6">

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-green-600">Food Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="foodName"
                                    placeholder="Food Name"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-green-600">Food Image URL</span>
                                </label>
                                <input
                                    type="text"
                                    name="foodImage"
                                    placeholder="Food Image URL"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                        </div>


                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-green-600">Food Category</span>
                                </label>
                                <input
                                    type="text"
                                    name="foodCategory"
                                    placeholder="Food Category"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-green-600">Quantity</span>
                                </label>
                                <input
                                    type="number"
                                    name="quantity"
                                    placeholder="Quantity"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-green-600">Price (USD)</span>
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="Price"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-green-600">Food Origin (Country)</span>
                                </label>
                                <input
                                    type="text"
                                    name="foodOrigin"
                                    placeholder="Food Origin (Country)"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                        </div>


                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-green-600">Description</span>
                            </label>
                            <textarea
                                name="description"
                                placeholder="Short description (ingredients, procedure, etc.)"
                                className="textarea textarea-bordered"
                                required
                            ></textarea>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-green-600">User Email</span>
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
                                    <span className="label-text text-green-600">User Name</span>
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

                        <div className="form-control mt-6">
                            <button className="btn bg-red-600 hover:bg-orange-500 text-white transition-all">Add Food</button>
                        </div>
                    </form>
                </div>
            </div>

            <Footer />
            <ToastContainer position="top-center" autoClose={3000} />
        </div>
    );
};

export default AddFood;

import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Loading from "./Loading";
import Swal from "sweetalert2";
import axios from "axios";

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.title = "Home | ScarletTable";

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        document.title = "My Orders | ScarletTable";

        const fetchOrders = async () => {
            try {
                const response = await axios.get("https://restuarant-server-theta.vercel.app/myOrders", {
                    withCredentials: true,
                });
                setOrders(response.data);
            } catch (error) {
                toast.error("Failed to fetch orders");
            } finally {
                setIsLoading(false);
            }
        };

        if (user?.email) {
            fetchOrders();
        }
    }, [user?.email]);

    const groupedOrders = orders.reduce((acc, order) => {
        const foodName = order.foodName;
        const quantity = order.quantity || 1;

        if (!acc[foodName]) {
            acc[foodName] = {
                foodName: foodName,
                foodImage: order.foodDetails?.foodImage || "https://via.placeholder.com/150",
                price: order.foodDetails?.price || "N/A",
                foodOwner: order.foodDetails?.owner || "Unknown Owner",
                addedTime: order.foodDetails?.addedTime || moment().format(),
                count: 0,
                orderDate: order.orderDate || moment().format(),
                orders: []
            };
        }

        acc[foodName].count += quantity;
        acc[foodName].orders.push(order);

        return acc;
    }, {});

    const handleDeleteConfirmation = (id) => {
        console.log("Deleting order with id:", id);
        if (!id) {
            toast.error("Order ID is not valid.");
            return;
        }

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                deleteOrder(id);
            }
        });
    };

    const deleteOrder = async (id) => {
        try {
            console.log("Deleting order with ID:", id);
            if (!id) {
                toast.error("Invalid order ID.");
                return;
            }

            const response = await axios.delete(`https://restuarant-server-theta.vercel.app/myOrders/${id}`, {
                withCredentials: true,
            });

            if (response.data.deletedCount) {
                toast.success("Order deleted successfully.");
                setOrders((prev) => prev.filter((order) => order._id !== id));
            } else {
                toast.error("Failed to delete order.");
            }
        } catch (error) {
            toast.error("An error occurred while deleting the order.");
        }
    };

    if(isLoading) {
        return <Loading></Loading>;
    }

    return (
        <div>
            <NavBar />
            <div className="max-w-screen-xl mx-auto p-10 text-center">
                <h1 className="text-3xl md:text-7xl font-bold text-red-600 mb-8 font-charm">
                    My <span className="text-black">Orders</span>
                </h1>
                <div className="mt-4 text-lg text-gray-600">
                    <p className="text-black font-charm">
                        <span className="text-red-600 font-semibold">Username:</span> {user?.displayName || "Anonymous"}
                    </p>
                    <p className="text-black font-charm">
                        <span className="text-red-600 font-semibold">Email:</span> {user?.email || "Not logged in"}
                    </p>
                </div>

                <div className="divider text-gray-500"></div>

                {Object.values(groupedOrders).length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
                        {Object.values(groupedOrders).map((orderGroup, index) => (
                            <div
                                key={index}
                                className="group bg-red-400 p-6 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out hover:shadow-2xl hover:scale-105"
                            >
                                <figure>
                                    <img
                                        className="h-60 w-full object-cover group-hover:scale-105 transform transition-transform duration-300"
                                        src={orderGroup.foodImage}
                                        alt={orderGroup.foodName || "Food"}
                                    />
                                </figure>

                                <div className="p-4">
                                    <h2 className="text-3xl font-semibold text-gray-800 font-charm">
                                        {orderGroup.foodName}
                                    </h2>
                                    <p className="text-xl text-gray-600 mt-2">Price: ${orderGroup.price}</p>
                                    <p className="text-xl text-gray-600 mt-2">
                                        {orderGroup.count} Ordered
                                    </p>

                                    <div className="text-gray-600 mt-4">
                                        <p className="text-lg font-semibold">
                                            Added Time: {moment(orderGroup.addedTime).format("MMMM Do YYYY, h:mm:ss a")}
                                        </p>
                                        <p className="text-lg font-semibold">
                                            Buying Date: {moment(orderGroup.orderDate).format("MMMM Do YYYY, h:mm:ss a")}
                                        </p>
                                    </div>

                                    <div className="flex justify-center mt-4 gap-6">
                                        {orderGroup.orders.map((order) => (
                                            <button
                                                key={order._id}
                                                onClick={() => handleDeleteConfirmation(order._id)}
                                                className="btn bg-red-700 px-4 py-2 text-white rounded hover:bg-red-600 transition-all"
                                            >
                                                Delete Order
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600 col-span-3">No orders found.</p>
                )}
            </div>
            <Footer />
            <ToastContainer position="top-center" autoClose={2000} />
        </div>
    );
};

export default MyOrders;
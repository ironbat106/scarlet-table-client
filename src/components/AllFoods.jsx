import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Loading from "./Loading";

const AllFoods = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [foods, setFoods] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredFoods, setFilteredFoods] = useState([]);

    useEffect(() => {
        fetch("https://restuarant-server-theta.vercel.app/allEateries")
            .then((res) => res.json())
            .then((data) => {
                setFoods(data);
                setFilteredFoods(data);
            })
            .catch(() => toast.error("Failed to fetch foods"));
    }, []);

    useEffect(() => {
        setFilteredFoods(
            foods.filter((food) =>
                food.foodName.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, foods]);

    useEffect(() => {
        document.title = "All Foods | ScarletTable";
    
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 1000);
    
        return () => clearTimeout(timer);
      }, []);

    if(isLoading) {
        return <Loading></Loading>;
    }

    return (
        <div>
            <NavBar></NavBar>
            <div
                className="max-w-screen-xl mx-auto px-4 py-12 text-center"
                style={{
                    backgroundImage: 'url("https://cdn.georgeinstitute.org/sites/default/files/2020-10/world-food-day-2020.png")',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                    borderRadius: "10px",
                    height: "300px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                }}
            >
                <h2
                    className="text-7xl font-bold text-red-100 mb-4"
                    style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 1)" }}
                >
                    All Foods
                </h2>

                <p
                    className="mt-4 text-lg md:text-xl text-white"
                    style={{
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
                        maxWidth: "800px",
                        margin: "0 auto",
                        padding: "0 16px",
                    }}
                >
                    Explore our diverse menu, offering delicious dishes made with fresh ingredients to satisfy every craving.
                </p>
            </div>


            <div className="mb-8 flex justify-center mt-8">
                <input
                    type="text"
                    placeholder="Search for a food..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-orange-100 w-1/2 p-3 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-16">
                {filteredFoods.map((food) => (
                    <div
                        key={food._id}
                        className="bg-red-500 shadow-md rounded-lg p-4 transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
                    >
                        <img
                            src={food.foodImage}
                            alt={food.foodName}
                            className="w-full h-56 object-cover rounded-lg mb-4"
                        />
                        <h3 className="text-2xl font-bold text-orange-900">{food.foodName}</h3>
                        <p className="mt-2 text-white">Category: {food.foodCategory}</p>
                        <p className="mt-2 text-white">Price: ${food.price}</p>
                        <p className="mt-2 text-white">Quantity: {food.quantity || "N/A"}</p>
                        <div className="mt-4">
                            <Link
                                to={`/food/${food._id}`}
                                className="btn bg-orange-700 hover:bg-orange-400 text-white"
                            >
                                Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            <Footer></Footer>
        </div>
    );
};

export default AllFoods;

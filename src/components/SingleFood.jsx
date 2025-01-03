import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";
import NavBar from "./NavBar";
import Footer from "./Footer";

const SingleFood = () => {
  const { id: foodId } = useParams();
  const [food, setFood] = useState();

  useEffect(() => {
    fetch(`https://restuarant-server-theta.vercel.app/food/${foodId}`)
      .then((res) => res.json())
      .then((data) => setFood(data))
      .catch(() => toast.error("Failed to fetch food details"));
  }, [foodId]);

  const handlePurchase = () => {
    toast.success("Food purchased successfully!");
  };

  if (!food) return <div>Loading...</div>;

  return (
    <div className="min-h-screen">
      <NavBar></NavBar>
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
                <span className="font-bold">Origin:</span> {food.foodOrigin}
              </p>
              <p className="text-lg font-medium text-gray-800">
                <span className="font-bold">Purchased:</span> {food.purchaseCount || 0} times
              </p>
            </div>

            <div className="mt-8 flex justify-center lg:justify-start space-x-2">
              <Link
                to={`/purchase/${foodId}`}
                className="inline-block bg-orange-600 text-white px-8 py-3 rounded-md shadow-md hover:bg-orange-500 transition duration-200"
              >
                <span className="text-lg font-semibold">Purchase</span>
              </Link>


              <Link
                to="/allEateries"
                className="inline-flex items-center bg-red-800 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-500 transition duration-200"
              >
                <FaArrowLeft className="mr-2 text-lg" />
                <span className="text-lg font-semibold">Back to All Foods</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default SingleFood;
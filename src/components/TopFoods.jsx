import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Aos from "aos";
import { Slide } from "react-awesome-reveal";

const TopFoods = () => {
  const [topFoods, setTopFoods] = useState([]);

  useEffect(() => {
    fetch("https://restuarant-server-theta.vercel.app/top-foods") 
      .then((res) => res.json())
      .then((data) => {
        setTopFoods(data);
      })
      .catch(() => toast.error("Failed to fetch top foods"));

    Aos.init({ duration: 1000 });
  }, []);

  return (
    <section className="bg-red-300 py-12">
      <div className="max-w-screen-xl mx-auto px-4 text-center">

        <Slide>
          <h2 className="text-7xl font-bold font-charm text-red-800 mb-6">
            Top Foods
          </h2>
        </Slide>
        
        <p className="text-lg text-gray-700 mb-8">
          Explore our top-selling food items based on popularity and taste.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-aos="fade-up">
          {topFoods.slice(0, 6).map((food) => (
            <div
              key={food._id}
              className="bg-red-200 shadow-md rounded-lg p-4 transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={food.foodImage}
                alt={food.foodName}
                className="w-full h-56 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-bold text-orange-600">{food.foodName}</h3>
              <p className="text-gray-600 mt-2">Category: {food.foodCategory}</p>
              <p className="text-gray-600 mt-2">Price: ${food.price}</p>
              <p className="text-gray-600 mt-2">Purchased: {food.purchaseCount || 0} times</p>
              <div className="mt-4">

                <Link to={`/food/${food._id}`} className="btn bg-orange-600 hover:bg-orange-400 text-white">
                  Details
                </Link>


              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link
            to="/allEateries"
            className="btn bg-orange-600 hover:bg-orange-500 text-white"
          >
            See All
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopFoods;

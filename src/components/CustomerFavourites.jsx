import Aos from "aos";
import { useEffect } from "react";
import { Slide } from "react-awesome-reveal";

const CustomerFavourites = () => {
    const specials = [
        {
            name: "Classic Beef Wellington",
            image: "https://i.ibb.co.com/KFQ6tc4/pexels-nadin-sh-78971847-20095444.jpg",
            description: "Rich and savory pasta topped with our secret sauce.",
        },
        {
            name: "Four-Cheese Truffle Bliss",
            image: "https://i.ibb.co.com/d5YQPkm/pexels-fariphotography-905847.jpg",
            description: "Freshly prepared sushi served with artisanal soy sauce.",
        },
        {
            name: "Deluxe Ramen Bowl",
            image: "https://i.ibb.co.com/BCzYdW5/pexels-ngqah83-884600.jpg",
            description: "Succulent lobster grilled to perfection, glazed with garlic butter, and served with a side of lemon-herb dip.",
        },
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Chef's Specials | Your Restaurant Name";
        Aos.init({ duration: 1000 });
    }, []);

    return (
        <section className="bg-red-300 py-12">
            <div className="max-w-screen-xl mx-auto px-4 text-center">
                <Slide>
                    <h2 className="text-7xl font-bold font-charm text-red-800 mb-6">
                        Customer Favourites
                    </h2>
                </Slide>
                <p className="text-lg text-gray-700 mb-8">
                    Indulge in our customers' all-time favorite dishes, expertly crafted to satisfy every craving.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-aos="fade-up">
                    {specials.map((dish, index) => (
                        <div
                            key={index}
                            className="bg-red-100 shadow-md rounded-lg p-4 transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
                        >
                            <img
                                src={dish.image}
                                alt={dish.name}
                                className="w-full h-56 object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-2xl font-bold text-orange-600">{dish.name}</h3>
                            <p className="text-gray-600 mt-2">{dish.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CustomerFavourites;

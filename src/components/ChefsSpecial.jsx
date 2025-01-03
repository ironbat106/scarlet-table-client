import Aos from "aos";
import { useEffect } from "react";
import { Slide } from "react-awesome-reveal";

const ChefsSpecials = () => {
    const specials = [
        {
            name: "Signature Spaghetti Bolognese",
            image: "https://i.ibb.co.com/mCpDXkS/pexels-public-domain-pictures-41320.jpg",
            description: "Rich and savory pasta topped with our secret sauce.",
        },
        {
            name: "Gourmet Sushi Platter",
            image: "https://i.ibb.co.com/TgvzWQ7/pexels-spfdigital-14693675.jpg",
            description: "Freshly prepared sushi served with artisanal soy sauce.",
        },
        {
            name: "Fiery Grilled Lobster",
            image: "https://i.ibb.co.com/tLRfQfB/pexels-shameel-mukkath-3421394-17598324.jpg",
            description: "Succulent lobster grilled to perfection, glazed with garlic butter, and served with a side of lemon-herb dip.",
        },
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Chef's Specials | Your Restaurant Name";
        Aos.init({ duration: 1000 });
    }, []);

    return (
        <section className="bg-red-400 py-12">
            <div className="max-w-screen-xl mx-auto px-4 text-center">
                <Slide>
                    <h2 className="text-7xl font-bold font-charm text-red-800 mb-6">
                        Chef’s Specials
                    </h2>
                </Slide>
                <p className="text-lg text-gray-700 mb-8">
                    Experience culinary artistry with our chef's handpicked specials.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-aos="fade-up">
                    {specials.map((dish, index) => (
                        <div
                            key={index}
                            className="bg-gray-900 shadow-md rounded-lg p-4 transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
                        >
                            <img
                                src={dish.image}
                                alt={dish.name}
                                className="w-full h-56 object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-2xl font-bold text-orange-600">{dish.name}</h3>
                            <p className="text-white mt-2">{dish.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ChefsSpecials;

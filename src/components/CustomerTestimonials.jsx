import Aos from "aos";
import { useEffect } from "react";
import { Slide } from "react-awesome-reveal";

const CustomerTestimonials = () => {
    const testimonials = [
        {
            name: "Emily R.",
            image: "https://i.ibb.co.com/6HW4cVx/pexels-pixabay-415829.jpg",
            quote: "The food was absolutely divine, and the service was impeccable. Highly recommended!",
        },
        {
            name: "John D.",
            image: "https://i.ibb.co.com/1ZwCktG/pexels-pnw-prod-8377494.jpg",
            quote: "A hidden gem! Every bite was a journey of flavor and perfection.",
        },
        {
            name: "Sophia W.",
            image: "https://i.ibb.co.com/XbR2V53/pexels-davincidelasfotos-29859279.jpg",
            quote: "The ambiance, the food, the service—everything was top-notch!",
        },
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Customer Testimonials | Your Restaurant Name";
        Aos.init({ duration: 1000 });
    }, []);

    return (
        <section className="bg-red-200 py-12">
            <div className="max-w-screen-xl mx-auto px-4 text-center">

                <Slide>
                    <h2 className="text-7xl font-bold font-charm text-red-800 mb-6">
                        What our customers say
                    </h2>
                </Slide>
                <p className="text-lg text-gray-700 mb-8">
                    Discover the exceptional flavors and culinary masterpieces crafted by our chefs, as shared by our delighted guests.
                </p>

                <div className="flex flex-wrap justify-center gap-6" data-aos="fade-up">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-red-400 shadow-md rounded-lg p-4 w-full md:w-1/3 transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
                        >
                            <img
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="w-16 h-16 rounded-full mx-auto mb-4"
                            />
                            <h3 className="text-xl font-bold text-red-900">{testimonial.name}</h3>
                            <p className="text-white italic mt-2">{testimonial.quote}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CustomerTestimonials;

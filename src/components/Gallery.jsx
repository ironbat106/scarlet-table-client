import { useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const Gallery = () => {
    const images = [
        {
            src: "https://img.delicious.com.au/XJ9pcgsR/del/2023/12/panettone-italy-203305-3.jpg",
            description: "Festive breakfast spread perfect for the holidays",
            name: "Oliver Brown",
        },
        {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJfDtj4ylyIrg2dsl5KkWM-_RJXUpMf-b00w&s",
            description: "Rich chocolate dessert with a hint of elegance",
            name: "Sophia Adams",
        },
        {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThPJuihQQrw06cJ8f7QLnSo5p9KerhQPTEfw&s",
            description: "Classic strawberry shortcake with a modern twist",
            name: "Liam Johnson",
        },
        {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSrn1wNjY5S70QKDMELgte58VieLazuKKQqg&s",
            description: "Savor the sweetness of a caramel delight",
            name: "Ava Martinez",
        },
        {
            src: "https://allergylicious.com/wp-content/uploads/2020/12/frosted-sugar-cookie-7-scaled-720x720.jpg",
            description: "Freshly baked cookies, straight from the oven",
            name: "Ethan Lee",
        },
        {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC_AVQNi4BBOaHR0ts2ZelrdBGIcIX4o8wDw&s",
            description: "Velvety smooth cheesecake topped with berries",
            name: "Isabella Garcia",
        },
        {
            src: "https://i.ytimg.com/vi/WgX4iDZhVag/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDYK4siK3aVeB4Qo-2QSgjq-jbhQg",
            description: "Mouthwatering éclairs with a creamy filling",
            name: "Mason Smith",
        },
        {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp8G93LLfhCbHJ9gSxtuRtksr0hyXqgZKChA&s",
            description: "A tropical fruit salad bursting with flavors",
            name: "Charlotte Taylor",
        },
        {
            src: "https://yeyfood.com/wp-content/uploads/2024/02/Choc-Mousse-735x805.jpg",
            description: "A decadent chocolate mousse to satisfy cravings",
            name: "Amelia Rodriguez",
        },
        {
            src: "https://i0.wp.com/peachypalate.com/wp-content/uploads/2020/01/Kenwood-Blender-Pancakes-1.jpg?w=1080&ssl=1",
            description: "Fluffy pancakes drizzled with maple syrup",
            name: "James Wilson",
        },
    ];


    const [isOpen, setIsOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleClickImage = (index) => {
        setCurrentImageIndex(index);
        setIsOpen(true);
    };

    return (
        <div>
            <NavBar />
            <div
                className="max-w-screen-xl mx-auto px-4 py-12 text-center"
                style={{
                    backgroundImage: 'url("https://www.watermelon.org/wp-content/uploads/2023/02/Sandwich_2023.jpg")',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                    height: "300px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column", // Added to stack elements vertically
                }}
            >
                <h2
                    className="text-7xl font-bold text-red-100 mb-6"
                    style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 1)" }}
                >
                    Gallery
                </h2>

                <p className="mt-6 text-lg md:text-xl text-white"
                    style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 1)" }}>
                    Our restaurant's gallery showcases a collection of mouthwatering dishes, capturing the essence of culinary excellence.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 py-8">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="relative group"
                        onClick={() => handleClickImage(index)}
                    >
                        <img
                            src={image.src}
                            alt={`Gallery image ${index + 1}`}
                            className="w-full h-56 object-cover rounded-lg transition-transform duration-300 ease-in-out"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center text-white transition-opacity duration-300 ease-in-out rounded-lg">
                            <h3 className="text-lg font-semibold">{image.name}</h3>
                            <p className="text-sm">{image.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <Lightbox
                open={isOpen}
                close={() => setIsOpen(false)}
                index={currentImageIndex}
                slides={images.map((image) => ({ src: image.src }))}
            />

            <Footer />
        </div>
    );
};

export default Gallery;

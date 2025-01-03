import FoodLoading from "../assets/FoodLoading.json";
import Lottie from "lottie-react";

const Loading = () => {
    return (
        <div className="flex flex-col min-h-screen justify-center items-center space-y-4 bg-gradient-to-r from-red-600 via-red-500 to-red-400 text-white">

            <div className="w-64">
                <Lottie animationData={FoodLoading} />
            </div>

            <p className="text-orange-200 text-lg text-center px-4">
                The kitchen is firing up! Your delicious experience is almost ready to be served.
            </p>
        </div>
    );
};

export default Loading;

import { Link } from "react-router-dom";
import ErrorAni from "../assets/ErrorAni.json";
import Lottie from "lottie-react";

const Error = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-red-800 via-red-700 to-orange-700 text-white">

            <h1 className="text-7xl lg:text-9xl font-bold text-orange-300">
                Error: 404!
            </h1>

            <p className="text-xl lg:text-3xl mt-4 text-gray-200 text-center px-4">
                Oops! Looks like this page decided to explore new horizons.
            </p>

            <p className="text-lg lg:text-xl mt-2 text-orange-100 italic text-center">
                Guess it’s out savoring the flavors of the unknown.
            </p>

            <div className="mt-6 w-72 lg:w-96">
                <Lottie animationData={ErrorAni} />
            </div>

            <div className="mt-8">
                <Link
                    to="/"
                    className="px-6 py-2 text-lg font-semibold bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-400 transition-all"
                >
                    Go Back to ScarletTable
                </Link>
            </div>

            <p className="mt-6 text-sm text-orange-200">
                (P.S. If this feels wrong, maybe refresh... or blame the internet gremlins.)
            </p>

        </div>
    );
};

export default Error;

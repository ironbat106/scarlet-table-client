import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div id="footer" className="text-white pt-10 pb-5 border-t border-gray-300 bg-gradient-to-r from-red-800 via-red-700 to-orange-700">
            <div className="max-w-screen-xl mx-auto px-4">

                <div className="flex justify-between items-center mb-8">

                    <Link to="/" className="text-4xl font-bold">
                        <span className="text-orange-300">Scarlet</span>
                        <span className="text-white">Table</span>
                    </Link>

                    <div className="flex space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-all">
                            <FaFacebook className="text-orange-300 hover:text-orange-400 text-3xl" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-all">
                            <FaTwitter className="text-orange-300 hover:text-orange-400 text-3xl" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-all">
                            <FaInstagram className="text-orange-300 hover:text-orange-400 text-3xl" />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-all">
                            <FaYoutube className="text-orange-300 hover:text-orange-400 text-3xl" />
                        </a>
                    </div>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

                    <div>
                        <h4 className="text-2xl font-semibold text-orange-300 mb-4">About Us</h4>
                        <p className="text-sm text-gray-300">
                            ScarletTable is your destination for delightful dining experiences. We offer a variety of flavorful dishes made with love and fresh ingredients. Whether it’s a family dinner or a romantic date, we’ve got you covered.
                        </p>
                    </div>


                    <div>
                        <h4 className="text-2xl font-semibold text-orange-300 mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-300 hover:text-orange-300 transition-all text-lg">Home</Link>
                            </li>
                            <li>
                                <Link to="/addEateries" className="text-gray-300 hover:text-orange-300 transition-all text-lg">Add Food</Link>
                            </li>
                            <li>
                                <Link to="/allEateries" className="text-gray-300 hover:text-orange-300 transition-all text-lg">All Foods</Link>
                            </li>
                            <li>
                                <Link to="/galleries" className="text-gray-300 hover:text-orange-300 transition-all text-lg">Gallery</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-2xl font-semibold text-orange-300 mb-4">Contact Us</h4>
                        <p className="text-sm text-gray-300">Email: hello@scarlettable.com</p>
                        <p className="text-sm text-gray-300">Phone: +880 9876543210</p>
                        <p className="text-sm text-gray-300">Address: 123 Gourmet Lane, Dhaka, Bangladesh</p>
                    </div>
                </div>


                <div className="text-center text-sm text-gray-400">
                    <p>© 2024 ScarletTable. All Rights Reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;

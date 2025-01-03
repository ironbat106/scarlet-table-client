import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';


const AuthLayout = () => {
    return (
        <div>
            
            <NavBar></NavBar>

            <header className='py-3 w-11/12 mx-auto'> 
                <Outlet></Outlet>
            </header>
            
            <Footer></Footer>
        </div>
    );
};

export default AuthLayout;
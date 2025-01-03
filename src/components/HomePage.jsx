import { useEffect, useState } from "react";
import MainSection from "./MainSection";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Loading from "./Loading";

const HomePage = () => {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Home | ScarletTable";

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if(isLoading) {
      return <Loading></Loading>;
  }

  return (
    <div>

      <nav>
        <NavBar></NavBar>
      </nav>

      <main>
        <MainSection></MainSection>
      </main>

      {/* <footer>
        <Footer></Footer>
      </footer> */}

    </div>
  );
};

export default HomePage;
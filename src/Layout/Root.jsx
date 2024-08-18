
import { Outlet } from "react-router-dom";
import Nav from "../Shared/Navbar/Nav";
import Footer from "../Shared/Footer/Footer";

const Root = () => {
    return (
        <div className="">

            <div className="max-w-64 fixed top-0 z-10 px-7 py-10 bg-[#D1D3D6]">
                <Nav/>
            </div>

            <div className="w-4/5 ml-80">
                <Outlet/>
            </div>

            <div className="">
                <Footer/>
            </div>

        </div>
    );
};

export default Root;

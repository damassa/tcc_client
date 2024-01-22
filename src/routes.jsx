import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from "./components/footer";
import SerieDetail from "./pages/SerieDetail";
import EditUser from "./pages/EditUser";

const SiteRoutes = () => {
    const [purpleNav, setPurpleNav] = useState(false);

    useEffect(() => {
        const scrollListener = () => {
            if(window.scrollY > 10) {
                setPurpleNav(true);
            } else {
                setPurpleNav(false);
            }
        }

        window.addEventListener('scroll', scrollListener);
        return () => {
            window.removeEventListener('scroll', scrollListener);
        }
    }, []);

    return (
        <BrowserRouter>
            <Navbar purple={purpleNav} />
            <Routes>
                <Route exact path="/" component={<Home />} />
                <Route exact path="/detail" component={<SerieDetail />} />
                <Route exact path="/edit" component={<EditUser />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}
export default SiteRoutes;
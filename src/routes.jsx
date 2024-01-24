import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from "./components/footer";
import SerieDetail from "./pages/SerieDetail";
import EditUser from "./pages/EditUser";
import Login from "./pages/Login";

const Routes = () => {
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
            <Switch>
                <Route path="/" exact element={<Home />} />
                <Route path="/detail" exact element={<SerieDetail />} />
                <Route path="/edit" exact element={<EditUser />} />
                <Route path="/login" exact element={<Login />} />
            </Switch>
            <Footer />
        </BrowserRouter>
    );
}
export default Routes;
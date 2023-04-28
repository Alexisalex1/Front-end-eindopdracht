import React from "react";
import Vegan from "../components/Slidebars/vegan";
import Vegetarian from "../components/Slidebars/vegetarian";


function Home() {
    return (
        <div>
            <Vegetarian/>
            <Vegan/>
        </div>
    );
}

export default Home;
import {BsEggFried} from "react-icons/bs"
import {TbPlant2} from "react-icons/tb"
import {FaBalanceScale} from "react-icons/fa"
import {NavLink} from "react-router-dom";
import "./categories.css"


function Category() {
    return (
        <div className="list-icons navlink-decoration">
            <NavLink to="/diets/high-protein" >
                <BsEggFried className="icon-decoration" />
                <h4 className="iconlabel-decoration"> Protein Based
                </h4>
            </NavLink >
            <NavLink to="/diets/high-fiber" >
                <TbPlant2 className="icon-decoration"/>
                <h4 className="iconlabel-decoration" > high-fiber
                </h4>
            </NavLink>
            <NavLink to="/diets/balanced" >
                <FaBalanceScale className="icon-decoration" />
                <h4 className="iconlabel-decoration" > Balanced
                </h4>

            </NavLink>
        </div>


    )}


export default Category


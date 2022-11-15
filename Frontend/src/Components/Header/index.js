import "./styleHeader.css"
import * as React from "react";

import { FaBars } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";

import Senai from '../../assets/senai.png'
import Sair from '../../assets/sair.svg'
import { useDispatch } from "react-redux";



export default function Header(){
   
    const [sidebar, setSidebar] = React.useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const showSidebar = () => setSidebar(!sidebar)
    function LogoutUser(){
        dispatch({type:"REMOVE_TOKEN"})
        navigate("/")
    }
    return(
        <>
            <header>
                <div className="header-content-left">
                    <FaBars size={25} id="menu-button" onClick={showSidebar}/>
                    <img id="senai-logo" src={Senai} alt="" />
                </div>
                <div>
                    <button id="button-exit" onClick={()=>LogoutUser()}>
                        <BiLogIn size={30} />
                    </button>
                </div>
            </header>
            <div>
                {sidebar && <Sidebar active={setSidebar}/>}
            </div>
        </>
    );
}
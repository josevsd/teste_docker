import React from "react";
import './styleSidebar.css'

import { Link } from "react-router-dom";

import Perfil from '../../assets/perfil.png'

import { FiList } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import { ImHome3 } from "react-icons/im";
import { BiTask } from "react-icons/bi";


export default function Sidebar(){
    

    return(
        <div className="containerSidebar">
            <div className="contentSidebar">

                <div className="containerSidebarPerfil">
                    <img src={Perfil} alt="" />
                    <div className="infosPerfilSidebar">
                        <h id="cargoSidebar">Administrador</h>
                        <p id="nameSidebar">Geraldo Luiz</p>
                    </div>
                </div>
                    
                <div className="containerSidebarButtons">
                    <nav>
                        <Link to="/departments" id="linkSidebar">
                            <button>
                                <ImHome3 size={25} id="iconSidebar"/>
                                <p>Departamentos</p>
                            </button>
                        </Link>

                        <Link to="/table" id="linkSidebar">
                            <button>
                                <FiList size={25} id="iconSidebar"/>
                                <p>Tabela de Itens</p>
                            </button>
                        </Link>
                        
                        <Link to="/tableUsers" id="linkSidebar">
                            <button>
                                <FaUsers size={25} id="iconSidebar"/>
                                <p>Usuários</p>
                            </button>
                        </Link>

                        <Link to="/verifications" id="linkSidebar">
                            <button>
                                <BiTask size={25} id="iconSidebar"/>
                                <p>Verifição</p>
                            </button>
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    )
}
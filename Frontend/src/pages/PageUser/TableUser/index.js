import * as React from "react";
import { useState, useEffect } from 'react';
// import Users from "../Users";
import '../StylesUsers/tableUser.css'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { FaInfoCircle } from 'react-icons/fa'
import ModalUser from "../../ModalUsers";
import Axios from 'axios';

export default function TableUser() {
    // const [data, setData] = React.useState(Users);
    const [data, setData] = React.useState([]);

    const [url, setUrl] = useState("http://localhost:3500/users");

    //Pega as informações do sql como url
    useEffect(() => {
        Axios.get(url)
            .then((response) => {
                setData(response.data);
                console.log(response.data)
            })
            .catch((err) => {
                console.log(err)
            });
    }, []);



    return (
        <>
            <div className="containerUsersUp">
                <div className="tableUsersContainer">

                    <div className="subContainerUsers">
                        <table className="tableUsers">
                            <thead className="theadUsers">
                                <tr>
                                    <td>Email</td>
                                    <td>Nome de Usuário</td>
                                    <td>Local</td>
                                    <td>Sala</td>
                                    <td></td>
                                </tr>
                            </thead>

                            {data.map((values) => {
                                //console.log(values);
                                // const { email, name, local } = values;
                                return (
                                    <tbody>
                                        <tr>
                                            <td >
                                                <div>
                                                    <div>
                                                        <p id="id-object">{values.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span >{values.name}</span>
                                            </td>
                                            <td>
                                                <span>{values.department}</span>
                                            </td>
                                            <td>
                                                <span>{values.room}</span>
                                            </td>
                                            <td >
                                                <div>
                                                    <button
                                                    >
                                                        <ModalUser
                                                            id={values.id}
                                                            email={values.email}
                                                            nome={values.name}
                                                            
                                                            //Ativar na tabela de Users
                                                            dep={values.department}
                                                            //Ativar na tabela de Users
                                                            sala={values.room} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                );
                            })}
                        </table>
                    </div>

                    <div className="tableUsersFooter">
                        <div className="paginationUsers">
                            <span>mostrando 1 - 10 de 45</span>
                            <nav>
                                <ul>
                                    <li className="arrowsUsers">
                                        <FaChevronLeft size={20} />
                                    </li>
                                    <li className="numberSelectedUsers">1</li>
                                    <li className="numberUsers">2</li>
                                    <li className="numberUsers">3</li>
                                    <li className="numberUsers">4</li>
                                    <li className="numberUsers">5</li>
                                    <li className="arrowsUsers">
                                        <FaChevronRight size={20} />
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
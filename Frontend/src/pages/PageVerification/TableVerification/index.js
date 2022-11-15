import * as React from "react";
// import Verifications from "../Verifications";
import '../StylesVerification/tableVerification.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { FaRegCheckCircle, FaTimesCircle, FaInfoCircle, FaUserAlt, FaCheck } from "react-icons/fa";
import './Modalstyle.css'

export default function TableVerification() {
    // const [data, setData] = React.useState(Verifications);
    const [apiData, setApiData] = useState([])
    const [userData, setUserData] = useState([])
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() => {
        (async () => {
            const url = 'http://localhost:3500/requests'
            await axios.get(url)
                .then((res) => {
                    console.log(res.data)
                    setApiData(res.data.resFind)
                })
        })()
    }, [])


    function handlerSubmit() {
        axios.post('http://localhost:3500/user/register', userData)
            .catch(err => console.log(err))
    }

    function handlerDelete(){
        axios.delete('http://localhost:3500/request/delete', userData)
            .catch(err => console.log(err))
    }

    return (
        <>
            <div className="containerVerificationUp">
                <div className="tableVerificationContainer">

                    <div className="subContainerVerification">
                        <table className="tableVerification">
                            <thead className="theadVerification">
                                <tr>
                                    <td>Email</td>
                                    <td>Email</td>
                                    <td>Data de requisição</td>
                                    <td></td>
                                </tr>
                            </thead>

                            {apiData.map((values) => {
                                const { email, name, createdAt } = values;
                                return (
                                    <tbody>
                                        <tr>
                                            <td >
                                                <div>
                                                    <div>
                                                        <p id="id-object">{email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span>{name}</span>
                                            </td>
                                            <td>
                                                <span>{createdAt}</span>
                                            </td>
                                            <td >
                                                <div>
                                                    <button >
                                                        <div>
                                                            <button onClick={openModal}>
                                                                <FaCheck size={20} color="#33F46F" />
                                                            </button>
                                                            <Modal
                                                                isOpen={modalIsOpen}
                                                                onRequestClose={closeModal}
                                                                contentLabel="exemplo"
                                                                overlayClassName="modal-overlay"
                                                                className="modal-verification-content">

                                                                <div className="containerInfoVerification">
                                                                    <div>
                                                                        <p>Deseja permitir o acesso desse usuário?</p>
                                                                    </div>

                                                                    <div className="containerButtonsModalVerification">

                                                                        <div className="containerInputModalVerification">
                                                                            <input
                                                                                className="InputModalVerification"
                                                                                placeholder="Email"
                                                                                value={email}
                                                                                onChange={(event) => setUserData({ ...userData, email: event.target.value })}
                                                                            ></input>
                                                                        </div>
                                                                        <div className="containerInputModalVerification">
                                                                            <input
                                                                                className="InputModalVerification"
                                                                                placeholder="Nome"
                                                                                value={name}
                                                                                onChange={(event) => setUserData({ ...userData, name: event.target.value })}
                                                                            ></input>
                                                                        </div>
                                                                        <div>
                                                                            <label>Sim</label>
                                                                            <button><FaRegCheckCircle size={20} color="#33F46F" onClick={() => handlerSubmit()}/></button>
                                                                        </div>
                                                                        <div>
                                                                            <label>Não Permitir</label>
                                                                            <button><FaTimesCircle size={20} color="red" onClick={()=> handlerDelete()}/></button>
                                                                        </div>

                                                                    </div>
                                                                </div>

                                                            </Modal>
                                                        </div>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                );
                            })}
                        </table>
                    </div>

                </div>
            </div>
        </>
    )
}
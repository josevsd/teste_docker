import * as React from "react";
import Modal from "react-modal";
import './styles.css'
import { FaInfoCircle, FaTimes, FaPen, FaUserEdit } from "react-icons/fa";


export default function ModalUser(props){
    const [modalIsOpen, setIsOpen ] = React.useState(false);

    //console.log(props)

    function openModal() {
        setIsOpen(true);
      }
    
      function closeModal() {
        setIsOpen(false);
      }

    return(
        <div>
            <button onClick={openModal}>
                <FaUserEdit size={20}/>
            </button>
            <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="exemplo"
            overlayClassName="modal-overlay"
            className="modal-user-content">
                <p id="titleModalUser">Informações de Usuários</p>
                <div className="containerInfoUser">
                    <div className="infoUser">
                        <label>Email</label>
                        <input value={props.email}/>
                        {/* <output>{props.email}</output> */}
                        
                    </div>
                    <div className="infoUser">
                        <label>Nome do usuário</label>
                        <input value={props.nome}/>
                    </div>
                    <div className="infoUser">
                        <label>Departamento</label>
                        <input value={props.dep}/>
                    </div>
                    <div className="infoUser">
                        <label>Sala</label>
                        <input value={props.sala}/>
                    </div>

                    <div className="containerButtonsModalUser">
                        <button><FaPen size={15} color="blue"/></button>
                        <button><FaTimes size={15} color="red"/></button>
                    </div>
                </div>
            
            </Modal>
        </div>
    )
}
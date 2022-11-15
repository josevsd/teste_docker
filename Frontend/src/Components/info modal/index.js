import * as React from 'react';
import Modal from 'react-modal';
import './modalInfo.css'
import { FaInfoCircle } from 'react-icons/fa'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
function ModalInfo(props) {
    
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const States = useSelector((State) => State)
    const Patrimony = States.GetValue.value.nPatrimony
    const Imagem = States.GetValue.value.image
    const [Data, SetData] = useState();

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    async function deletePatrimony() {

        await axios.delete(`http://localhost:3500/deletePatrimony/${Patrimony}`)
            .then((response) => { alert("Patrimônio deletado") })
            .catch((err) => { alert(err) })
    }
    function UpdatePatrimony() {
        axios.put(`http://localhost:3500/updatePatrimony/${Patrimony}`, Data)
            .then((response) => { alert("Patrimônio alterado") })
            .catch((err) => { alert(err) })
    }


    return (
        <div className="containerModal">

            <button onClick={openModal}>
                <FaInfoCircle size={20} id={props.theme} />
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                overlayClassName="modal-overlay"
                className="modal-content"
            >
                <div className='headerModal'>
                    <h1>Informaçoes do patrimônio</h1>
                    <p>Neste modal você poderá fazer as seguintes alterações:</p>
                </div>

                <form>
                    <div className='containerUpModal'>
                        <div className='containerImage'>
                        <img alt="item" id='item' src={Imagem} />
                        </div>
                        <div>
                            <div className='containerRight'>

                                <div>
                                     <label>Modelo</label>
                                     <select onChange={(value) => { SetData({ ...Data, type: value.target.value }) }} defaultValue="cadeira">
                                         <option id='cadeira' value="cadeira" selected>
                                             Cadeira
                                         </option>
                                         <option id='mesa' value="mesa">                                   
                                         Mesa                               
                                         </option>
                                         <option id='computador' value="computador">                
                                         Computador
                                         </option>
                                         <option id='televisao' value="televisao">

                                             Televisão
                                         </option>
                                         <option id='televisao' value="projetor">

                                             Projetor
                                         </option>
                                     </select>
                                 </div>

                                <div className='containerInfo'>
                                    <div>
                                        <label>Situação</label>
                                        <select onChange={(value) => { SetData({ ...Data, type: value.target.value }) }} defaultValue="cadeira">
                                            <option id='ativo' value="ativo">
                                                Ativo
                                            </option>
                                            <option id='manutencao' value="manutencao">
                                                Manutenção
                                            </option>
                                            <option id='danificado' value="danificado">
                                                Danificado
                                            </option>
                                            <option id='movido' value="movido">
                                                Movido
                                            </option>
                                        </select>
                                    </div>
                                    <div>
                                        <label>Código</label>
                                        <input onChange={(value)=>SetData({...Data,numberPatrimony:value.target.value})} />
                                    </div>
                                </div>
                                <div className='containerInfo'>

                                    <div>
                                        <label>N° de identificação</label>
                                        <input  onChange={(value)=>SetData({...Data,numberPatrimony:value.target.value})} />
                                    </div>
                                    <div>
                                        <label>Valor</label>
                                        <input  onChange={(value)=>{SetData({...Data,value:value.target.value})}}/>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>


                    <div className='containerButtons'>
                        <button id='back'>Voltar</button>
                        <button id='delete' onClick={()=>{deletePatrimony()}}> Excluir</button>
                        <button id='edit' onClick={()=>{UpdatePatrimony()}}>Editar</button>
                    </div>
                </form>
            </Modal>

        </div>
    );
}

export default ModalInfo;

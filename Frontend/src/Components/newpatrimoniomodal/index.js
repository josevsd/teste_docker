import * as React from 'react';
import Modal from 'react-modal';
import { FaPlus } from 'react-icons/fa'
import './newpatrimonio.css'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
function NewPatrimonioModal() {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [Data, SetData] = React.useState([])
    const [Excel,SetExcel] = React.useState();
    const states = useSelector((State) => State)

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    async function uploadArchive(e){
        const formData = new FormData();
        formData.append("excel",Excel)
        axios.post("http://localhost:3500/byexcel",formData)
        .then((response)=>{console.log(response)})
        .catch((err)=>{console.log(err)})
    }
    async function NewPatrimony() {

        const url = `http://localhost:3500/insertPatrimony/12`

        const header = sessionStorage.getItem("token")
        console.log(header)
        await axios.post(url, Data, {
            headers: {
                'x-access-token': header
            }
        })
            .then((response) => { alert(response.data) })
            .catch((err) => {
                console.log(err)
                alert("Falha ao criar o patrimônio")
            })

    }

    useEffect(() => {
        console.log(states.Token)
    })
    return (
        <div className="container-new-modal">
            <button onClick={openModal}>
                <FaPlus size={25} />
                {/* <span className="tooltiptext">Adicionar item</span> */}
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="modalContentPatrimonio"
                overlayClassName="modal-overlay"
            >
                <div className='title'>
                    <h1 id='title-modal'>Cadastrar novo patrimônio</h1>
                    <p id='info-modal'>Neste modal você poderá fazer as seguintes alterações:</p>
                </div>
                <div className='containerOne'>
                    <div>
                        <label>Adicionar arquivo excel</label>
                        <input type="file"  accept='.xlsx'  onChange={(value)=>{SetExcel(value.target.files[0])}}/>
                    </div>
                    <div>
                        <label>Situação</label>
                        <select id='selectSituation' onChange={(value) => { SetData({ ...Data, situation: value.target.value }) }} defaultValue="ativo">
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
                </div>
                <div className='containerTwo'>

                    <label>Modelo</label>
                    <select onChange={(value) => { SetData({ ...Data, type: value.target.value }) }} defaultValue="cadeira">
                        <option value="cadeira">
                            Cadeira
                        </option>
                        <option value="projetor">
                            Projetor
                        </option>
                        <option value="computador">
                            Computador
                        </option>
                        <option value="mesa">
                            Mesa
                        </option>
                        <option value="televisao">
                            Televisão
                        </option>
                    </select>

                    <label>Numero da sala </label>
                    <input onChange={(value) => { SetData({ ...Data, room: value.target.value }) }} />
                </div>
                <div className='containerThree'>
                    <div>
                        <label>N° de identificação</label>
                        <input onChange={(value) => { SetData({ ...Data, codePatrimony: value.target.value }) }} />
                    </div>
                    <div>
                        <label>Valor</label>
                        <input onChange={(value) => { SetData({ ...Data, valuePatrimony: value.target.value }) }} />
                    </div>
                </div>

                <div className='containerButton'>
                    <button id='delete' onClick={()=>{uploadArchive()}}> upload</button>
                    <button id='new' onClick={() => NewPatrimony()}>Cadastrar patrimonio</button>
                </div>
            </Modal>

        </div>
    );
}

export default NewPatrimonioModal;
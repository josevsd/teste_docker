import './style.css';
import { useState } from "react";
import Modal from "react-modal";
import axios from 'axios';

Modal.setAppElement("#root")

function ModalDeparmento() {
  const [modalIsOpen, setIsOpen ] = useState(false);
  const [modalCreateDeparment, setModalCreateDeparment] = useState(false);
  const [Department,SetDepartment] = useState([]);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function CreateDepartment(){
    console.log(Department)
    axios.post("http://localhost:3500/room/insert",Department)
    .then((response)=>{alert(response.data)})
  }
  function modalCriarDeparment(){
    return(<Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="exemplo"
      overlayClassName="modal-overlay"
      className="modal-content-departamento">
        <h1>Criar Departamento</h1>

       

        <div className='container-info'>
          <div className='container-nome-novo'>
            <label>Nome do departamento</label>
            <input className='input-nome'></input>
          </div>
          <div className='container-identificacao-novo'>
            <label>N° de identificação</label>
            <input className='input-identificacao'></input>
          </div>
        </div>

        <div className='container-button'>
          <button onClick={() => {}} className='btn-cadastrar'>Cadastrar</button>
          <button onClick={()=>setModalCreateDeparment(false)} className='btn-voltar'>voltar</button>
        </div>
      </Modal>);
  };

  return (
    <div className='container-modal-departamento'>
      <div className='container-etiquetas'>
        <div className='card-total-itens'>
          
            <h1>Total de itens</h1>
            <p>4.669</p>
        </div>
      <button className="btn-ver" onClick={openModal}>
        <img src='../assets/cadastro.png' alt='' className='icon-cadastro'/>
        cadastrar item
      </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="exemplo"
        overlayClassName="modal-overlay"
        className="modal-content">
          <h1>Cadastrar novo departamento</h1>

          <div className='container-menu'>
            <label>Departamento</label>
            <select className='menu-select'  onChange={(e)=>{SetDepartment({...Department,type:e.target.value})}} defaultValue="sala">
              <option  value="sala">Sala</option>
              <option value="laboratorio">Laboratório</option>
              <option value="oficina">Oficina</option>
              <option value="biblioteca">Biblioteca</option>
              <option value="refeitorio">Refeitório</option>
            </select>
          </div>

          <div className='container-info'>
            <div className='container-nome'>
              <label>Responsável</label>
              <input className='input-nome' onChange={(e)=>{SetDepartment({...Department,responsable:e.target.value})}}></input>
            </div>
            <div className='container-identificacao'>
              <label>N° de identificação</label>
              <input className='input-identificacao' onChange={(e)=>{SetDepartment({...Department,numberRoom:e.target.value})}}></input>
            </div>
          </div>

          <div className='container-button'>
            <button onClick={() => {CreateDepartment()}} className='btn-cadastrar'>Cadastrar</button>
            <button onClick={closeModal} className='btn-voltar'>voltar</button>
          </div>
        </Modal>
        {modalCreateDeparment && modalCriarDeparment()}
    </div>
  );
}

export default ModalDeparmento;


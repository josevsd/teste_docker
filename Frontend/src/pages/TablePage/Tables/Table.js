import React, { useState, useEffect } from "react";
import '../StylesTable/table.css'
import ModalInfo from "../../../Components/info modal";
import NewPatrimonioModal from '../../../Components/newpatrimoniomodal';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";


function Tables() {
  const [Datas, SetDatas] = useState([])
  const [Filter, SetFilter] = useState([]);
  const dispatch = useDispatch();
  const states = useSelector((State)=>State)
  const Room = sessionStorage.getItem("room")
  const nDepartment = sessionStorage.getItem("department")
  async function filterResult(value) {
   
    if (Filter.length>0) {
      SetDatas([])
      await axios.post(`http://localhost:3500/${Room}/filterPatrimony/${nDepartment}/${Filter}`)
        .then((response) => {
          SetDatas(response.data.FilterPatrimony[0].rooms[0]?.patrimonies)
          
          
        })
        .catch((err) => { console.log(err) })
    }
    else{
      SetDatas([])
       axios.get(`http://localhost:3500/${nDepartment}/patrimony/${Room}`)
      .then((response) => {
        SetDatas(response.data?.rooms[0].patrimonies)
  
      })

      
    }

  }

  useEffect(() => {
  
    filterResult();
  },[Filter])

  return (
    <>
      <div className="containerUp">
        <div className="row">
          <table>
            <thead>
              <tr>
                <td>
                  <text className="textclass">Filter</text>
                </td>
              </tr>
            </thead>
            <tbody>
              <div className="col">
                <button className="checkbtn" onClick={() => SetFilter("all")}>
                  All
                </button>
                <button
                  className="checkbtn"
                  onClick={() => SetFilter("cadeira")}
                >
                  Cadeira
                </button>
                <button className="checkbtn" onClick={() => SetFilter("projetor")}>
                  Projetor 
                </button>
                <button
                  className="checkbtn"
                  onClick={() => SetFilter("computador")}
                >
                  Computador
                </button>
                <button
                  className="checkbtn"
                  onClick={() => SetFilter("televisao")}
                >
                  Televisão
                </button>
                <button
                  className="checkbtn"
                  onClick={() => SetFilter("mesa")}
                >
                  Mesa
                </button>
              </div>
            </tbody>
          </table>
        </div>


        <div className="tableContainer">
          <button className="btn-add-patrimonio">
            <NewPatrimonioModal />
          </button>

          <div className="subContainer">
            <table className="table">
              <thead className="thead">
                <tr>
                  <td></td>
                  <td>N° de identificação</td>
                  <td>Nome/modelo</td>
                  <td>Valor R$</td>
                  <td>Situação</td>

                </tr>
              </thead>

              {Datas.map((values) => {
              
                return (
                  <>
                    <tbody>
                      <tr>
                        <td >
                          <div>
                            <button onClick={()=>{dispatch({type:'ADD_VALUE',data:{nPatrimony:values?.nPatrimony,image:values?.image}})}}>

                              <ModalInfo />
                            </button>
                          </div>
                        </td>
                        <td >
                          <div>
                            <div>
                              <p className="id-object">{values?.nPatrimony}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span >{values?.type}</span>
                        </td>
                        <td>
                          <span>{values?.value}</span>
                        </td>
                        <td >
                          <span >{values?.status}</span>
                        </td>

                      </tr>
                    </tbody>
                  </>
                );

              })}
            </table>
          </div>

          <div className="tabbleFooter">
            <div className="pagination">
              <span>mostrando 1 - 10 de 45</span>
              <nav>
                <ul>
                  <li className="arrows">
                    <FaChevronLeft size={20} />
                  </li>
                  <li className="numberSelected">1</li>
                  <li className="number">2</li>
                  <li className="number">3</li>
                  <li className="number">4</li>
                  <li className="number">5</li>
                  <li className="arrows">
                    <FaChevronRight size={20} />
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tables;

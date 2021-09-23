import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import api from '../services/api';
import './styles/Phone.css';
import Trash from '../images/delete-24px.svg';
import Add from '../images/stay_current_portrait-24px.svg';
import Edit from '../images/edit-24px.svg';

export default function Phones() {
const [arraySmartphones, setArraySmartphones] = useState([]);

useEffect(() => {
  api.get('/phone', { 'cpf': '04925787454' }).then((response) => {
    setArraySmartphones(response.data);
  })
  //eslint-disable-next-line
}, [])

const deleteSmartphone = (event) => {
  console.log(event.target);
  const id = event.target.value;
  api.delete(`/phone/${id}`, { 'cpf': '04925787454' }).then((response) => {
    setArraySmartphones(response.data);
  })
  // eslint-disable-next-line no-restricted-globals
  location.reload()
}

const redirect = () => {
  window.location.href = "http://localhost:3000/add";
}

const editSmartphone = (event) => {
  console.log(event)
  const Code = event.target.value
  window.location.href = `http://localhost:3000/edit/${Code}`;
}

  return (
    <>
      <Header />
      <div className="container-phones">
      <div className="container-scroll">
        <div className="products-button">
        <h5>Produtos</h5>
      <button onClick={redirect} className="add" type="button"><span className="spans">+</span>
              <img alt="editar item" src={ Add } />adicionar
      </button>
      </div>
        <table className="tables">
          <thead>
            <tr>
              <th scope="col">Codigo</th>
              <th scope="col">Modelo</th>
              <th scope="col">Preço</th>
              <th scope="col">Marca</th>
              <th scope="col">Cor</th>
            </tr>
          </thead>
          <tbody>
          { arraySmartphones.map(({ Brand, Model, Code, Color, Price}, index) =>
            <tr>
              <td data-label="Codigo">{Code}</td>
              <td data-label="Modelo">{Model}</td>
              <td data-label="Preço">R$ {Price}</td>
              <td data-label="Marca">{Brand}</td>
              <td data-label="Cor">{Color}</td>
              <div className="buttons">
              
              <input className="edit" alt="" type="image" value={Code} src={ Edit } onClick={editSmartphone} />
              
              <input className="trash" alt="" type="image" value={index} src={ Trash } onClick={deleteSmartphone} />
             
              </div>
            </tr>
          )} 
          </tbody>
        </table>
        </div>
      </div>
      <Footer />
    </>
  )
}

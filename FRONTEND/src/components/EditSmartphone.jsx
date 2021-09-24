import api from '../services/api';
import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import './styles/EditSmartphone.css';

class EditSmartphone extends Component {
constructor() {
  super();
  this.state = {
    "Model": '',
    "Price": '',
    "Brand": '',
    "StartDate": '',
    "EndDate": '',
    "Color": '',
  };
    this.checkFields = this.checkFields.bind(this);
    this.handlerChange = this.handlerChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.formatarMoeda = this.formatarMoeda.bind(this);
}

// Faz uma requisição GET na api retornando um unico celular e o salva no state
componentDidMount() {
  let url = window.location.pathname;
  var id = url.substring(url.lastIndexOf('/') + 1);
  console.log(id);
  api.get(`/phone/${id}`, { 'cpf': '04925787454' }).then((response) => {
    const { Model, Price, Brand, StartDate, EndDate, Color, Code } = response.data;
    this.setState({ Model, Price, Brand, StartDate, EndDate, Color, Code });
  })
}

// Função generica para adicionar valores ao state
handlerChange(event) {
  const {name, value} = event.target;
  this.setState({[name]: value})
}

// Verifica se todas as entradas correspondem as condiçoes
checkFields() {
  const { Model, Price, Brand, StartDate, EndDate } = this.state;
  if(Model.length < 2 || Model.length > 255) {
     alert('O modelo deve conter mais de 2 caracteres e menos de 255!')}   
  if (Price <= 0) {
     alert('O preço deve ser positivo')}
  if(Brand.length < 2 || Brand.length > 255) {
     alert('O modelo deve conter mais de 2 caracteres e menos de 255!')}
  if(StartDate < '2018-12-25') {
     alert('A data de início deve ser posterior ao dia 25/12/2018!')}
  if(EndDate <= StartDate) {
     alert('A data de fim deve ser posterior a data de início!')}
  else {
    this.patchAPI()
  }
}

// Faz uma requisição PATCH na api enviando novos valores para update
patchAPI() {
  const { Code, Model, Price, Brand, Color, StartDate, EndDate } = this.state;
  api.patch(`/phone/${Code}`, { Code, Model, Price, Brand, Color, StartDate, EndDate },
   { 'cpf': '04925787454' } )
  .then((response) => {
    console.log(response);
    this.redirect();
  })
  .catch((err) => { 
    console.log(err)
  })
}

// Formata o valor do campo Price em formato BR
// https://html-css-js.com/?html=%3Cinput%20type=%22text%22%20maxlength=%229%22%20i$*$d=%22valor%22%20onkeyup=%22formatarMoeda()%22%3E&css=&js=%20%20%20%20function%20formatarMoeda()%20%7B%0A%20%20%20%20%20%20%20%20var%20elemento%20=%20document.getElementById(%27valor%27);%0A%20%20%20%20%20%20%20%20var%20valor%20=%20elemento.value;%0A%20%20%20%20%20%20%20%20%0A%0A%20%20%20%20%20%20%20%20valor%20=%20valor%20+%20%27%27;%0A%20%20%20%20%20%20%20%20valor%20=%20parseInt(valor.replace(/%5B%5CD%5D+/g,%20%27%27));%0A%20%20%20%20%20%20%20%20valor%20=%20valor%20+%20%27%27;%0A%20%20%20%20%20%20%20%20valor%20=%20valor.replace(/(%5B0-9%5D%7B2%7D)$/g,%20%22,$1%22);%0A%0A%20%20%20%20%20%20%20%20if%20(valor.length%20%3E%206)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20valor%20=%20valor.replace(/(%5B0-9%5D%7B3%7D),(%5B0-9%5D%7B2%7D$)/g,%20%22.$1,$2%22);%0A%20%20%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20%20%20elemento.value%20=%20valor;%0A%20%20%20%20%20%20%20%20if(valor%20==%20%27NaN%27)%20elemento.value%20=%20%27%27;%0A%20%20%20%20%20%20%20%20%0A%20%20%20%20%7D
formatarMoeda(event) {
  let elemento = event.target;
  let valor = event.target.value;
  valor = valor + '';
  valor = parseInt(valor.replace(/[\D]+/g, ''));
  valor = valor + '';
  valor = valor.replace(/([0-9]{2})$/g, ",$1");

  if (valor.length > 6) {
    valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
  }

  elemento.value = valor;
  if(valor === 'NaN') elemento.value = '';

  valor = elemento.value;

  this.setState({Price: valor});
}

// Redireciona para a rota '/'
redirect() {
  window.location.href = "http://localhost:3000/";
}

  render() {
    const { Model, Price, Brand, StartDate, EndDate, Color} = this.state;
    return (
      <>
        <Header />
        <div className="container-detalhes">
        <div>
        <h5>Detalhes do produto</h5>
        <div className="layout-divs">
        <section className="section-1">

        <label> Modelo
          <input type="text" minLength='2' name="Model"
          maxLength='255' value={Model} onChange={this.handlerChange}/>
        </label>

        <label> Cor
          <select name="Color" value={Color} onChange={this.handlerChange}>
            <option>Preto</option>
            <option>Branco</option>
            <option>Dourado</option>
            <option>Rosa</option>
          </select>          
        </label>

        <label> Inicio das vendas
          <input type="date" name="StartDate" value={StartDate} onChange={this.handlerChange}/>
        </label>
        </section>

        <section className="section-2">
        <label> Marca
          <input type="text" minLength='2' maxLength='255' name="Brand" value={Brand} onChange={this.handlerChange}/>
        </label>

        <label> Preço
          <input type="text" maxlength="9" value={Price} onChange={this.formatarMoeda}/>
        </label>       

        <label> Fim das vendas
          <input type="date" name="EndDate" value={EndDate} onChange={this.handlerChange}/>
        </label>
        </section>
        </div>
        <div className="container-input">
        <input type="button" value="Voltar" onClick={ this.redirect } />
        <input type="button" value="Salvar" onClick={ this.checkFields } />
        </div>
      </div>
      </div>
      <Footer />
    </>
    );
  }
}

export default EditSmartphone;

import React from 'react'
import Header from './Header';
import Footer from './Footer';
import './styles/AddSmartphone.css';
import api from '../services/api';

const info = {
  "Model": '',
  "Price": '',
  "Brand": '',
  "StartDate": '',
  "EndDate": '',
  "Color": 'BLACK',
  "Code": '',
};

export default class AddSmartphone extends React.Component {
  constructor() {
    super();
    this.state = info;
    this.handlerChange = this.handlerChange.bind(this);
    this.checkFields = this.checkFields.bind(this);
    this.postAPI = this.postAPI.bind(this);
    this.generateCode = this.generateCode.bind(this);
    this.formatarMoeda = this.formatarMoeda.bind(this);
  }

  handlerChange(event) {
    const {name, value} = event.target;
    this.setState({[name]: value})
  }

  postAPI() {
    let { Code, Model, Price, Brand, Color, StartDate, EndDate } = this.state;
    api.post('/phone', { Code, Model, Price, Brand, Color, StartDate, EndDate },
     { 'cpf': '04925787454' } )
    .then((response) => {
      this.redirect();
    })
    .catch((err) => { 
      console.log(err)
    })
  }

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
      this.generateCode()
    }
  }

  // https://qastack.com.br/programming/1349404/generate-random-string-characters-in-javascript
  generateCode = async () => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < 8; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    await this.setState({ "Code": result });
    this.postAPI();
  }
 
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
  
  redirect() {
    window.location.href = "http://localhost:3000/";
  }

  render() {
    const { Price } = this.state;
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
          maxLength='255' onChange={this.handlerChange}/>
        </label>

        <label> Cor
          <select name="Color" onChange={this.handlerChange}>
            <option>Preto</option>
            <option>Branco</option>
            <option>Dourado</option>
            <option>Rosa</option>
          </select>          
        </label>

        <label> Inicio das vendas
          <input type="date" name="StartDate" onChange={this.handlerChange}/>
        </label>
        </section>

        <section className="section-2">
        <label> Marca
          <input type="text" minLength='2' maxLength='255' name="Brand" onChange={this.handlerChange}/>
        </label>
        
        <label> Preço
          <input type="text" maxlength="9" value={Price} onChange={this.formatarMoeda}/>
        </label>  


        <label> Fim das vendas
          <input type="date" name="EndDate" onChange={this.handlerChange}/>
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
  )}
}

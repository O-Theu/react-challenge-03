/*
* CHALLENGE progresso do formulário

* INSTRUÇÕES
Neste desafio sua missão é criar um formulário e seus 4 campos (com controlled inputs),
juntamente com uma barra de progresso que altera-se conforme o usuário preenche os campos.
- Crie também validações para cada campo conforme instruções abaixo.

* BARRA DE PROGRESSO
Para aproveitar estilização já definida, crie:
- a barra com um elemento pai chamado .bar-container e seu filho .bar

* CAMPOS DO FORMULÁRIO:
input - nome completo - válido se digitar no mínimo dois nomes,
input - email - válido se digitar um e-mail,
select - estado civil,
radio - gênero

Para validação de e-mail use a seguinte RegEx: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

* FUNCIONAMENTO
Espera-se que o formulário tenha 4 campos ao todo. Portanto, quando o usuário preencher
o primeiro campo, a barra de progresso deve assumir 25% do tamanho total;
o segundo campo, 50% e assim por diante...

Caso o usuário não tenha definido valores para os elementos de select e radio,
os mesmos não devem ser considerados como preenchidos até então.

Se o usuário preencher um campo e apagar seu valor, este campo deve ser considerado como vazio,
fazendo com que a barra de progresso regrida novamente.

Desabilitar o botão de enviar caso todos os campos não estejam preenchidos/válidos.

Ao enviar, deve-se apresentar um alert javascript com sucesso, limpar todos os campos
do formulário e zerar a barra de progresso novamente.
*/

import { useState } from "react";

function App() {
  const [data, setData] = useState({
    fullName: '',
    email: '',
    maritalStatus: '',
    genre: ''
  })

  const handleOnChange = (e) => {
      const { name, value } = e.target;

      setData((prev) => {
        const newData = {...prev, [name]: value};

        return newData;
      })
  }

 

  const checkFields = () => {
    let progress = 0;
    let amountToAdd = 25;

    if(data.fullName != "") {
      const splitName = data.fullName.split(" ");
      if(splitName[1]) {
        progress += amountToAdd;
      }
    }

    if(data.email) {
      let pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      
      if(pattern.test(data.email)) {
        progress += amountToAdd;
      }
    }

    if(data.genre) {
      progress += amountToAdd;
    }

    if(data.maritalStatus) {
      progress += amountToAdd;
    }

    return progress;
  }

  checkFields();

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Enviado com sucesso!")

    setData({
      fullName: '',
      email: '',
      maritalStatus: '',
      genre: ''
    })

    checkFields();
  }

  return (
    <div className='App'>
      <h3>desafio fernandev</h3>
      <h1>progresso do formulário</h1>

      <main>
        <div className="bar-container">
          <div className="bar" style={{width:`${checkFields()}%`}}></div>
        </div>
        <div className='form-group'>
          <label htmlFor=''>Nome Completo</label>
          <input 
            name="fullName"
            value={data.fullName}
            onChange={handleOnChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor=''>E-mail</label>
          <input 
            name="email"
            value={data.email}
            onChange={handleOnChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor=''>Estado Civil</label>
          <select 
            name="maritalStatus"
            onChange={handleOnChange}
            value={data.maritalStatus}
          >
            <option value=''>- selecione...</option>
            <option value='solteiro'>Solteiro</option>
            <option value='casado'>Casado</option>
            <option value='divorciado'>Divorciado</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor=''>Gênero</label>
          <div className='radios-container'>
            <span>
              <input 
                type='radio' 
                name='genre' 
                value='masculino'
                onChange={handleOnChange}
                checked={data.genre === 'masculino'}
              /> Masculino
            </span>
            <span>
              <input 
                type='radio'
                name='genre' 
                value='feminino'
                onChange={handleOnChange}
                checked={data.genre === 'feminino'}
              /> Feminino
            </span>
          </div>
        </div>
        <button
          disabled={checkFields() < 100}
          onClick={handleSubmit}
        >Enviar Formulário</button>
      </main>
    </div>
  );
}

export default App;

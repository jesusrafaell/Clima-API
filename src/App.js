import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';

function App() {

  //States
  const [seach, saveSeach] = useState({
        ciudad: '',
        pais: ''
    }); 
  const [consult, saveConsult] = useState(false);
  const [result, saveResult] = useState ({}); 
  const [error, saveError] = useState(false);

  const {ciudad, pais} = seach;

  useEffect(() => {
    const consultAPI = async() => {

     if(consult){
      const appId = '2130f78724b2e8043579d4d15714edd3'; 
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

      const res = await fetch(url);
      const result = await  res.json();

      saveResult(result);
      saveConsult(false);

      //Detecta si hubo result correctos
      if(result.cod === "404"){
        saveError(true);
      }else{
        saveError(false);
      }
     } 
    }
    consultAPI();

    //eslint-disable-next-line
  }, [consult]); 

  let componente;
  if(error){
    componente= <Error mensaje="No hay resultado" />
  }else{
    componente = <Clima 
                  result={result}
              />
  }

  return (
    <Fragment>
      <Header
        title='Clima React APP'
      />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario 
                seach={seach}
                saveSeach={saveSeach}
                saveConsult={saveConsult}
              /> 
            </div>
            <div className="col m6 s12">
              {componente} 
            </div>
          </div>
        </div>    
      </div>
    </Fragment>
  );
}

export default App;

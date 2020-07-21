import React, { useState } from 'react';
import Error from './Error';
import PropTypes from 'prop-types';

const Formulario = ({seach, saveSeach, saveConsult}) => {

    //extrar ciudad, pais
    const { ciudad, pais} = seach;

    //func for element to state
    const handleChange = e => {
        //update state
        saveSeach({
            ...seach,
            [e.target.name] : e.target.value
        });
    }
    const [error, saveError] = useState(false);

    //submit al form
    const handleSubmit = e => {
        e.preventDefault();

        //validar
        if(ciudad.trim() === '' || pais.trim() === '') {
            saveError(true);
            return;
        }

        saveError(false);

        saveConsult(true);
    }

    return ( 
        <form
            onSubmit={handleSubmit}
        >
            {error ? <Error mensaje="Ambos campos son obligatorios" />: null }
            <div className="input-field col s12">
                <input 
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    value={ciudad}
                    onChange={handleChange}
                />
                <label htmlFor="ciudad">Ciudad: </label>
            </div>

            <div className="input-field col s12">
                <select
                    name="pais"
                    id="pais"
                    value={pais}
                    onChange={handleChange}
                >
                    <option value="">-- Seleccione un país --</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="VE">Venezuela</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>
                </select>

                    <label htmlFor="Pais">Pais: </label>
            </div>
            <div className="input-field col s12">
                <input 
                    type="submit"
                    value="Buscar Clima"
                    className="waves-effect waves-light btn-large btn-block yellow accent-4"
                /> 
            </div>
        </form>
    );
}
 
Formulario.propTypes = {
    seach: PropTypes.object.isRequired,
    saveSeach: PropTypes.func.isRequired,
    saveConsult: PropTypes.func.isRequired, 
}

export default Formulario;
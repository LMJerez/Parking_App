import { useState } from 'react';
import estilos from './Parqueadero.module.css';
import estilosGlobales from '../App.module.css';

function Parqueadero({ agregarVehiculo, capacidadTotal, vehiculos }) {
  const [placa, setPlaca] = useState('');
  const [tipo, setTipo] = useState('carro');
  const [color, setColor] = useState('blanco');

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (placa.trim() === '') return;

    const horaIngreso = new Date().toISOString();
    const nuevoVehiculo = {
      placa,
      tipo,
      color,
      horaIngreso,
    };

    const exito = agregarVehiculo(nuevoVehiculo);

    if (exito) {
      setPlaca('');
      setTipo('carro');
      setColor('Blanco');
    }
  };

  const espaciosOcupados = {
    carro: vehiculos.filter((v) => v.tipo === 'carro').length,
    moto: vehiculos.filter((v) => v.tipo === 'moto').length,
    camion: vehiculos.filter((v) => v.tipo === 'camion').length,
  };

  return (
    <form className={estilos.parqueadero} onSubmit={manejarEnvio}>
      <div className={estilosGlobales.fila}>
        <div className={estilos.columnaIzquierda}>
          <input
            className={estilosGlobales.entrada}
            placeholder="Placa del vehículo"
            value={placa}
            onChange={(e) => setPlaca(e.target.value.toUpperCase())}
          />

          <select
            className={estilosGlobales.entrada}
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value="carro">Carro</option>
            <option value="moto">Moto</option>
            <option value="camion">Camion</option>
          </select>

          <select
            className={estilosGlobales.entrada}
            value={color}
            onChange={(e) => setColor(e.target.value)}
          >
            <option value="Blanco">Blanco</option>
            <option value="Negro">Negro</option>
            <option value="Rojo">Rojo</option>
            <option value="Azul">Azul</option>
            <option value="Gris">Gris</option>
            <option value="Amarillo">Amarillo</option>
          </select>
        </div>

        <div className={estilos.columnaDerecha}>
          <p>🚗 Carros: {espaciosOcupados.carro} / {capacidadTotal.carro}</p>
          <p>🏍️ Motos: {espaciosOcupados.moto} / {capacidadTotal.moto}</p>
          <p>🚛 Camiones: {espaciosOcupados.camion} / {capacidadTotal.camion}</p>
        </div>
      </div>

      <div className={estilosGlobales.boton_contadores}>
        <button className={estilosGlobales.boton} type="submit">
          Ingresar vehículo
        </button>
      </div>
    </form>

  );
}

export default Parqueadero;

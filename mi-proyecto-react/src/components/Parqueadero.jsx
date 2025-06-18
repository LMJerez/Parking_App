import { useState } from 'react';
import estilos from './Parqueadero.module.css';

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

    agregarVehiculo(nuevoVehiculo);
    setPlaca('');
    setTipo('carro');
    setColor('Blanco');
    alert(`Vehículo ${placa} ingresa al parqueadero`);
  };

  const espaciosOcupados = {
    carro: vehiculos.filter((v) => v.tipo === 'carro').length,
    moto: vehiculos.filter((v) => v.tipo === 'moto').length,
    camion: vehiculos.filter((v) => v.tipo === 'camion').length,
  };

  return (
    <form className={estilos.parqueadero} onSubmit={manejarEnvio}>
      <input
        className={estilos.entrada}
        placeholder="Placa del vehículo"
        value={placa}
        onChange={(e) => setPlaca(e.target.value)}
      />

      <div>
        <select
          className={estilos.entrada}
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        >
          <option value="carro">Carro</option>
          <option value="moto">Moto</option>
          <option value="camion">Camion</option>
        </select>
        <select
          className={estilos.entrada}
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

      <div className={estilos.boton_contadores}>
        <button className={estilos.boton} type="submit">
          Ingresar vehiculo
        </button>
        <p>
          🚗 Carros: {espaciosOcupados.carro} / {capacidadTotal.carro}
        </p>
        <p>
          🏍️ Motos: {espaciosOcupados.moto} / {capacidadTotal.moto}
        </p>
        <p>
          🚛 Camiones: {espaciosOcupados.camion} / {capacidadTotal.camion}
        </p>
      </div>
    </form>
  );
}

export default Parqueadero;

import { useState } from "react";
import estilos from "./Parqueadero.module.css";

function Parqueadero({ agregarVehiculo }) {
  const [placa, setPlaca] = useState("");
  const [tipo, setTipo] = useState("Carro");
  const [color, setColor] = useState("Blanco");

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (placa.trim() === "") return;

    const horaIngreso = new Date().toISOString();
    const nuevoVehiculo = {
      placa,
      tipo,
      color,
      horaIngreso,
    };

    agregarVehiculo(nuevoVehiculo);
    setPlaca("");
    setTipo("Carro");
    setColor("Blanco");
    alert(`Vehículo ${placa} ingresa al parqueadero`);
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
          <option value="Carro">Carro</option>
          <option value="Moto">Moto</option>
          <option value="Camion">Camion</option>
          <option value="Otro">Otro</option>
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

      <button className={estilos.boton} type="submit">
        Ingresar vehiculo
      </button>
    </form>
  );
}

export default Parqueadero;

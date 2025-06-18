import { useState } from "react";
import estilos from "./Vehiculo.module.css";

function Vehiculo({
  vehiculo,
  mostrarModal,
  actualizarVehiculo,  
  cambiarAfiliado,
  mostrarRecibo,
  valorMinuto,
}) {
  const [modoEditar, setModoEditar] = useState(false);
  const [nuevaPlaca, setNuevaPlaca] = useState(vehiculo.placa);

  const guardarCambio = () => {
    if (nuevaPlaca.trim() === "") return;
    actualizarVehiculo(vehiculo.id, nuevaPlaca);
    setModoEditar(false);
  };

  const procesarSalida = () => {
    const confirmar = window.confirm(`¿Desea dar salida al vehículo con placa ${vehiculo.placa}?`);
    if (!confirmar) return;

    const horaSalida = new Date();
    const horaIngreso = new Date(vehiculo.horaIngreso);
    const diferenciaMs = horaSalida - horaIngreso;
    const minutos = Math.ceil(diferenciaMs / 60000);
    const total = minutos * valorMinuto;

    const recibo = {
      id: vehiculo.id, // para poder eliminar luego de pagar
      placa: vehiculo.placa,
      horaIngreso: horaIngreso.toLocaleTimeString(),
      horaSalida: horaSalida.toLocaleTimeString(),
      minutos,
      tarifa: valorMinuto,
      total,
    };

    mostrarRecibo(recibo);    
  };

  return (
    <div className={estilos.vehiculo}>
      <span className={estilos.afiliado} onClick={() => cambiarAfiliado(vehiculo.id)}>
        {vehiculo.afiliado ? "⭐️Afiliado" : "☆Particular"}
      </span>

      {modoEditar ? (
        <>
          <input
            className={estilos.entrada}
            value={nuevaPlaca}
            onChange={(e) => setNuevaPlaca(e.target.value)}
          />
          <button className={estilos.boton} onClick={guardarCambio}>
            Ingreso de vehiculo
          </button>
        </>
      ) : (
        <>
          <p>Vehiculo placa:</p>
          <div>
            <h3>{vehiculo.placa}</h3>
          </div>          
          <p>Tipo :
            <strong> {vehiculo.tipo}</strong> Color:<strong> {vehiculo.color}</strong>
          </p>          
          <p>⏱️Hora ingreso: 
            <strong> {new Date(vehiculo.horaIngreso).toLocaleTimeString()}</strong>
          </p>

          <div className={estilos.botones}>
            <button
              className={estilos.boton}
              onClick={() => mostrarModal(vehiculo)}
            >
              Ver
            </button>
            <button
              className={estilos.boton}
              onClick={() => setModoEditar(true)}
            >
              Editar
            </button>
            <button
              className={estilos.boton}
              onClick={procesarSalida}
            >
              Salida de vehiculo
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Vehiculo;

import { useState } from "react";
import estilos from "./Vehiculo.module.css";

function Vehiculo({
  vehiculo,
  mostrarModal,
  actualizarVehiculo,  
  cambiarAfiliado,  
  mostrarConfirmacion,  
}) {
  const [modoEditar, setModoEditar] = useState(false);
  const [nuevaPlaca, setNuevaPlaca] = useState(vehiculo.placa);

  const guardarCambio = () => {
    if (nuevaPlaca.trim() === "") return;
    actualizarVehiculo(vehiculo.id, nuevaPlaca);
    setModoEditar(false);
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
            Actualizar datos
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
              onClick={() => mostrarConfirmacion({ id: vehiculo.id, placa: vehiculo.placa })}
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

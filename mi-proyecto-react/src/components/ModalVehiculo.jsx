import estilos from "./ModalVehiculo.module.css";

function ModalVehiculo({ vehiculo, cerrar }) {
  if (!vehiculo) return null;

  return (
    <div className={estilos.fondo} onClick={cerrar}>
      <div className={estilos.contenido} onClick={(e) => e.stopPropagation()}>
        <h2>Detalle del Vehiculo</h2>
        <p>Vehiculo placa:</p>
          <div>
            <h3>{vehiculo.placa}</h3>
          </div>          
          <p>Tipo: <strong>{vehiculo.tipo}</strong></p>
          <p>Color: <strong>{vehiculo.color}</strong></p>          
          <p>⏱️Hora ingreso: 
            <strong> {new Date(vehiculo.horaIngreso).toLocaleTimeString()}</strong>
          </p>
        <button onClick={cerrar}>Cerrar</button>
      </div>
    </div>
  );
}

export default ModalVehiculo;

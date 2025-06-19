import estilos from "./ModalVehiculo.module.css";
import estilosGlobales from "../App.module.css";

function ModalVehiculo({ vehiculo, cerrar }) {
  if (!vehiculo) return null;

  return (
    <div className={estilos.fondo} onClick={cerrar}>
      <div className={estilos.contenido} onClick={(e) => e.stopPropagation()}>
        <h2>Detalle del Vehículo</h2>

        <p>Vehículo placa:</p>
        <div className={estilosGlobales.placa}>{vehiculo.placa}</div>

        <p>
          Tipo: <strong>{vehiculo.tipo}</strong>
        </p>
        <p>
          Color: <strong>{vehiculo.color}</strong>
        </p>
        <p>
          ⏱️Hora ingreso:{" "}
          <strong>{new Date(vehiculo.horaIngreso).toLocaleTimeString()}</strong>
        </p>

        <button className={estilosGlobales.boton} onClick={cerrar}>
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default ModalVehiculo;


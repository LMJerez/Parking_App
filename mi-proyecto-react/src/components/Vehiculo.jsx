import { useState } from 'react';
import estilos from './Vehiculo.module.css';
import estilosGlobales from '../App.module.css';

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
    if (nuevaPlaca.trim() === '') return;
    actualizarVehiculo(vehiculo.id, nuevaPlaca);
    setModoEditar(false);
  };

  return (
    <div className={estilos.vehiculo}>
      <span
        className={estilos.afiliado}
        onClick={() => cambiarAfiliado(vehiculo.id)}
      >
        {vehiculo.afiliado ? '⭐️Afiliado' : '☆Particular'}
      </span>

      {modoEditar ? (
        <>
          <input
            className={estilosGlobales.entrada}
            value={nuevaPlaca}
            onChange={(e) => setNuevaPlaca(e.target.value.toUpperCase())}
          />
          <button className={estilosGlobales.boton} onClick={guardarCambio}>
            Actualizar datos
          </button>
        </>
      ) : (
        <>
          <p>Vehículo placa:</p>
          <div className={estilosGlobales.placa}>{vehiculo.placa}</div>

          <p>
            Tipo: <strong>{vehiculo.tipo}</strong> &nbsp;|&nbsp; Color:
            <strong> {vehiculo.color}</strong>
          </p>
          <p>
            ⏱️Hora ingreso:{' '}
            <strong>
              {new Date(vehiculo.horaIngreso).toLocaleTimeString()}
            </strong>
          </p>

          <div className={estilos.botones}>
            <button
              className={estilosGlobales.boton}
              onClick={() => mostrarModal(vehiculo)}
            >
              Ver
            </button>
            <button
              className={estilosGlobales.boton}
              onClick={() => setModoEditar(true)}
            >
              Editar
            </button>
            <button
              className={estilosGlobales.boton}
              onClick={() => mostrarConfirmacion(vehiculo)}
            >
              Salida de vehículo
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Vehiculo;

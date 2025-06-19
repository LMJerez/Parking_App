import estilos from './ModalConfirmacion.module.css';
import estilosGlobales from '../App.module.css';

function ModalConfirmacion({ datos, onAceptar, onCancelar }) {
  if (!datos) return null;

  return (
    <div className={estilos.fondo} onClick={onCancelar}>
      <div className={estilos.contenido} onClick={(e) => e.stopPropagation()}>
        <h3>Confirmar Salida</h3>
        <p>
          ¿Desea dar salida al vehículo con placa <strong>{datos.placa}</strong>
          ?
        </p>

        <div className={estilos.botones}>
          <button
            className={`${estilosGlobales.boton} ${estilosGlobales['boton-pago']}`}
            onClick={onAceptar}
          >
            Confirmar salida
          </button>
          <button
            className={`${estilosGlobales.boton} ${estilosGlobales['boton-cancelar']}`}
            onClick={onCancelar}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirmacion;

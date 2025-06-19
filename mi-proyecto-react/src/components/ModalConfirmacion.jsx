// src/components/ModalConfirmacion.jsx
import estilos from "./ModalConfirmacion.module.css";

function ModalConfirmacion({ datos, onAceptar, onCancelar }) {
  if (!datos) return null;

  return (
    <div className={estilos.fondo} onClick={onCancelar}>
      <div className={estilos.modal} onClick={(e) => e.stopPropagation()}>
        <h3>❓ Confirmar salida</h3>
        <p>¿Desea dar salida al vehículo con placa <strong>{datos.placa}</strong>?</p>
        <div className={estilos.botones}>
          <button className="boton boton-pago" onClick={onAceptar}>Sí</button>
          <button className="boton boton-cancelar" onClick={onCancelar}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirmacion;

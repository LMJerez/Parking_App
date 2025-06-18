// components/ModalRecibo.jsx
import estilos from "./ModalRecibo.module.css";

function ModalRecibo({ recibo, cerrar, pagar }) {
  if (!recibo) return null;

  return (
    <div className={estilos.fondo} onClick={cerrar}>
      <div className={estilos.recibo} onClick={(e) => e.stopPropagation()}>
        <h3>🧾 Recibo de Parqueo</h3>
        <p><strong>Placa:</strong> {recibo.placa}</p>
        <p><strong>Hora Ingreso:</strong> {recibo.horaIngreso}</p>
        <p><strong>Hora Salida:</strong> {recibo.horaSalida}</p>
        <p><strong>Tiempo:</strong> {recibo.minutos} minutos</p>
        <p><strong>Tarifa:</strong> ${recibo.tarifa} por minuto</p>
        <h3><strong>Total a pagar: ${recibo.total}</strong></h3>
        
        <div className={estilos.botones}>
          <button onClick={() => pagar(recibo.id)}>Pagar</button>
          <button onClick={cerrar}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default ModalRecibo;

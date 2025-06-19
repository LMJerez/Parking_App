// components/ModalRecibo.jsx
import estilos from "./ModalRecibo.module.css";

function ModalRecibo({ recibo, cerrar, pagar }) {
  if (!recibo) return null;

  const descuentoPorcentaje = recibo.afiliado ? 0.05 : 0; // --- 5% de descuento para afiliados
  const descuento = recibo.total * descuentoPorcentaje;
  const totalPagar = recibo.total - descuento;

  return (
    <div className={estilos.fondo} onClick={cerrar}>
      <div className={estilos.recibo} onClick={(e) => e.stopPropagation()}>
        <h3>🧾 Recibo de Parqueo</h3>
        <hr />
        <p><strong>Placa:</strong> {recibo.placa}</p>
        <p><strong>Hora Ingreso:</strong> {recibo.horaIngreso}</p>
        <p><strong>Hora Salida:</strong> {recibo.horaSalida}</p>
        <p><strong>Tiempo:</strong> {recibo.minutos} minutos</p>
        <p><strong>Tarifa:</strong> ${recibo.tarifa} por minuto</p>
        <p><strong>Subtotal:</strong> ${recibo.total}</p>
        <p>
          <strong>Descuento:</strong> {recibo.afiliado ? "5%" : "0%"} (${descuento.toFixed(0)})
        </p>
        <hr />
        <h3><strong>Total a pagar: ${totalPagar.toFixed(0)}</strong></h3>
        
        <div className={estilos.botones}>
          <button onClick={() => pagar(recibo.id)}>Pagar</button>
          <button onClick={cerrar}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default ModalRecibo;

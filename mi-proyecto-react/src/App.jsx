import { useState } from 'react';
import estilos from './App.module.css';
import Parqueadero from './components/Parqueadero';
import Vehiculo from './components/Vehiculo';
import ModalVehiculo from './components/ModalVehiculo';
import ModalRecibo from './components/ModalRecibo';
import ModalConfirmacion from "./components/ModalConfirmacion";

function App() {
  const [vehiculos, setVehiculos] = useState([]);
  const [modal, setModal] = useState(null);
  const [recibo, setRecibo] = useState(null);
  const valorMinuto = 50; // --- Ajustar este valor según tarifa

  const [mensaje, setMensaje] = useState(""); // Mensaje de alerta
  const [tipoAlerta, setTipoAlerta] = useState("");

  const [confirmacion, setConfirmacion] = useState(null); // Modal de confirmación

  const capacidadTotal = {
    // cupos por tipo de vehiculo
    carro: 2,
    moto: 3,
    camion: 2,
  };

  const agregarVehiculo = (vehiculo) => {
    const tipo = vehiculo.tipo;
    const ocupados = vehiculos.filter((v) => v.tipo === tipo).length;

    if (ocupados >= capacidadTotal[tipo]) {
      setMensaje(`🚫 No hay espacios disponibles para ${tipo}s`);
      setTipoAlerta("error");
      setTimeout(() => {
        setMensaje("");
        setTipoAlerta("");
      }, 3000);
      return false; // 🚫 Falló
    }

    const nuevoVehiculo = {
      id: Date.now(),
      ...vehiculo,
      afiliado: false,
    };

    setVehiculos([nuevoVehiculo, ...vehiculos]);
    setMensaje(`✅ Vehículo ${vehiculo.placa} ingresado`);
    setTipoAlerta("exito");
    setTimeout(() => {
      setMensaje("");
      setTipoAlerta("");
    }, 3000);
    return true; // ✅ Éxito
  };

  const actualizarVehiculo = (id, nuevaPlaca) => {
    const actualizadas = vehiculos.map((v) =>
      v.id === id ? { ...v, placa: nuevaPlaca } : v
    );
    setVehiculos(actualizadas);
  };

  const eliminarVehiculo = (id) => {
    const filtradas = vehiculos.filter((v) => v.id !== id);
    setVehiculos(filtradas);
  };

  const pagarVehiculo = (id) => {
    eliminarVehiculo(id);
    setRecibo(null);

    // Mostrar alerta visual de pago exitoso
    setMensaje("✅ ¡Pago exitoso!");
    setTipoAlerta("exito");

    setTimeout(() => {
      setMensaje("");
      setTipoAlerta("");
    }, 3000);
  };

  const cambiarAfiliado = (id) => {
    const actualizadas = vehiculos.map((v) =>
      v.id === id ? { ...v, afiliado: !v.afiliado } : v
    );
    setVehiculos(actualizadas);
  };

  const procesarSalida = (id) => {
    const vehiculo = vehiculos.find((v) => v.id === id);
    if (!vehiculo) return;

    const horaSalida = new Date();
    const horaIngreso = new Date(vehiculo.horaIngreso);
    const minutos = Math.ceil((horaSalida - horaIngreso) / 60000);
    const total = minutos * valorMinuto;
    const descuento = vehiculo.afiliado ? total * 0.05 : 0;
    const totalFinal = total - descuento;

    setRecibo({
      id: vehiculo.id,
      placa: vehiculo.placa,
      horaIngreso: horaIngreso.toLocaleTimeString(),
      horaSalida: horaSalida.toLocaleTimeString(),
      minutos,
      tarifa: valorMinuto,
      total,
      descuento,
      totalFinal,
    });
  };

  return (
    <div className={estilos.contenedor}>
      <h1>🚘 Parqueo de Vehiculos</h1>

      {mensaje && (
        <div className={`${estilos.alerta} ${tipoAlerta === "error" ? estilos["alerta-error"] : estilos["alerta-exito"]}`}>
          {mensaje}
        </div>
      )}

      <ModalConfirmacion
        datos={confirmacion}
        onAceptar={() => {
          procesarSalida(confirmacion.id);
          setConfirmacion(null);
        }}
        onCancelar={() => setConfirmacion(null)}
      />

      <Parqueadero
        agregarVehiculo={agregarVehiculo}
        capacidadTotal={capacidadTotal}
        vehiculos={vehiculos}
      />

      <div className={estilos.listaVehiculos}>
        {vehiculos.map((v) => (
          <Vehiculo
            key={v.id}
            vehiculo={v}
            mostrarModal={setModal}
            actualizarVehiculo={actualizarVehiculo}
            cambiarAfiliado={cambiarAfiliado}
            mostrarConfirmacion={setConfirmacion}
          />
        ))}
      </div>

      <ModalVehiculo vehiculo={modal} cerrar={() => setModal(null)} />
      <ModalRecibo
        recibo={recibo}
        cerrar={() => setRecibo(null)}
        pagar={pagarVehiculo}
      />
    </div>
  );
}

export default App;

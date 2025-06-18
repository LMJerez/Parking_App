import { useState } from 'react';
import estilos from './App.module.css';
import Parqueadero from './components/Parqueadero';
import Vehiculo from './components/Vehiculo';
import ModalVehiculo from './components/ModalVehiculo';
import ModalRecibo from './components/ModalRecibo';

function App() {
  const [vehiculos, setVehiculos] = useState([]);
  const [modal, setModal] = useState(null);
  const [recibo, setRecibo] = useState(null);
  const valorMinuto = 50; // --- Ajustar este valor según tarifa

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
      alert(`🚫 No hay espacios disponibles para ${tipo}s`);
      return;
    }

    const nuevoVehiculo = {
      id: Date.now(),
      ...vehiculo,
      afiliado: false,
    };

    setVehiculos([nuevoVehiculo, ...vehiculos]);
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
    setTimeout(() => {
      alert('✅ ¡Pago exitoso!');
    }, 500); // espera 300 ms que se cierre el modal
  };

  const cambiarAfiliado = (id) => {
    const actualizadas = vehiculos.map((v) =>
      v.id === id ? { ...v, afiliado: !v.afiliado } : v
    );
    setVehiculos(actualizadas);
  };

  return (
    <div className={estilos.contenedor}>
      <h1>🚘 Parqueo de Vehiculos</h1>
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
            mostrarRecibo={setRecibo}
            valorMinuto={valorMinuto}
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

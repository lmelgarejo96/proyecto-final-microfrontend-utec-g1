import { useState, useEffect, useCallback } from 'react';
import { siniestroService } from '../services/siniestroService';
import type { SiniestroDetalleResponse, Siniestro, Cliente, SiniestroPago, Vehiculo, Poliza } from '../data/dashboardData';

interface UseSiniestroDataReturn {
  siniestro: Siniestro | null;
  cliente: Cliente | null;
  siniestro_pago: SiniestroPago | null;
  vehiculo: Vehiculo | null;
  poliza: Poliza | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useSiniestroData = (idSiniestro: string): UseSiniestroDataReturn => {
  const [siniestro, setSiniestro] = useState<Siniestro | null>(null);
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [siniestro_pago, setSiniestroPago] = useState<SiniestroPago | null>(null);
  const [vehiculo, setVehiculo] = useState<Vehiculo | null>(null);
  const [poliza, setPoliza] = useState<Poliza | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!idSiniestro) {
      setError('ID de siniestro requerido');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response: SiniestroDetalleResponse = await siniestroService.getSiniestroById(idSiniestro);
      
      if (response.success) {
        setSiniestro(response.data.siniestro);
        setCliente(response.data.cliente);
        setSiniestroPago(response.data.siniestro_pago);
        setVehiculo(response.data.vehiculo);
        setPoliza(response.data.poliza);
      } else {
        setError('No se encontraron datos del siniestro');
        setSiniestro(null);
        setCliente(null);
        setSiniestroPago(null);
        setVehiculo(null);
        setPoliza(null);
      }
    } catch (err) {
      console.error('Error loading siniestro data:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido al cargar el siniestro');
      setSiniestro(null);
      setCliente(null);
      setSiniestroPago(null);
      setVehiculo(null);
      setPoliza(null);
    } finally {
      setLoading(false);
    }
  }, [idSiniestro]);

  // Cargar datos cuando cambia el ID
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    siniestro,
    cliente,
    siniestro_pago,
    vehiculo,
    poliza,
    loading,
    error,
    refetch: fetchData
  };
}; 
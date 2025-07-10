import { useState, useEffect, useCallback } from 'react';
import { dashboardService } from '../services/dashboardService';
import type { 
  DashboardFilters, 
  DashboardEstadoResponse, 
  DashboardPagoResponse,
  DashboardTopCategoriasResponse,
  DashboardTopClientesResponse,
  KPIEstado, 
  KPIPago,
  TopCategoria,
  TopCliente
} from '../data/dashboardData';

interface UseDashboardDataReturn {
  kpis: KPIEstado[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  totalSiniestros: number;
}

export const useDashboardData = (filters: DashboardFilters): UseDashboardDataReturn => {
  const [kpis, setKpis] = useState<KPIEstado[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalSiniestros, setTotalSiniestros] = useState(0);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response: DashboardEstadoResponse = await dashboardService.getEstadoSiniestros(filters);
      
      if (response.success) {
        setKpis(response.kpis);
        setTotalSiniestros(response.resumen.total_siniestros);
      } else {
        setError('No se encontraron datos para los filtros especificados');
        setKpis([]);
        setTotalSiniestros(0);
      }
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido al cargar los datos');
      setKpis([]);
      setTotalSiniestros(0);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Cargar datos cuando cambian los filtros
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    kpis,
    loading,
    error,
    refetch: fetchData,
    totalSiniestros
  };
};

// Hook para los datos de pago
interface UseDashboardPagoDataReturn {
  kpisPago: KPIPago[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  totalDesembolsado: number;
  maximoDesembolsado: number;
  minimoDesembolsado: number;
}

export const useDashboardPagoData = (filters: DashboardFilters): UseDashboardPagoDataReturn => {
  const [kpisPago, setKpisPago] = useState<KPIPago[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalDesembolsado, setTotalDesembolsado] = useState(0);
  const [maximoDesembolsado, setMaximoDesembolsado] = useState(0);
  const [minimoDesembolsado, setMinimoDesembolsado] = useState(0);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response: DashboardPagoResponse = await dashboardService.getPagoSiniestros(filters);
      
      if (response.success) {
        setKpisPago(response.kpis);
        setTotalDesembolsado(response.resumen.total_desembolsado);
        setMaximoDesembolsado(response.resumen.maximo_desembolsado);
        setMinimoDesembolsado(response.resumen.minimo_desembolsado);
      } else {
        setError('No se encontraron datos de pagos para los filtros especificados');
        setKpisPago([]);
        setTotalDesembolsado(0);
        setMaximoDesembolsado(0);
        setMinimoDesembolsado(0);
      }
    } catch (err) {
      console.error('Error loading dashboard pago data:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido al cargar los datos de pagos');
      setKpisPago([]);
      setTotalDesembolsado(0);
      setMaximoDesembolsado(0);
      setMinimoDesembolsado(0);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Cargar datos cuando cambian los filtros
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    kpisPago,
    loading,
    error,
    refetch: fetchData,
    totalDesembolsado,
    maximoDesembolsado,
    minimoDesembolsado
  };
};

// Hook para los datos de top categorías
interface UseDashboardTopCategoriasDataReturn {
  topCategorias: TopCategoria[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useDashboardTopCategoriasData = (filters: DashboardFilters): UseDashboardTopCategoriasDataReturn => {
  const [topCategorias, setTopCategorias] = useState<TopCategoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response: DashboardTopCategoriasResponse = await dashboardService.getTopCategorias(filters);
      
      if (response.success) {
        setTopCategorias(response.data);
      } else {
        // En caso de no encontrar datos, mostrar tabla vacía
        setTopCategorias([]);
      }
    } catch (err) {
      console.error('Error loading top categorias data:', err);
      // En caso de error, mostrar tabla vacía
      setTopCategorias([]);
      setError(err instanceof Error ? err.message : 'Error al cargar el top de categorías');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Cargar datos cuando cambian los filtros
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    topCategorias,
    loading,
    error,
    refetch: fetchData
  };
};

// Hook para los datos de top clientes
interface UseDashboardTopClientesDataReturn {
  topClientes: TopCliente[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useDashboardTopClientesData = (filters: DashboardFilters): UseDashboardTopClientesDataReturn => {
  const [topClientes, setTopClientes] = useState<TopCliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response: DashboardTopClientesResponse = await dashboardService.getTopClientes(filters);
      
      if (response.success) {
        setTopClientes(response.data);
      } else {
        // En caso de no encontrar datos, mostrar tabla vacía
        setTopClientes([]);
      }
    } catch (err) {
      console.error('Error loading top clientes data:', err);
      // En caso de error, mostrar tabla vacía
      setTopClientes([]);
      setError(err instanceof Error ? err.message : 'Error al cargar el top de clientes');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Cargar datos cuando cambian los filtros
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    topClientes,
    loading,
    error,
    refetch: fetchData
  };
}; 